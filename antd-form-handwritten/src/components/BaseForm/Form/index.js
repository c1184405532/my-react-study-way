import React from "react";
import FieldContext from "../FieldContext/index";
import useForm  from "../useForm/index";

const Form = (props, ref) => {
  const { form, children, onFinish, onFinishFailed } = props;  
  const [formInstance] = useForm(form); // 获取当前组件对应的数据存储区域

  // 类组件中使用Form组件，需要手动绑定ref  子->父
  React.useImperativeHandle(
    ref,
    () => formInstance,
  )
  const { setCallBacks, submit } = formInstance
  // console.log("formInstance", formInstance);
  setCallBacks({
    onFinish,
    onFinishFailed
  })
  return  (
    <form onSubmit={e => {
      e.preventDefault();
      submit();
    }}>
      <FieldContext.Provider value={formInstance}>{ children }</FieldContext.Provider>
    </form>
  )
  
}

export default Form;