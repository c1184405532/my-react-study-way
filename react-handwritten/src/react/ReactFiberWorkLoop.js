import { updateClassComponent, updateFragmentComponent, updateFunctionComponent, updateHostComponent } from "./ReactFiberReconciler";
import { scheduleCallback, shouldYield } from "./scheduler";
import { isFn, isStrOrNumber, Placement, Update, updateNode } from "./utils";

let wipRoot = null; // 根节点，wip work in progress，当前正在工作当中的fiber
let nextUnitOfWork = null; // 将要更新的下一个fiber节点
// 处理更新 (初始化，props， state )
export function scheduleUpdateOnFiber(fiber) {
  fiber.alternate = { ...fiber }; // 根节点初始化时要赋值一个老节点，不然更新时不存在
  wipRoot = fiber;
  wipRoot.sibling = null; // 避免处理兄弟节点
  nextUnitOfWork = wipRoot; // 初始从根节点开始更新

  scheduleCallback(workLoop); // 执行任务
}

// 协调
function performUnitOfWork(wip) {
  // 1. 更新自己
  // 2. 返回下一个要更新的fiber

  const { type } = wip; // 组件类型或节点类型
  if (isStrOrNumber(type)) {
    // 原生标签
    updateHostComponent(wip);
  } else if (isFn(type)) { // 函数组件或者类组件
    // console.dir(type?.__proto__);
    type?.__proto__?.isReactComponent ? updateClassComponent(wip) : updateFunctionComponent(wip);
  } else { // fragment 标签
    updateFragmentComponent(wip);
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
  while (nextUnitOfWork && !shouldYield()) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork); //更新当前fiber节点，并返回下一个需要更新的fiber节点
  }

  if (!nextUnitOfWork && wipRoot) {
    // fiber节点全部加载完毕，提交。
    commitRoot();
  }
}

//requestIdleCallback(workLoop); // 执行（浏览器有空闲时间时）

// 提交（dom映射到界面）
function commitRoot() {
  console.log("wipRoot", wipRoot);
  isFn(wipRoot.type) ? commitWorker(wipRoot) : commitWorker(wipRoot.child); // 如果是函数组件提交本身，否侧从子节点开始提交
}

function commitWorker(fiber) {
  if (!fiber) return;

  const {type, flags, stateNode } = fiber;

  if (isFn(type)) { // 函数组件有hook effect 需要执行
    invokeHooks(fiber);
  }


  let parentNode = getParentNode(fiber); //fiber.return.stateNode; // 查找父节点，如函数式组件，本身没有stateNode，所以需要向上查找，直至找到最近的stateNode

  // 三种情况
  // 1. 提交自己

  
  // 插入 
  // if (flags & Placement && stateNode) parentNode.appendChild(stateNode);
  // 0 1 3 4
  // 0 1 2 3 4 
  if (flags & Placement && stateNode) {
    let hasSiblingNode = foundSiblingNode(fiber, parentNode);
    if (hasSiblingNode) { // 如果后面有节点就往前插入 否者会变成 0 1 3 4 2
      parentNode.insertBefore(stateNode, hasSiblingNode);
    } else {
      parentNode.appendChild(fiber.stateNode);
    }
  }

  // 更新
  if (flags & Update && stateNode) {
    updateNode(stateNode, fiber.alternate.props, fiber.props);
  }

  // 删除
  if (fiber.deletions) {
    commitDeletions(stateNode || parentNode, fiber.deletions);
  }


  // 2. 提交孩子
  commitWorker(fiber.child);
  // 3. 提交下一个兄弟
  commitWorker(fiber.sibling);
}

function commitDeletions(parentNode, deletions) {
  deletions.forEach(d => {
    parentNode.removeChild(getChildNode(d));
  })
}

function foundSiblingNode(fiber, parentNode) {
  let siblingHasNode = fiber.sibling;
  let node = null;
  while (siblingHasNode) {
    node = siblingHasNode.stateNode;
    if (node && parentNode.contains(node)) {
      return node;
    }
    siblingHasNode = siblingHasNode.sibling;
  }
  return null;
}
  

// 执行hook effect
function invokeHooks(wip) {
  const {updateQueueOfEffect, updateQueueOfLayout} = wip;

  updateQueueOfEffect?.forEach(effect => {
    scheduleCallback(() => { // 异步执行（下一轮）
      effect?.create();
    })
  })

  updateQueueOfLayout?.forEach(effect => {
    effect?.create();
  })
}

function getParentNode(fiber) {
  let next = fiber.return;

  while (!next.stateNode) {
    next = next.return; // 向上查找
  }

  return next.stateNode;
}

// 找fiber子stateNode
function getChildNode(fiber) {
  let tem = fiber;

  while (!tem.stateNode) {
    tem = tem.child;
  }

  return tem.stateNode;
}