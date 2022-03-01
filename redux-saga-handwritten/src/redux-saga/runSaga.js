import proc from "./proc";

export default function runSaga({channel, getState, dispatch }, saga, ...args) {
  const iterator = saga(...args); // 拿到迭代器对象
  const env = { channel, getState, dispatch }; // 传入需要的数据，以便将来使用
  proc(env, iterator); // 执行遍历器
}