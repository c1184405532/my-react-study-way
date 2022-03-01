import { MATCH } from "./symbols";

// 额外开一个区域存储数据
export function stdChannel() {
  const currentTakes = [];
  
  function take(cb, matcher) {
    cb[MATCH] = matcher; // 创建关联关系，以便将来查找 
    currentTakes.push(cb);
  }

  function put(input) {
    const takers = currentTakes;
    for(let i=0, len = takers.length; i<len; i++) {
      const taker = takers[i];
      if (taker[MATCH](input)) { // 这里这个函数是effectRunnerMap中定义的 matcher
        taker(input); // 这里是 take 接收的cb
      }
    }
  }

  return {
    take,
    put
  }
}