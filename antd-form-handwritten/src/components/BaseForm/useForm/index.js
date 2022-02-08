
import React from "react";
class FormStore { 
  constructor() {
    this.store = {}; // 开辟一个空间存储表单中的状态

    this.fieldEntities = []; // 存储fields组件的更新函数

    this.callBacks = {}; // 存储回调函数，成功失败等、
  }

  setCallBacks = (newCallBacks) => {
    this.callBacks = { ...this.callBacks, ...newCallBacks };
  }

  setFieldEntities = (entity) => { // 存储
    this.fieldEntities.push(entity);
    return () => { // 取消订阅
      this.fieldEntities = this.fieldEntities.filter(v => v !== entity);
      this.store[entity.props.name] = undefined;
    }
  }

  getFieldsValue = () => { // 返回所有存储的值
    return { ...this.store };
  }

  getFieldValue = (name) => { // 返回指定值
    return this.store[name];
  }

  setFieldsValue = (newStore) => { // 设置值，key: value 格式
    this.store = {
      ...this.store,
      ...newStore,
    }

    this.fieldEntities.forEach(v => { // 更新与newStore数据相关联的field
      Object.keys(newStore).forEach(k => {
        if (k === v.props.name) {
          v.onStoreChange()
        }
      })
    }); 
    console.log("newStore", newStore);
  }

  validate = () => { // 校验
    let err = []; // 错误信息
    this.fieldEntities.forEach(field => {
      const { name, rules } = field.props; // 拿到对应组件的校验函数和对应key下面的值进行匹配
      const value = this.getFieldValue(name);
      rules.forEach(rule => {
        if (rule.required && (value === undefined || value === "" || value === null)) { // 这里只做了简单的校验判断，主要体现思路
          err.push({ [name]: value, err: `请填写${name}字段!` });
        } 
      })
    })
    return err;
  }

  submit = () => {
    const { onFinish, onFinishFailed } = this.callBacks;
    let err = this.validate();
    
    if (err.length > 0) { // 错误
      onFinishFailed(err, this.getFieldsValue());
    } else {
      onFinish(null, this.getFieldsValue())
    }
  }

  getForm = () => {
    const { getFieldValue, getFieldsValue, setFieldsValue, setFieldEntities, setCallBacks, submit }  = this;
    return {
      getFieldValue,
      getFieldsValue,
      setFieldsValue,
      setFieldEntities,
      setCallBacks,
      submit
    }
  }
}

const useForm = (form) => {
  const formRef = React.useRef(); // 创建唯一值 ref，在组件生命周期中进行使用，组件卸载会自动销毁。
  
  if (!formRef.current) { // 没有值创建，有值，直接返回
    if (form) {
      formRef.current = form; // 如果其他地方传递了form回来 直接赋值
    } else {
      const formStore = new FormStore();
      formRef.current = formStore.getForm(); // 每个Form 都是一个独立的数据存储区域，防止数据混乱。
    }

  }
  
  return [formRef.current]
}

export default useForm;