import effectRunnerMap from "./effectRunnerMap";
import { IO } from "./symbols";
export default function proc(env, iterator, cb) {
  // console.log("proc", env, iterator);
  next(); // 执行遍历器next
  
  function next(arg, isErr) {
    let res;
    if (isErr) {
      res = iterator.throw(arg);
    } else {
      res = iterator.next(arg);
    }

    // res => {value:, done: false/true}
    if (!res.done) {
      digestEffect(res.value, next);
    } else {
      if (typeof cb === "function") cb(res);
    }
  }

  function digestEffect(effect, cb) {
    // 标记是否结束，且状态不可变 类似 promise 中的状态;
    let effectSettled;
  
    function currCb(res, isErr) {
      if (effectSettled) return;
      effectSettled = true;
      cb(res, isErr)
    }
  
    runEffect(effect, currCb);
  }
  
  function runEffect(effect, currCb) {
    // 判断是否是effect对象
    // console.log("runEffect", effect);
    if (effect && effect[IO]) {
      const effectRunner = effectRunnerMap[effect.type];
      effectRunner(env, effect.payload, currCb);
    } else {
      currCb(); // 如果不是直接执行即可
    }
  }
}

