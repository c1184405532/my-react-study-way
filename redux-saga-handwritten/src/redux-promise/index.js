export default function promise(midApi) {

  const { dispatch } = midApi;

  return next => action => {
    // 如果是promise那么使用promise.then调用将来要执行的dispath，否则直接执行next（store.dispatch）即可
    console.log("promise执行了")
    const call = isPromise(action) ? action.then(dispatch) : next(action);
    return call;
  }

}

// 简易版判断是否是promise
function isPromise(fn) {
  return typeof fn.then === "function"; 
}