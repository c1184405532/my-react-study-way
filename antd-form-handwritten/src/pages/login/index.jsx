import React, { useEffect } from 'react';
import Form, { Field } from "../../components/BaseForm/index";
// const Login = (props) => {

//     const rules = [{ required: true }]; // 校验规则
//     const [form] = Form.useForm();
//     console.log("form", form);

//     const onFinish = (err, values) => {
//       console.log("onFinish", err, values);
//     }

//     const onFinishFailed = (err, values) => {
//       console.log("onFinishFailed", err, values);
//     }
    
//     useEffect(() => {
//       form.setFieldsValue({ account: '1184405532' })
//     },[])

//     return (
//       <div>
//         <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//           <Field name="account" rules={rules}>
//             <input type="text" placeholder='请输入账号'/>
//           </Field>
//           <Field name="password" rules={rules}>
//             <input type="password" placeholder='请输入密码' />
//           </Field>
//           <button type="submit">提交提交</button>
//         </Form>
//       </div>
//     )
// }

class Login extends React.Component{
  formRef = React.createRef();
  
  componentDidMount() {
    this.formRef.current.setFieldsValue({ password: 123 })
  }

  onFinish = (err, values) => {
    console.log("onFinish", err, values);
  }

  onFinishFailed = (err, values) => {
    console.log("onFinishFailed", err, values);
  }
  render() {
    const rules = [{ required: true }]; // 校验规则
    return (
      <div>
        <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
          <Field name="account" rules={rules}>
            <input type="text" placeholder='请输入账号'/>
          </Field>
          <Field name="password" rules={rules}>
            <input type="password" placeholder='请输入密码' />
          </Field>
          <button type="submit">提交提交</button>
        </Form>
      </div>
    )
  }
}
export default Login