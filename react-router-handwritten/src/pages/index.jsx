import React, { useEffect,  } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "../react-router"

import { useHistory, useRouter } from "../react-router/hooks";

import withRouter from '../react-router/withRouter';

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
          <Link to="/c/withrouter" children="withrouter 高阶组件 获取props"/>&nbsp;&nbsp;
          <Link to="/xxxxxx" children="跳转xxxxxx"/>&nbsp;&nbsp;
        </p>
        <Switch>
          <Route path="/a" children={Achildren} component={A}/>
          <Route path="/b" 
            //component={B} 
            render={() => <Brender/>} />
          <Route path="/c" component={C}/>
          <Route path="/c/withrouter" component={() => <CTowithRouter/>}/>
          <Route component={is404}/>
        </Switch>
        
      </Router>
    </div>
  )
}

const A = () => {
  return ( <h2>这是a页面</h2> )
}
const B = () => {
  const { location } = useRouter();
  console.log("location", location);
  return ( <h2>这是b页面</h2> )
}
const C = () => {
  return ( <h2>这是c页面</h2> )
}
const Cwith = (props) => {
  console.log("withrouter props", props);
  return ( <h2>这是cwithrouter页面</h2> )
}
const CTowithRouter = withRouter(Cwith);

const is404 = () => {
  return ( <h2>这是404页面</h2> )
}
const Achildren = () => {
  return ( <h2>这是Achildren传入页面</h2> )
}
const Brender = () => {
 
  console.log("useHistory", useHistory());
  console.log("useRouter", useRouter());
  return ( <h2>这是Brender入页面</h2> )
}

export default Index;