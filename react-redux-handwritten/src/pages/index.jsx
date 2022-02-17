import React, { useEffect,  } from 'react';
import { connect } from "../react-redux"

const Index = (props) => {
  
  console.log("props", props);
  const { count, add, down, dispatch } = props;

  useEffect(() => {
    console.log("useEffect");
  }, [])

  // const add = () => {
  //   dispatch({ type: "add" })
  // }

  const addAsync = () => {
    dispatch((dispatch, getState) => {
      setTimeout(() => {
        dispatch({ type: "add" })
        console.log("async", getState());
      }, 1000);
    })
  }

  // const down = () => {
  //   dispatch({ type: "down" })
  // }

  const promiseDown = () => {
    const p = new Promise((resovle, reject) => {
      setTimeout(() => {
        resovle({ type: "promiseDown", payload: "参数参数" })
      }, 1000);
    })
    dispatch(p);
  }

  return (
    <div>
      <h1>首页</h1>
      <h3>state: {count}</h3>
      <input type="text" onChange={down}/>
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
  }
}

// 使用react-redux connect返回一个新的组件。对其进行props的额外添加和数据监听等
const WrappedIndex = connect(
  mapStateToProps,
  mapDispatchToPorps
)(Index);

export default WrappedIndex;