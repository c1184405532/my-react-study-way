
import React from 'react';
import FieldContext from "../FieldContext/index";
class Field extends React.Component {
  static contextType = FieldContext; // 获取数据

  componentDidMount() {
    const { setFieldEntities } = this.context
    this.unRegistger = setFieldEntities(this); // 传入当前field实例
  }

  componentWillUnmount() {
    this.unRegistger && this.unRegistger(); // 卸载数据订阅
  }

  onStoreChange = () => { // 在数据更新时调用 更新当前组件
    this.forceUpdate();
  }

  getControlled = () => {
    const { name } = this.props;
    // console.log("this.context", this.context);
    const { getFieldValue, setFieldsValue } = this.context; // 跨层级传递的数据
    return {
      value: getFieldValue(name), // 获取初始值，或者修改之后的值
      onChange: (e) => {
        const newVal = e.target.value;
        setFieldsValue({ [name]: newVal }); // 设置值到数据存储区域中，然后就能更新视图
      }
    }
  }
  render() {
   
    const { children } = this.props;
    console.log("renderrenderrender", children);
    const returnChildNode = React.cloneElement(children, this.getControlled()); // 克隆一个节点。用于添加props属性
    return (
      returnChildNode
    ) 
  }
}


export default Field;