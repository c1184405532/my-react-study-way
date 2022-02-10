# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm || yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


## 手写antd-form表单

实现antd-form-v4版本的表单组件

### componnets/BaseForm/index.js

form组件入口文件

### componnets/BaseForm/Form

表单外层组件，用于包裹所有表单项。

### componnets/BaseForm/Field

表单项组件，用于包裹每一个独立的表单项，如input。

### componnets/BaseForm/FieldContext

创建跨层级数据传递

### componnets/BaseForm/useForm

表单数据存储区域，事件处理函数等。

## pages/login/index

使用示例，包含类组件和函数组件使用。

## 掘金文章地址

[在react中实现一个简易版antdForm表单组件（react^17）](https://juejin.cn/post/7058586914189737997)




