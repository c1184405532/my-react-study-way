

import React, { Component } from "react";
import RouterContext from "./RouterContext";

// 路由中间层，处理通用逻辑和数据
class Router extends Component {
  constructor(props) {
    super(props);
    console.log("props.history", props.history.location);
    this.state = {
      location: props.history.location
    }

    // 监听路由变化，通知对应path的子组件更新
    props.history.listen(({ location }) => {
      this.setState({ location })
    })
  }
  render() {
    const { history, children } = this.props;
    console.log("history", RouterContext.Provider);
    // 将决定以何种方式跳转的history进行传递（browser, hash, memory）
    return (
      <RouterContext.Provider value={{ history, location: this.state.location }}>
        { children }
      </RouterContext.Provider>
    )
  }
}

export default Router;