import { createFiber } from "./fiber";
import { renderHooks } from "./hooks";
import { reconCileChildren } from "./ReactChildFiber";
import { isStrOrNumber, updateNode, Update } from "./utils";

// 原生标签
export const updateHostComponent = (wip) => {
  // 初始化时 没有stateNode，需要创建
  if (!wip.stateNode) {
    wip.stateNode = document.createElement(wip.type);
    // 更新属性
    updateNode(wip.stateNode, {}, wip.props); // 初始化时 updateNode 没有prevVal, 传空
  }
  // 协调子节点
  reconCileChildren(wip, wip.props.children);
  // console.log("wip", wip);
}

// 函数组件
export const updateFunctionComponent = (wip) => {
  renderHooks(wip); // 初始化hooks
  const { type, props } = wip;
  const children = type(props); // 这个type就是函数组件本身，执行它，拿到它的返回结果
  reconCileChildren(wip, children);
  // console.log("children", children);
}

// 类组件
export const updateClassComponent = (wip) => {
  const { type, props } = wip;
  const classInstance = new type(props); // 类组件要先实例化
  const children = classInstance.render(); // 执行类中的render函数，拿到返回结果
  reconCileChildren(wip, children);
  // console.log("children", children);
}

// fragment
export const updateFragmentComponent = (wip) => {
  reconCileChildren(wip, wip.props.children); // 本身是空标签，所以协调子节点即可
}

// 协调子节点（diff），目前只有初始化创建，没有更新复用
// function reconCileChildren(returnFiber, children) {
//   if (isStrOrNumber(children)) return; // 如果是字符串或数字文本节点，就不需要构建fiber
  
//   const newChildren = Array.isArray(children) ? children : [children];
//   let previousNewFiber = null;
//   let oldFilber = returnFiber.alternate?.child; // 拿到老节点的头节点

//   for (let i = 0; i < newChildren.length; i++) {
//     const newChild = newChildren[i];
//     let newFiber = createFiber(newChild, returnFiber);
//     const same = sameNode(oldFilber, newFiber); // 比对节点，是否可复用

//     if (same) { // 更新
//       newFiber = {
//         ...newFiber,
//         // 复用旧的
//         alternate: oldFilber,
//         stateNode:  oldFilber.stateNode,
//         flags: Update
//       }
//     }
//     if (oldFilber) {
//       oldFilber = oldFilber.sibling; // 现在指向头结点，赋值为兄弟节点，下次for循环进来才能正确找到并sameNode。
//     }

//     if (i === 0) {
//       returnFiber.child = newFiber; // 设置头节点的子节点
//     } else {
//       previousNewFiber.sibling = newFiber;
//     }

//     previousNewFiber = newFiber; // 记录当前节点，用于下次给该节点设置兄弟节点
//   }
// }

