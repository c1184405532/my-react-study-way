import React from 'react';
import ReactDOM from './react/react-dom';
import { Component } from './react';
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
  return (
    <div className="function-component">
      <p>{ props.name }</p>
      <button onClick={() => { console.log("点击了按钮") }}>点击</button>
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
