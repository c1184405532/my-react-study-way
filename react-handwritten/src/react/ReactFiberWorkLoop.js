import { updateHostComponent } from "./ReactFiberReconciler";
import { isStr } from "./utils";

let wipRoot = null; // 根节点，wip work in progress，当前正在工作当中的fiber
let nextUnitOfWork = null; // 将要更新的下一个fiber节点
// 处理更新
export function scheduleUpdateOnFiber(filber) {
  wipRoot = filber;
  wipRoot.sibling = null; // 避免处理兄弟节点
  nextUnitOfWork = wipRoot;
}

// 协调
function performUnitOfWork(wip) {
  // 1. 更新自己
  // 2. 返回下一个要更新的fiber

  const { type } = wip; // 组件类型或节点类型
  if (isStr(type)) {
    // 原生标签
    updateHostComponent(wip);
  }

  // 深度优先遍历
  if (wip.child) {
    return wip.child;
  }
  // 找其他可用的节点，兄弟，或父节点上的其他子节点，兄弟节点。
  let next = wip;
  while (next) {
    if (next.sibling) return next.sibling;
    next = next.return;
  }
  return null; // 没有节点就返回空
}

function workLoop(IdleDeadline) {
  while (nextUnitOfWork && IdleDeadline.timeRemaining() > 0) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); //更新当前fiber节点，并返回下一个需要更新的fiber节点
  }

  if (!nextUnitOfWork && wipRoot) {
    // fiber节点全部加载完毕，提交。
    commitRoot();
  }
}

requestIdleCallback(workLoop); // 执行

// 提交
function commitRoot() {

}