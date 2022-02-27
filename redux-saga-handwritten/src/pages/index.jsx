import React, { useEffect, useReducer } from 'react';
import { connect } from "react-redux";
import counterStore from "../store";
import { handleSaga } from '../store/saga'; 
const Index = (props) => {
  
  const [, forceUpdate] = useReducer(x => x + 1, 0); // 在函数组件中没有this.forceUpdate函数可用于更新，所以我们抽取一个useReduce可变值去响应更新

  useEffect(() => {
    console.log("props", props);
    // 添加数据源改变监听
    const unsubscribe = counterStore.subscribe(() => {
      forceUpdate()
    })

    // 卸载监听事件
    return () => unsubscribe();
  }, [])

 

  const sagaPayload = () => {
    console.log("点击");
    props.handleSaga(123)
  }

  return (
    <div>
      <h1>首页</h1>
      <h3>state: {counterStore.getState()}</h3>
      <p>
      </p>
      <p>
        <button onClick={sagaPayload}>saga加法</button>
      </p>
    </div>
  )
}

// 拿到state。并决定哪些值要映射到index的props上
const mapStateToProps = function(count) {
  return { count };
}

// 映射dispatch action，减少手动调用dispatch的步骤
const mapDispatchToPorps = {
  add: () => ({ type: "add" }),
  down: (props) => {
    console.log("map dipatch to props down", props);
    return { type: "down" }
  },
  handleSaga
}

// 使用react-redux connect返回一个新的组件。对其进行props的额外添加和数据监听等
const WrappedIndex = connect(
  mapStateToProps,
  mapDispatchToPorps
)(Index);

export default WrappedIndex;
