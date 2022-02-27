

import React, { Component } from "react";
import RouterContext from "./RouterContext";

// 路由中间层，处理通用逻辑和数据
class Router extends Component {
  static computeRootMatch(pathname) { // 默认path，当未传入时赋值。
    return { path: "/", url: "/", params: {}, isExact: pathname === "/" };
  }
  constructor(props) {
    super(props);
    // console.log("props.history", props.history.location);
    this.state = {
      location: props.history.location
    }

    // 监听路由变化，通知对应path的子组件更新
    this.unlisten = props.history.listen(({ location }) => {
      this.setState({ location })
    })
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { history, children } = this.props;
    // console.log("history", RouterContext.Provider);
    // 决定以何种方式跳转的history进行传递（browser, hash, memory）
    return (
      <RouterContext.Provider 
        value={{ history, location: this.state.location, match: Router.computeRootMatch(this.state.location.pathname) }}
      >
        { children }
      </RouterContext.Provider>
    )
  }
}

export default Router;