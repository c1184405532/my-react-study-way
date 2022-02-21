import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useHistory, useRouter,
  withRouter
} from "../react-router-dom"


const Index = () => {
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
          <Route path="/a" children={() => <Achildren/>} component={A}/>
          <Route path="/b" component={B} render={() => <Brender/>} />
          <Route path="/c" render={() => <C/>}/>
          <Route path="/c/withrouter" component={() => <CTowithRouter/>}/>
          {/* <Redirect to="/b"/> */}
          <Route component={is404}/>
        </Switch>
        
      </Router>
    </div>
  )
}

const A = () => {
  return <h2>这是a页面</h2>;
}

// 测试hooks
const B = () => {
  const { location } = useRouter();
  console.log("location", location);
  return <h2>这是b页面</h2>;
}

// 子组件跳转，如果C组件中还有route 就是嵌套路由
const C = () => {
  return <div>
    <h2>这是C页面</h2>
    <Link to="/a" children="跳转a"/>&nbsp;&nbsp;
  </div>
}

const Cwith = (props) => {
  console.log("withrouter props", props);
  return <h2>这是cwithrouter页面</h2>;
}
// 使用高阶组件获取router props
const CTowithRouter = withRouter(Cwith);

const is404 = () => {
  return <h2>这是404页面</h2>;
}

// 测试chilren 优先级
const Achildren = () => {
  return <h2>这是Achildren传入页面</h2>
}

// 获取hook api
const Brender = () => {
  console.log("useHistory", useHistory());
  console.log("useRouter", useRouter());
  return <h2>这是Brender入页面</h2>;
}

export default Index;