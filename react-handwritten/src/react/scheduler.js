const taskQueue = []; // 任务
const timerQueue = []; // 当前任务

let deadline = 0; // 过期时间
const threshold = 5; // 时间间隔

// 简易版实现 react 中的 scheduler
export const scheduleCallback = (callback) => {
  const newTask = { callback };
  taskQueue.push(newTask);

  schedule(flushWork);
}

// 任务调度（决定何时执行剩余任务，采用requestIdleCallback的设计理念）
const schedule = (callback) => {
  timerQueue.push(callback);
  postMessage();
}

// 消息通道
const postMessage = () => {
  const { port1, port2 } = new MessageChannel(); // react中默认使用，不支持则降级为settimeout

  // 执行时刻
  port1.onmessage = () => {
    let tem = timerQueue.splice(0, timerQueue.length); // 执行并清空，避免下一轮重复执行已经执行过的
    tem.forEach(c => c()); // flushWork
  }
  port2.postMessage(null);
}

// 执行任务
const flushWork = () => {
  deadline = getCurrentTime() + threshold;
  let currentTask = taskQueue[0]; // scheduleCallback => callback
  while (currentTask && !shouldYield()) {
    const { callback } = currentTask;
    callback();
    taskQueue.shift(); // 移除已经执行的
    currentTask = taskQueue[0]; // 继续执行下一个 
  }
}

// 是否停止
export const shouldYield = () => getCurrentTime() >= deadline;

// 获取当前时间
export const getCurrentTime = () => performance.now();