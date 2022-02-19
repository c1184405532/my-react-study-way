

import React, { Component } from "react";
import RouterContext from "./RouterContext";
import matchPath from "./matchPath";
class Route extends Component {
  render() {
    // 类组件中可以使用 Consumer 获取跨层级数据传递
    return (
      <RouterContext.Consumer>
      {(context) => {
        const { location } = context;
        const { path, component } = this.props;
        const match = matchPath(path, location.pathname);

        // route props 由真正的组件使用
        const props = {
          ...context,
          match,
          location
        }
        return match ? React.createElement(component) : null
      }}
    </RouterContext.Consumer>
    )
  }
}

export default Route;