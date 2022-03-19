
// 都是二进制表示法, 用位运算进行计算。使用二进制的好处，单个值具有唯一性，组合值也具有唯一性，比如 Placement + Update = 6，那么就是双类型
export const NoFlags = 0;
export const Placement = 2;
export const Update = 4;
export const Deletion = 8;

export const isStr = s => typeof s === "string";

export const isFn = fn => typeof fn === "function";

export const isStrOrNumber = s => typeof s === "string" || typeof s === "number";

// export const updateNode = (node, nextVal)=> {
//   // 直接将props中的值赋值到节点上

//   // react 16 事件委托在document层
//   // react 17 事件委托在container层
//   Object.keys(nextVal).forEach(key => {
//     if (key === "children") {
//       if (isStrOrNumber(nextVal.children)) {
//         node.textContent = nextVal.children + "";
//       }
//     } else if (key.slice(0, 2) === "on") {
//       const eventName = key.slice(2).toLocaleLowerCase();
//       node.addEventListener(eventName, nextVal)
//     } else {
//       node[key] = nextVal[key];
//     }
    
//   })
// }

// react 16 事件委托在document层
// react 17 事件委托在container层
export function updateNode(node, prevVal, nextVal) {
  // 移除旧的属性或事件
  Object.keys(prevVal)
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStrOrNumber(prevVal[k])) {
          node.textContent = "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.removeEventListener(eventName, prevVal[k]);
      } else {
        if (!(k in nextVal)) {
          node[k] = "";
        }
      }
    });
  // 添加新的属性或事件
  Object.keys(nextVal)
    .forEach((k) => {
      if (k === "children") {
        // 有可能是文本
        if (isStrOrNumber(nextVal[k])) {
          node.textContent = nextVal[k] + "";
        }
      } else if (k.slice(0, 2) === "on") {
        const eventName = k.slice(2).toLocaleLowerCase();
        node.addEventListener(eventName, nextVal[k]);
      } else {
        node[k] = nextVal[k];
      }
    });
}