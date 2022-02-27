import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "@redux-saga/core";
import reduxThunk from "../redux-thunk";
import reduxPromise from "../redux-promise";
import reduxLogger from "../redux-logger";

import { getPayload } from "./saga"; // 拿到定义好的saga

const sagaMiddleware = createSagaMiddleware();

// 创建一个计数器
function createCounter(state = 0, action) {
  // 根据不同的指令，做对应的操作
  switch (action.type) {
    case "add": return state + 1;
    case "down": return state - 1;
    case "promiseDown": {
      console.log("promise参数", action.payload); return state -1;
    }
    case "sagaPayload": { // 使用saga进行异步
      console.log('sagaPayload',);
      
      return {
        state,
        payload: action.payload
      }
    }
    default: return state;
  }
}

// 将数据源导出使用
const store = createStore(
  createCounter, 
  // applyMiddleware(sagaMiddleware, reduxThunk, reduxPromise, reduxLogger)
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(getPayload); // 将想使用的saga注入

export default store;