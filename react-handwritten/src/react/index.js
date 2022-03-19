export class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
  }
}

export { useReducer } from "./hooks.js"