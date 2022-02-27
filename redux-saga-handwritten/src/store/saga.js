import { all, call, put, takeEvery } from "redux-saga/effects";

// worker 真正的工作函数
export function* getPayloadUseSaga() {
  
  console.log('res');
  const res = yield call(getOriginPayload); // 调用层 拿到结果
  
  yield put({ type: "sagaPayload", payload: res}) // 通知层，通知redux该更新数据了
}

// watcher 函数
export function* getPayload() {
  console.log('getPayload', 123);
  
  yield takeEvery("getSagaPayload", getPayloadUseSaga)
}

const getOriginPayload = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ type: "origin", data: [1, 2, 3, 4] })
    }, 1000);
  })
}

export const handleSaga = (payload) => {
  console.log('payload', payload);
  
  return { type: "getSagaPayload", payload }
}