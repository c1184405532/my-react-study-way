
import { useContext } from "react";
import RouterContext from "./RouterContext";

// 创建link，本质就是a标签的跳转
function Link({ to, children, ...rest }) {

  const context = useContext(RouterContext); // 获取跨层级数据传递
  
  const handleClick = (e) => {
    e.preventDefault(); // 禁用默认跳转事件
    context.history.push(to); // 使用自有跳转方式进行路由跳转
  }

  return <a href={to} onClick={handleClick} { ...rest }>{children}</a>
}

export default Link;