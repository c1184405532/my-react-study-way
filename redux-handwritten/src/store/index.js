import { createStore, applyMiddleware } from "../redux";
import reduxThunk from "../redux-thunk";
import reduxPromise from "../redux-promise";
import reduxLogger from "../redux-logger";

// 创建一个计数器
function createCounter(state = 0, action) {
  // 根据不同的指令，做对应的操作
  switch (action.type) {
    case "add": return state + 1;
    case "down": return state - 1;
    case "promiseDown": {
      console.log("promise参数", action.payload); return state -1;
    }
    default: return state;
  }
}

// 将数据源导出使用
const store = createStore(createCounter, applyMiddleware(reduxThunk, reduxPromise, reduxLogger)); 
export default store;