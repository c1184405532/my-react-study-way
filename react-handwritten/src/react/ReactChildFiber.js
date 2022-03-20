import { createFiber } from "./fiber";
import { Deletion, isStrOrNumber, Update, Placement } from "./utils";

// 协调子节点（diff），目前只有初始化创建，没有更新复用
export const reconCileChildren = (returnFiber, children) => {
  if (isStrOrNumber(children)) return; // 如果是字符串或数字文本节点，就不需要构建fiber
  
  const shouldTrackSideEffects = !!returnFiber.alternate; // 是否是初次渲染
  const newChildren = Array.isArray(children) ? children : [children];
  let previousNewFiber = null;
  let oldFiber = returnFiber.alternate?.child; // 拿到老节点的头节点
  let nextOldFiber = null; // 记录下一个old fiber
  let newIndex = 0;
  let lastPlacedIndex = 0; // 记录上次插入位置

  // 1 找第一个能复用的节点，并往后，只要相对位置没有发生变化就继续往后复用，否则跳出
  for (; oldFiber && newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex];
    if (newChild === null) {
      continue;
    }
    if (oldFiber.index > newIndex) {
      nextOldFiber = oldFiber;
      oldFiber = null;
    } else {
      nextOldFiber = oldFiber.sibling;
    }
    const same = sameNode(newChild, oldFiber);
    if (!same) {
      if (oldFiber === null) {
        oldFiber = nextOldFiber;
      }
      break;
    }
    const newFiber = createFiber(newChild, returnFiber);
    Object.assign(newFiber, {
      alternate: oldFiber,
      stateNode: oldFiber.stateNode,
      flags: Update,
    });
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
    oldFiber = nextOldFiber;
  }
          
  // 2 newChildren 只有两个节点 已经遍历完了
  // old 1 2 3 4
  // new 1 2 
  if (newChildren.length <= newIndex) {
    deleteRemainingChildren(returnFiber, oldFiber);
    return;
  }

  // 3 oldFiber没了，但是newChildren还有
  // old 1 2 3 4
  // new 1 2 3 4 5 6
  if (!oldFiber) { // 初次渲染
    for (; newIndex < newChildren.length; newIndex++) {
      const newChild = newChildren[newIndex];
      if (newChild === null) continue; //  不存在跳出即可
      let newFiber = createFiber(newChild, returnFiber);
      // const same = sameNode(oldFiber, newFiber); // 比对节点，是否可复用
  
      // if (same) { // 更新
      //   newFiber = {
      //     ...newFiber,
      //     // 复用旧的
      //     alternate: oldFiber,
      //     stateNode:  oldFiber.stateNode,
      //     flags: Update
      //   }
      // }
  
      // if (!same && oldFiber) { // 删除
      //   deleteChild(returnFiber, oldFiber); // 从父节点找到要删除的子节点进行删除
      // }
  
      // if (oldFiber) {
      //   oldFiber = oldFiber.sibling; // 现在指向头结点，赋值为兄弟节点，下次for循环进来才能正确找到并sameNode。
      // }
      lastPlacedIndex = placeChild(
        newFiber,
        lastPlacedIndex,
        newIndex,
        shouldTrackSideEffects
      );
        
  
      if (previousNewFiber === null) {
        returnFiber.child = newFiber; // 设置头节点的子节点
      } else {
        previousNewFiber.sibling = newFiber;
      }
  
      previousNewFiber = newFiber; // 记录当前节点，用于下次给该节点设置兄弟节点
    }
    return;
  }

  // 4 有能复用的 但是后续顺序不确定
  // old1 2 3 4 
  // new 1 5 3 8
  // 2 3 4 -> map (没找到就删除map中剩余的)
  const existingChildren = mapRemainingChildren(oldFiber);
  for (; newIndex < newChildren.length; newIndex++) {
    const newChild = newChildren[newIndex];
    if (newChild === null) {
      continue;
    }
    const newFiber = createFiber(newChild, returnFiber);
    lastPlacedIndex = placeChild(
      newFiber,
      lastPlacedIndex,
      newIndex,
      shouldTrackSideEffects
    );
    // 从老链表上找能复用的节点
    let matchedFiber = existingChildren.get(newFiber.key || newFiber.index);
    if (matchedFiber) {
      // 找到能复用的节点
      existingChildren.delete(newFiber.key || newFiber.index);
      Object.assign(newFiber, {
        alternate: matchedFiber,
        stateNode: matchedFiber.stateNode,
        flags: Update,
      });
    }
    if (previousNewFiber === null) {
      returnFiber.child = newFiber;
    } else {
      previousNewFiber.sibling = newFiber;
    }
    previousNewFiber = newFiber;
  }
  // 剩下没有复用的节点删除
  if (shouldTrackSideEffects) {
    existingChildren.forEach((child) => deleteChild(returnFiber, child));
  }
  
}

// parentNode.removeChild(childNode)
function deleteChild(returnFiber, childToDelete) {
  childToDelete.flags = Deletion; // 添加删除标记
  if (returnFiber.deletions) {
    returnFiber.deletions.push(childToDelete)
  } else {
    returnFiber.deletions = [childToDelete];
  }
}

// 删除节点链表,头结点是currentFirstChild
function deleteRemainingChildren(returnFiber, currentFirstChild) {
  let childToDelete = currentFirstChild;
  while (childToDelete) {
    deleteChild(returnFiber, childToDelete);
    childToDelete = childToDelete.sibling;
  }
}

function mapRemainingChildren(currentFirstChild) {
  const existingChildren = new Map();
  let existingChild = currentFirstChild;
  while (existingChild) {
    existingChildren.set(
      existingChild.key || existingChild.index,
      existingChild
    );
    existingChild = existingChild.sibling;
  }
  return existingChildren;
}

function placeChild(
  newFiber,
  lastPlacedIndex,
  newIndex,
  shouldTrackSideEffects // 初次渲染（false）还是更新（true）
) {
  newFiber.index = newIndex;
  if (!shouldTrackSideEffects) {
    return lastPlacedIndex;
  }
  const current = newFiber.alternate;
  if (current) {
    const oldIndex = current.index;
    if (oldIndex < lastPlacedIndex) {
      // move
      newFiber.flags = Placement;
      return lastPlacedIndex;
    } else {
      return oldIndex;
    }
  } else {
    newFiber.flags = Placement;
    return lastPlacedIndex;
  }
}
  

// 同一层级，相同key 相同类型
const sameNode = (a, b) => {
  return !!(a && b && a.key === b.key && a.type === b.type);
}