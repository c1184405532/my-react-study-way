import React, { Component } from "react";
import matchPath from "./matchPath";
import RouterContext from "./RouterContext";

// 在所有子路由组件中，返回第一个匹配的。
class Switch extends Component {
  render() {
    return <RouterContext.Consumer>
      {(context) => {
        const { location } = context
        let match; // 记录是否匹配
        let element; // 记录匹配的元素
        // console.log('this.props.children', this.props.children);
        React.Children.forEach(this.props.children, child => {
          if (!match && React.isValidElement(child)) {
            element = child;
            match = child.props.path ? matchPath(child.props.path, location.pathname) : context.match;
          }
        })
        // 如果匹配成功 返回对应组件即可
        return match ? React.cloneElement(element, { computedMatch: match }) : null ;
      }}
    </RouterContext.Consumer>
  }
}

export default Switch;


