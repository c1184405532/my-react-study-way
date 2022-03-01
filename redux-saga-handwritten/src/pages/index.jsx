import React, { } from 'react';
import { connect } from "react-redux";
import { handle } from '../store/saga'; 
const Index = (props) => {
  
  const sagaPayload = () => {
    console.log("点击");
    props.handle(123)
  }

  return (
    <div>
      <h1>首页</h1>
      <h3>count: {props.count}</h3>

      <ul>
        {props.payload.map(v => {
          return <li key={v}>{v}</li>
        })}
        
      </ul>

      <p>
        <button onClick={sagaPayload}>saga获取数据</button>
      </p>
    </div>
  )
}

// 拿到state。并决定哪些值要映射到index的props上
const mapStateToProps = function(state) {
  console.log("state", state);
  return state;
}

// 映射dispatch action，减少手动调用dispatch的步骤
const mapDispatchToPorps = {
  handle
}

// 使用react-redux connect返回一个新的组件。对其进行props的额外添加和数据监听等
const WrappedIndex = connect(
  mapStateToProps,
  mapDispatchToPorps
)(Index);

export default WrappedIndex;
