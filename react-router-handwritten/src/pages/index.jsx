import React, { useEffect,  } from 'react';
import {
  BrowserRouter as Router,
  Link,
  Route
} from "../react-router"

const Index = (props) => {
  
  

  useEffect(() => {
    console.log("useEffect");
  }, [])

  

  return (
    <div>
      <h1>主页</h1>
      <Router>
        <p>
          <Link to="/a" children="跳转a"/>&nbsp;&nbsp;
          <Link to="/b" children="跳转b"/>&nbsp;&nbsp;
          <Link to="/c" children="跳转c"/>&nbsp;&nbsp;
        </p>
        <Route path="/a" component={A}/>
        <Route path="/b" component={B}/>
        <Route path="/c" component={C}/>
      </Router>
    </div>
  )
}

const A = () => {
  return ( <h2>这是a页面</h2> )
}
const B = () => {
  return ( <h2>这是b页面</h2> )
}
const C = () => {
  return ( <h2>这是c页面</h2> )
}

export default Index;