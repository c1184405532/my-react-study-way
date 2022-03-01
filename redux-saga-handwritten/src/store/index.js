import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "../redux-saga";

import { getPayload, rootSaga } from "./saga"; // 拿到定义好的saga

const sagaMiddleware = createSagaMiddleware();

// 创建一个计数器
function createCounter({count = 0} = {}, action) {
  switch (action.type) {
    case "sagaPayload": { // 使用saga进行异步
      console.log('sagaPayload action',action);
      // return state + 1;
      return {
        count: count + 1,
        payload: action.payload
      }
    }
    default: return { count: count, payload: [] };
  }
}

// 将数据源导出使用
const store = createStore(
  createCounter,
  // applyMiddleware(sagaMiddleware, reduxThunk, reduxPromise, reduxLogger)
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga); // 将想使用的saga注入

export default store;