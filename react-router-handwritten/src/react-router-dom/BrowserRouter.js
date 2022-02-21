

import { Component } from "react";
import { createBrowserHistory } from "history";
import Router from "./Router";
class BrowserRouter extends Component {
  constructor(props) {
    super(props);
    this.history = createBrowserHistory(); // 创建跳转函数（使用插件库，磨平浏览器差异）
  }
  render() {
    const { children } = this.props;
    return <Router history={this.history} children={children} />
  }
}

export default BrowserRouter;