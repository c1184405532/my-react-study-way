import { stdChannel } from "./channel";
import runSaga from "./runSaga";

export default function createSagaMiddleware() {
  let boundRunSaga;
  let channel = stdChannel(); // 拿到数据存储区域，用于公用数据存储
  function sagaMiddleware({ getState, dispatch }) {
    boundRunSaga = runSaga.bind(null, { channel, getState, dispatch }); // 使用bind传入参数，并返回新函数可供调用, 传入存储结构 channel
    return next => action => {
      let result = next(action);
      channel.put(action); // 当用户调用时（触发dispatch），执行下一个generator的next
      return result
    }
  }

  // run接收的就是实际的saga函数（generator）, 使用展开符，否则接收的是个数组
  sagaMiddleware.run = (...args) => boundRunSaga(...args);
  // 返回的这个函数用于连接redux。
  return sagaMiddleware;
}