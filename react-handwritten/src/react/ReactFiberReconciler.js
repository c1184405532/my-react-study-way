import { createFiber } from "./fiber";
import { isStr } from "./utils";


export const updateHostComponent = (wip) => {
  // 初始化时 没有stateNode，需要创建
  if (!wip.stateNode) {
     wip.stateNode = document.createElement(wip.type);
     // 更新属性
  }
  // 协调子节点
  reconCileChildren(wip, wip.props.children);

  console.log("wip", wip);
}

function reconCileChildren(returnFiber, children) {
  if (isStr(children)) return; // 如果是文本节点，就不需要构建fiber

  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null;

  for (let i = 0; i < newChildren.length; i++) {
    const newChild = newChildren[i];
    const newFiber = createFiber(newChild, returnFiber);

    if (i === 0) {
      returnFiber.child = newFiber; // 设置头节点的子节点
    } else {
      previousNewFiber.sibling = newFiber;
    }

    previousNewFiber = newFiber; // 记录当前节点，用于下次给该节点设置兄弟节点
  }
}