export default function logger(midApi) {

  const { getState } = midApi; // 先拿到中间件的操作 logger中间件只需要读取数据即可

  // next 其实就是接受的dispath（store.dispatch）函数，用闭包保存
  return function(next) {
    // 这里返回的其实就是真正加强的dispatch（enhancerDispatch）函数，最后用户调用执行的就是这里
    return function(action) {
      
      console.log("中间件 logger开始执行啦！");
      console.log("操作命令：", action.type);
      const prevState = getState();
      console.log("prevState", prevState);

      const returnValue = next(action); // 执行原dipatch。
      console.log("nextState", getState());

      console.log("中间件 logger执行结束啦！");

      return returnValue; // 返回原执行结果
    }
  }

}