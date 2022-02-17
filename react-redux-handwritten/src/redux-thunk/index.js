
export default function thunk(midApi) {

  const { getState, dispatch } = midApi;

  return next => action => {
    // 使用示例在 addAsync中
    console.log("thunk执行了");
    if (typeof action === "function") { // 如果调用dispatch传入的action 是一个函数 那么直接执行该函数即可
      return action(dispatch, getState); // 将dispath（这里是midApi给中间件的）回传，用于用户真正想操作更新数据时。
    }
    return next(action); // 如果action不是一个函数，那么直接调用dispath（这里是store.dispath）即可
  }

}