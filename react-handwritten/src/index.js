import React from 'react';
import ReactDOM from './react/react-dom';
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


const jsx = (
  <div className="index-box">
    <h1>手写reactFiber</h1>
    <a target="blank" href="https://react.docschina.org/">react官网</a>
  </div>
)

ReactDOM.render(jsx, document.getElementById('root'))
