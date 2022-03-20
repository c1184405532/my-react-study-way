export class Component {
  static isReactComponent = {};
  constructor(props) {
    this.props = props;
  }
}

export { useState, useReducer, useEffect, useLayoutEffect } from "./hooks.js"