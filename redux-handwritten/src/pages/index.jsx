import React, { useEffect, useReducer } from 'react';
import counterStore from "../store";

const Index = () => {
  
  const [, forceUpdate] = useReducer(x => x + 1, 0); // 在函数组件中没有this.forceUpdate函数可用于更新，所以我们抽取一个useReduce可变值去响应更新

  useEffect(() => {

    // 添加数据源改变监听
    const unsubscribe = counterStore.subscribe(() => {
      forceUpdate()
    })

    // 卸载监听事件
    return () => unsubscribe();
  }, [])

  const add = () => {
    counterStore.dispatch({ type: "add" })
  }

  const addAsync = () => {
    counterStore.dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "add" })
        console.log("async", getState());
      }, 1000);
    })
  }

  const down = () => {
    counterStore.dispatch({ type: "down" })
  }

  const promiseDown = () => {
    const p = new Promise((resovle, reject) => {
      setTimeout(() => {
        resovle({ type: "promiseDown", payload: "参数参数" })
      }, 1000);
    })
    counterStore.dispatch(p);
  }

  return (
    <div>
      <h1>首页</h1>
      <h3>state: {counterStore.getState()}</h3>
      <p>
        <button onClick={add}>加法</button>
        <button onClick={down}>减法</button>
      </p>
      <p>
        <button onClick={addAsync}>action为函数的异步加法</button>
        <button onClick={promiseDown}>action为函数的promise减法</button>
      </p>
    </div>
  )
}

export default Index