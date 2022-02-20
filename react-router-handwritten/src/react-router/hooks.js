import { useContext } from "react";
import RouterContext from "./RouterContext";

// 创建hook 用于组件中想使用router的props数据。

export function useHistory() {
  return useContext(RouterContext).history;
}

export function useLocation() {
  return useContext(RouterContext).location;
}

export function useParams() {
  const match = useContext(RouterContext).match;
  return match ? match.params : {};
}

export function useRouter() {
  return useContext(RouterContext);
}