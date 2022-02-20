

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
        const { path, children, component, render } = this.props;
        const match = path ? matchPath(path, location.pathname) : context.match;

        // route props 由真正的组件使用
        const props = {
          ...context,
          match,
          location
        }

        // 匹配 按优先级进行返回 children（函数） > component（组件） > render（函数）> null
        // 不匹配 按优先级进行返回 children > null
        // 源码中使用连续三元进行匹配，不是很利于学习，所以这里拆分成了 if else
        const createElement = () => {
          if (match) {
            if (children) {
              if (typeof children === "function") return children(props);
              else return children;
            } else if (component) {
              return React.createElement(component, props);
            } else if (render) {
              return render(props);
            } else return null;
          } else {
            // 在react-router设计中，不匹配模式下，如果有children传入则直接返回children。
            return typeof children === "function" ? children(props) : null;
          }
        }
        // 这里再使用Provider传递一层props，用于自定义hooks获取最近的props，
        return <RouterContext.Provider value={props}>
          {createElement()}
        </RouterContext.Provider>
      }}
    </RouterContext.Consumer>
    )
  }
}

export default Route;