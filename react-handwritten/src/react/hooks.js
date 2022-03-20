import { scheduleUpdateOnFiber } from "./ReactFiberWorkLoop";
import { areHookInputsEqual, HookLayout, HookPassive, isFn } from "./utils";

// 当前就是执行到的时候
let currentlyRenderingFiber = null; // 当前正在工作的fiber
let workInProgressHook = null; // 当前正在工作的hook
let currentOldHook = null; // 当前工作hook的老hook

const useState = (initalState) => {
  const hook = updateWorkInProgressHook(); //  拿到hook

  if (!currentlyRenderingFiber.alternate) {
    hook.memoizedState = initalState; // 初次渲染赋值
  }
  const dispatch = action => {
    hook.memoizedState = isFn(action) ? action(hook.memoizedState) : action; // 如果是函数执行，是参数直接返回 
    scheduleUpdateOnFiber(currentlyRenderingFiber); // 调度更新
  }
  return [hook.memoizedState, dispatch]
}

const useReducer = (reducer, initalState) => {
  const hook = updateWorkInProgressHook(); //  拿到hook

  if (!currentlyRenderingFiber.alternate) {
    hook.memoizedState = initalState; // 初次渲染赋值
  }
  const dispatch = action => {
    hook.memoizedState = reducer(hook.memoizedState, action); // 拿到上一次的值，计算新值，并赋值给当前hook
    scheduleUpdateOnFiber(currentlyRenderingFiber);
    // console.log('点击更新', hook, currentlyRenderingFiber);
    
  }
  return [hook.memoizedState, dispatch]
}

const useEffect = (create, deps) => {
  updateEffectIml(HookPassive, create, deps)
}
const useLayoutEffect = (create, deps) => {
  updateEffectIml(HookLayout, create, deps)
}

const updateEffectIml = (hookFlag, create, deps) => {
  const hook = updateWorkInProgressHook(); //  拿到hook
  const effect = {hookFlag, create, deps};

  if (currentOldHook) { // 组件更新且依赖项没有发生变化
    const prevEffect = currentOldHook.memoizedState;
    if (deps) {
      const prevDeps = prevEffect.deps;
      if (areHookInputsEqual(deps, prevDeps)) { // 比对依赖项
        return; // 如果依赖项相同 后续代码不执行
      }
    }
  }

  hook.memoizedState = effect; // 存到hook本身上，因为是链表结构，所以会有多个hook，且需要取旧hook

  if (hookFlag & HookPassive) {
    currentlyRenderingFiber.updateQueueOfEffect.push(effect);  // 每个hook会有多个effect 这里用数组，源码用的是链表
  } else if (hookFlag & HookLayout) {
    currentlyRenderingFiber.updateQueueOfLayout.push(effect);
  }

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
      currentOldHook = currentOldHook.next;
    } else { // 第0个hook
      workInProgressHook = current.memoizedState; // 设置正在工作中的hook
      hook = current.memoizedState; // 设置返回hook
      currentOldHook = current.memoizedState;
    }

  } else { // 初次渲染

    currentOldHook = null;
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

// 设置hooks初始值，并且将fiber赋值到当前全局变量上。
const renderHooks = (fiber) => {
  currentlyRenderingFiber = fiber;
  currentlyRenderingFiber.memoizedState = null; // hook0
  currentlyRenderingFiber.updateQueueOfLayout = [];
  currentlyRenderingFiber.updateQueueOfEffect = [];
  // console.log('currentlyRenderingFiber', currentlyRenderingFiber);
  
  workInProgressHook = null;
}

export {
  useState,
  useReducer,
  useEffect,
  useLayoutEffect,
  renderHooks
}