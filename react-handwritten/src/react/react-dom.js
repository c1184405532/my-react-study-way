
import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

// vnode 虚拟dom
// node 真实dom
function render(vnode, container) {
  console.log("vnode", vnode);

  // 定义fiber根节点
  const fiberRoot = {
    type: container.nodeName.toLocaleLowerCase(),
    stateNode: container, // dom节点
    props: { children: vnode }
  }

  // 处理fiber更新
  scheduleUpdateOnFiber(fiberRoot);
}


export default { 
  render
}