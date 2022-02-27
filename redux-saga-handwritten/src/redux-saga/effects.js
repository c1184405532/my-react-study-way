import effectTypes from "./effectTypes";
import { IO } from "./symbols";

// 标记effect对象
const makeEffect = (type, payload) => ({ [IO]: IO, type, payload }) 

export function take(pattern) {
  makeEffect(effectTypes.TAKE, {pattern})
}

export function put(action) {
  makeEffect(effectTypes.PUT, {action})
}

export function call(fn, ...args) {
  makeEffect(effectTypes.CALL, { fn, args })
}

export function fork(fn, ...args) {
  makeEffect(effectTypes.FORK, { fn, ...args })
}

