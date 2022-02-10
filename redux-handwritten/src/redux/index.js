
// reducer 就是store中定义的 createCounter，它接收一个值，和一个指令用于操作数据
// reducer的定义：reducer是一个纯函数，接收旧的state和action 返回新的state
// reducer中不要进行以下操作：1. 修改传入参数。2. 执行有副作用的操作，如API请求路由跳转等。3. 调用非纯函数如Date.now() Math.random()。
// 之所以将这种函数称为reducer，是因为这种函数与Array.prototype.reduce 接收的回调函数属于相同的类型，所以称为reducer
// reduce MDN => https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce

// 因为reducer是一个纯函数，所以当用户想要实现异步任务（延时，网络请求），就需要中间件的支持，也就是enhancer用于对reducer的功能增强

export function createStore(reducer, enhancer) {

  // 使用中间件对原store加强，然后再执行用户的reducer函数，最后返回结果。
  if (enhancer) return enhancer(createStore)(reducer);

  let currentState; // 初始化值
  let currentListeners = []; // 监听的事件集合（当数据变更时，用户想要响应的事件）

  const getState = () => currentState; // 返回当前数据值

  // 更新数据
  const dispatch = (action) => {
    currentState = reducer(currentState, action); // 操作数据
    currentListeners.forEach(listener => listener()); // 当数据变更后，通知事件订阅者。
    return action;
  }

  // 订阅事件监听
  const subscribe = (listener) => {
    currentListeners.push(listener);
    // 返回一个函数 用于取消订阅
    return () => {
      const index = currentListeners.indexOf(listener);
      currentListeners.splice(index, 1);
    }
  }

  // 初始化调用，用于赋予默认值
  dispatch({ type: "INIT_DISPATCH_CALL" });

  return {
    getState,
    dispatch,
    subscribe
  }
}

// 中间件，用于加强reducer
export function applyMiddleware(...middlewares) {
  // middlewares 是接收的多个中间件内容，顺序调用依次对reducer进行增强。

  // 调用时返回一个函数，用于接收store(createStore)，并保存在闭包中可以引用
  return function (createStore) {
    // 第二层的函数 用于接收reducer。（这里是不是很像函数柯里化，多参数转换为单参数函数，并返回新函数可以继续接收单参数。没错这就是柯里化的应用之一）
    return function(reducer) {
      const store = createStore(reducer); // 拿到初始未加强的store中的所有返回操作（get，dispatch，subscribe）。
      // 中间件需要的操作集合
      const midApi = {
        getState: store.getState,
        dispatch: (action, ...args) => enhancerDispatch(action, ...args)
        // 1. 这里不能使用store.dispath。因为是被未被加强过的
        // 2. 通过闭包拿到加强后的dispath，在执行时就能触发所有中间件。
        // 3. 使用示例是addAsync函数，该函数接收的 dispatch => enhancerDispatch
      }

      // 拿到中间件并执行，获取返回后的一个函数链条，中间件内此时可接收 midApi中的参数 拿到并保存。
      const middlewareChain = middlewares.map(middleware => middleware(midApi));

      // 拿到加强后的dispath，也就是经过中间件操作后的结果。这里使用了函数合成（compose）用于对多个函数进行操作，并传入共同参数（store.dispatch）。
      const enhancerDispatch = compose(...middlewareChain)(store.dispatch);
      // 用logger举例，当logger中间件执行时，会先调用logger第一层返回函数，接收 store.dispatch 并保存在next参数中。
      // 然后再返回一个新的函数，最后用户调用dispatch时其实是中间件内的第二个返回函数（enhancerDispatch）。

      // 返回store原有的操作，但将dispatch赋值为经过中间件加强后的函数。
      return {
        ...store,
        dispatch: enhancerDispatch
      }
    }
  }
}

// 中间件的核心原理，就是使用函数合成调用纯函数，不修改传入参数。
// 每个中间件针对不同的逻辑做不同的处理后，返回原来接收的参数。用于下一个中间件使用
// 中间件的使用顺序就是你传入的顺序（尽量避免相同功能的中间件前后顺序传入不一致，否则会多次执行该中间件）。
// 比如logger中间件 如果是第一个传入的话，那么使用async 或promise调用时就会执行两次logger

function compose(...funcs) {
  if (funcs.length === 0) return arg => arg;
  if (funcs.length === 1) return funcs[0];
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}