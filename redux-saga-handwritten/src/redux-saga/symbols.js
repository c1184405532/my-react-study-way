// 此文件是源码中的配置文件，直接拷贝复用即可

const createSymbol = name => "@@redux-saga/" + name;

export const CANCEL =
  /*#__PURE__*/
  createSymbol('CANCEL_PROMISE');
export const  CHANNEL_END_TYPE =
  /*#__PURE__*/
  createSymbol('CHANNEL_END');
export const IO =
  /*#__PURE__*/
  createSymbol('IO');
export const MATCH =
  /*#__PURE__*/
  createSymbol('MATCH');
export const MULTICAST =
  /*#__PURE__*/
  createSymbol('MULTICAST');
export const SAGA_ACTION =
  /*#__PURE__*/
  createSymbol('SAGA_ACTION');
export const SELF_CANCELLATION =
  /*#__PURE__*/
  createSymbol('SELF_CANCELLATION');
export const TASK =
  /*#__PURE__*/
  createSymbol('TASK');
export const TASK_CANCEL =
  /*#__PURE__*/
  createSymbol('TASK_CANCEL');
export const TERMINATE =
  /*#__PURE__*/
  createSymbol('TERMINATE');
export const SAGA_LOCATION =
  /*#__PURE__*/
  createSymbol('LOCATION');