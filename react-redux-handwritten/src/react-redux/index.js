import React, {
  useContext,
  useState,
  useCallback,
  useLayoutEffect
 } from "react";

// 创建上下文（Context），传递store
const Context = React.createContext();

// 通过Provider传递value（接收到的store）
export function Provider({ store, children }) {
  return <Context.Provider value={store}>{children}</Context.Provider>
}

// connect，是一个高阶组件（参数是组件，返回值是组件）
export function connect(mapStateToProps, mapDispatchToProps) {

  // 第一个返回函数接收一个组件
  return function(WrappedComponent) {
    // 第二个返回函数接收props, 这里的返回值其实就是 WrappedIndex（是一个函数式组件，可接收props进行其他逻辑操作）
    return function(props) {
      // console.log("connect props", props);
      
      const store = useContext(Context); // 拿到接收的数据（Provider传递的）
      const { getState, dispatch, subscribe } = store;
      const stateProps = mapStateToProps(getState()); // 返回store中的state（初始化）

      // 合并dispatch选项，让用户可以直接调用dispatch传递action，进行操作。
      let dispatchProps = { };
      if (typeof mapDispatchToProps === "object") { // 是对象则合并，并保存传递的函数
        dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
      }
      if (typeof mapDispatchToProps === "function") { // 是函数则直接调用并传入dispatch给用户使用
        dispatchProps = mapDispatchToProps(dispatch);
      }

      // 更新
      const forceUpdate = useForceUpdate();

      // 初始化监听和卸载时取消监听
      useLayoutEffect(() => {
        const unsubscribe = subscribe(() => {
          forceUpdate();
        })
        return () => {
          unsubscribe && unsubscribe()
        }
      }, [store])

      // 返回第一个函数接收的组件，并给该组件 添加props（接收到的props，mapstateProps，dispatchProps）。
      // 这样就将组件中需要的数据，操作等参数通过props的方式传递下去了。并且帮助该组件自动完成了数据监听（更新组件），组件销毁时（卸载监听）。
      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} dispatch={dispatch}/>
    }
  }
}

// 使用hook返回dispatch
export function useDispatch() {
  const store = useContext(Context);
  return store.dispatch;
}

// 使用函数hooks创建一个自增的更新函数。当state变化时 就能触发更新
function useForceUpdate() {
  const [, setState] = useState(0);
  const update = useCallback(() => {
    setState(prev => prev + 1)
  }, [])
  return update;
}

export function bindActionCreators(creators, dispatch) {
  const obj = {};
  for (const key in creators) {
    obj[key] = bindActionCreator(creators[key], dispatch);
  }
  return obj;
}

function bindActionCreator(creator, dispatch) {
  // 这里的args，是触发这个函数的宿主元素（input => onChange, div => onClick）;
  // 该函数绑定在谁身上触发，或者手动调用触发，接收的宿主或传递的参数
  return (...args) => dispatch(creator(...args))
}


