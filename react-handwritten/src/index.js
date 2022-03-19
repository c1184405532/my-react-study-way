// import React,{Component, useReducer,useState} from 'react';
// import ReactDOM from "react-dom";
import React from 'react';
import ReactDOM from './react/react-dom';
import { Component, useReducer } from './react';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

const Fcomponent = (props) => {

  // hook中的状态值是存在fiber节点上的，fiber.memoizedState
  // 因为是链表结构 所以 fiber.memoizedState -> (hook0) -> next(hook1)
  // 在添加hook时，如果hook很多，那么需要从 start -> end 遍历，为了节省效率
  // react中记录了一个工作中的hook（尾标记）
  // workInProgressHook 
  // hook0 -> hook1 -> hook2( === workInProgressHook) 此时添加hook3 (workInProgressHook.next = hook3, workInProgressHook = hook3)
  // const [count, setCount] = useState(0); // 
  // const [count3, setCount3] = useState(0); hook按照顺序来存储对应状态，所以要保持顺序的稳定性。
  const [count2, setCount2] = useReducer((x) => x + 1, 0);
  
  return (
    <div className="function-component">
      {/* <p>count: { count}</p>
      <button onClick={() => { console.log("点击了按钮") }}>点击</button> */}

      <p>{ count2}</p>
      <button onClick={() => { setCount2(1) }}>点击</button>
    </div>
  )
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="class-component">
        <p>{this.props.name}</p>
      </div>
    )
  }
}

const jsx = (
  <div className="index-box">
    <h1>手写reactFiber</h1>
    <a target="blank" href="https://react.docschina.org/">react官网</a>
    <Fcomponent name="函数组件"/>
    <ClassComponent name="类组件"/>
    <ul>
      {/* 定义fragment */}
      <>
        <li>标签1</li>
        <li>标签2</li>
      </>
    </ul>
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))
