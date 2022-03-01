import effectTypes from "./effectTypes";
import { IO } from "./symbols";

// 标记effect对象
const makeEffect = (type, payload) => {
  return { [IO]: IO, type, payload }
} 

// 以下函数，因为是generator对象，所以在迭代器执行过程中能够获取makeEffect()的返回值，虽然并没有显式返回。
// yield call() => iterator.value（在这里获取）
// 代码中在 proc.js 下 digestEffect 能够清楚看见。

export function take(pattern) {
  // console.log("pattern", pattern);
  return makeEffect(effectTypes.TAKE, {pattern})
}

export function put(action) {
  return makeEffect(effectTypes.PUT, {action})
}

export function call(fn, ...args) {
  return makeEffect(effectTypes.CALL, { fn, args })
}

export function fork(fn, ...args) {
  return makeEffect(effectTypes.FORK, { fn, ...args })
}

export function all(effects) {
  return makeEffect(effectTypes.ALL, effects)
}
