import { Placement } from "./utils";

export const createFiber = (vnode, returnFiber) => {
  const filber = {
    type: vnode.type,
    key: vnode.key,
    props: vnode.props,
    stateNode: null, // 原生标签时候指dom节点，类组件指的是实例
    child: null, // 第一个子fiber
    sibling: null, // 下一个兄弟fiber
    return: returnFiber, // 父fiber
    flags: Placement, // 标记节点类型
    alternate: null, // 老节点
    deletions: null, // 需要删除的子节点 null || []
    index: null, // 当前层级下的下标 从0开始
    // memoizedState: , // class中 指state值, 函数组件中 指第0个hook  
  }
  return filber;
}