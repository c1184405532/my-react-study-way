
export const isStr = s => typeof s === "string";

export const isFn = fn => typeof fn === "function";

export const updateNode = (node, nextVal)=> {
  // 直接将props中的值赋值到节点上
  Object.keys(nextVal).forEach(key => {
    if (key === "children") {
      if (isStr(nextVal.children)) {
        node.textContent = nextVal.children
      }
    } else {
      node[key] = nextVal[key];
    }
    
  })
}