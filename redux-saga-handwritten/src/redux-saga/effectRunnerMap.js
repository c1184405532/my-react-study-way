import effectTypes from "./effectTypes";
import proc from "./proc";

// 返回对应类型需要执行的函数
const effectRunnerMap = {
  [effectTypes.TAKE]: runTakeEffect,
  [effectTypes.PUT]: runPutEffect,
  [effectTypes.CALL]: runCallEffect,
  [effectTypes.FORK]: runForkEffect,
  [effectTypes.ALL]: runAllEffect,
}

// 给用户暴露 channel 参数，可自定义传入、
function runTakeEffect(env, {channel = env.channel, pattern}, cb) {
  // console.log("runTakeEffect", arguments);
  const matcher = input => input.type === pattern;
  channel.take(cb, matcher);
}

function runPutEffect(env, {action}, cb) {
  // console.log("runPutEffect", arguments);
  const res = env.dispatch(action);
  cb(res);
}

function runCallEffect(env, {fn, args}, cb) {
  // console.log("runCallEffect", arguments);
  const res = fn.apply(null, args);
  if (isPromise(res)) { // fn是promise
    res
      .then(data => cb(data))
      .catch(err => cb(err, true))
  } else if (isGenerator(res)) {
    proc(env, res, cb);
  } else {
    cb(res);
  }
  
}

function runForkEffect(env, {fn, args}, cb) {
  // console.log("runForkEffect", arguments);
  // fn 是generator
  const taskIterator = fn.apply(null, args); // args是一个数组，需要展开
  proc(env, taskIterator);
  cb(); // 下一个next
}

function runAllEffect(env, effects, cb) {
  const length = effects.length;
  for (let i = 0; i < length; i++) {
    proc(env, effects[i])
  }
}

function isPromise(fn) {
  return typeof fn.then === "function"
}

function isGenerator(obj) {
  return typeof obj.next === "function"
}

export default effectRunnerMap;