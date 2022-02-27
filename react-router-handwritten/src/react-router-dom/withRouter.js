
import RouterContext from "./RouterContext";

// 在hook没出来之前，获取父级props，使用的是withRouter（hoc）
const withRouter = (WrapperComponent) => (props) => {
  return <RouterContext.Consumer>
    {(context) => {
      return <WrapperComponent {...props} {...context} />
    }}
  </RouterContext.Consumer>
}

export default withRouter;


