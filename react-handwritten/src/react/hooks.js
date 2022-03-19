import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";

// 当前就是执行到的时候
let currentlyRenderingFiber = null; // 当前正在工作的fiber
let workInProgressHook = null; // 当前正在工作的hook

const useReducer = (reducer, initalState) => {
  const hook = updateWorkInProgressHook(); //  拿到hook

  if (!currentlyRenderingFiber.alternate) {
    hook.memoizedState = initalState; // 初次渲染赋值
  }
  const dispatch = action => {
    hook.memoizedState = reducer(hook.memoizedState, action); // 拿到上一次的值，计算新值，并赋值给当前hook
    scheduleUpdateOnFiber(currentlyRenderingFiber);
    console.log('点击更新', hook, currentlyRenderingFiber);
    
  }
  return [hook.memoizedState, dispatch]
}

// 初次渲染或组件更新时 更新hook
const updateWorkInProgressHook = () => {
  let hook = null;
  let current = currentlyRenderingFiber.alternate; // 老节点
  if (current) { // 更新

    currentlyRenderingFiber.memoizedState = current.memoizedState; // 将正在工作中的 设置为老的。因为下面要更新了
    if (workInProgressHook) { // 不是第0个
      workInProgressHook = workInProgressHook.next; // 设置正在工作中的hook
      hook = workInProgressHook; // 设置返回hook
    } else { // 第0个hook
      workInProgressHook = current.memoizedState; // 设置正在工作中的hook
      hook = current.memoizedState; // 设置返回hook

    }

  } else { // 初次渲染

    // 初始化hook
    hook = {
      memoizedState: null, // 初始值
      next: null // 下一个hook
    }

    if (workInProgressHook) { // 不是第0个
      workInProgressHook.next = hook; // 当前hook下挂载下一个hook(链表结构) n -> n.next -> n.next
      workInProgressHook = hook; // 设置当前正在工作的hook
    } else { // 第0个hook
      currentlyRenderingFiber.memoizedState = hook; // 挂载hook到fiber
      workInProgressHook = hook; // 设置当前正在工作的hook
    }
  }

  return hook;
}

// 设置hooks初始值
const renderHooks = (fiber) => {
  currentlyRenderingFiber = fiber;
  currentlyRenderingFiber.memoizedState = null; // hook0
  workInProgressHook = null;
}

export {
  useReducer,
  renderHooks
}