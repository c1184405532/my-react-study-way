
import { all, call, put, take, fork } from "../redux-saga/effects";

// worker 真正的工作函数
export function* getPayloadUseSaga() {
  const res = yield call(getOriginPayload); // 调用层 拿到结果
  // console.log('res', res);
  yield put({ type: "sagaPayload", payload: res.data}) // 通知层，通知redux该更新数据了
}

// watcher 函数，连接对应 key 和回调的关系
export function* getPayload() {
  while (true) {
    const action = yield take("getSagaPayload");
    console.log("action getSagaPayload", action);
    yield fork(getPayloadUseSaga, action)
  }
}

const getOriginPayload = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ type: "origin", data: [1, 2, 3, 4] })
    }, 1000);
  })
}

// 点击事件。发送对应key的事件响应
export const handle = (payload) => {
  console.log('payload', payload);
  return { type: "getSagaPayload", payload }
}

// all 执行多个saga
export function* rootSaga() {
  yield all([getPayload()])
}