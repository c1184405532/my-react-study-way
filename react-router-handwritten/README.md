# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm || yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## 手写react-router

### pages/index

使用示例入口

### react-router-dom/index

react-router入口文件

### react-router-dom/BrowserRouter

BrowserRouter核心代码，使用浏览器api，history 中的 pushState 进行跳转。里面借用了history库

### react-router-dom/Router

对真正的路由组件进行包裹的高阶组件（可以把它当成一个中间件进行顶层逻辑处理）

### react-router-dom/Link

跳转组件

### react-router-dom/Route

路由组件，接收需要显示的内容组件，通过匹配浏览器地址决定是否显示。

### react-router-dom/Redirect

重定向路由组件

### react-router-dom/Switch

返回匹配路径的第一个路由组件（独占路由）。

### react-router-dom/hooks

函数式组件中想要获取 router props 提供的 hook api

### react-router-dom/withRouter

类组件中想要获取 router props 提供的高阶组件（HOC）


## 掘金文章地址

[手写一个react-redux](https://juejin.cn/post/7067055849616703495)




