const validate = (name, value, type) => {
  let valid = true;
  switch (type) {
    case 'number':
      valid = !isNaN(value);
      break;
    case 'string':
      valid = typeof value === 'string';
      break;
    case 'array':
      valid = value instanceof Array;
      break;
    case 'object':
      valid = typeof value === 'object';
      break;
    case 'boolean':
      valid = typeof value === 'boolean';
      break;
    case 'function':
      valid = typeof value === 'function';
      break;
    default:
      valid = true;
      break;
  }
  if (!valid) {
    console.log(`'${name}' must be a ${type}!`);
  } else {
    return true;
  }
}

class Event {
  /**
     * Creates an instance of Event.
     * @author zhangfan
     * @param   {string}        name                [required]      default:
     * @param   {function}      condition           [option]        default: (() => {})
     * @param   {function}      handler             [option]        default: (() => {})
     * @memberof Event
     */
  constructor(opts = {}) {
    this.name = opts.name;
    this.condition = typeof opts.condition === 'function' ? opts.condition.bind(this) : () => {};
    this.handler = typeof opts.handler === 'function' ? opts.handler.bind(this) : () => {};
  }
}

class EventHandler {
  /**
     * Creates an instance of EventHandler.
     * @author zhangfan
     * @memberof EventHandler
     */
  constructor(opts = {}) {
    this.eventList = {};
    this.eventRely = {};
    this.passiveEventList = {};
    this.watchList = {};
    this.timer = undefined;
  }
  /**
     * @description 注册事件，事件触发后将执行handler
     * @author      zhangfan
     * @param       {string}        eventName   [required]      default:
     * @param       {function}      handler     [required]      default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  on(eventName, handler) {
    validate('eventName', eventName, 'string');
    validate('handler', handler, 'function');
    if (!(eventName in this.eventList)) {
      this.eventList[eventName] = [];
    }
    this.eventList[eventName].push(handler);
    return this;// to support chain method
  }
  /**
     * @description 解绑事件，handler为空时将解绑该事件所有handler
     * @author      zhangfan
     * @param       {string}        eventName   [required]      default:
     * @param       {function}      handler     [options]       default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  off(eventName, handler) {
    validate('eventName', eventName, 'string');
    if (this.eventList[eventName] === undefined) {
      // throw new Error(`'${eventName}' has not been registered!`);
    }
    if (handler === undefined) {
      // remove all handlers
      this.eventList[eventName] = [];
      return this;// to support chain method
    } 
    validate('handler', handler, 'function');
    for (let i = 0; i < this.eventList[eventName].length; i++) {
      if (this.eventList[eventName][i] === handler) {
        this.eventList[eventName].splice(i, 1);
        i--;
      }
    }
        
    return this;// to support chain method
  }
  /**
     * @description 触发事件，事件触发后将执行该事件下所有handler，param将被传入handler中
     * @author      zhangfan
     * @param       {string}        eventName   [required]      default:
     * @param       {any}           param       [options]       default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  emit(eventName, param) {
    validate('eventName', eventName, 'string');
    if (!this.eventList[eventName]) {
      this.eventList[eventName] = [];
      // throw new Error(`'${eventName}' emitted before defined!`);
    }
    for (let i = 0; i < this.eventList[eventName].length; i++) {
      const handler = this.eventList[eventName][i];
      handler(param);
    }
    this._checkRely(eventName);
    return this;// to support chain method
  }
  /**
     * @description 添加事件依赖，relyEventList为事件名称的数组，relyEventList中的事件全部执行后将触发依赖事件
     * @author      zhangfan
     * @param       {string}        eventName           [required]      default:
     * @param       {array}         relyEventList       [required]      default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  rely(eventName, relyEventList) {
    validate('eventName', eventName, 'string');
    validate('relyEventList', relyEventList, 'array');
    if (this.eventRely[eventName] === undefined) {
      this.eventRely[eventName] = [];
    }
    for (let i = 0; i < relyEventList.length; i++) {
      if (this.eventRely[eventName].indexOf(relyEventList[i]) === -1) {
        this.eventRely[eventName].push(relyEventList[i]);
      }
    }
    return this;// to support chain method
  }
  /**
     * @description 检查依赖事件，将事件名称为eventName的事件从被依赖数组去除
     * @author      zhangfan
     * @param       {string}        eventName       [required]      default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  _checkRely(eventName) {
    validate('eventName', eventName, 'string');
    for (const relyEvent in this.eventRely) {
      for (let i = 0; i < this.eventRely[relyEvent].length; i++) {
        if (this.eventRely[relyEvent][i] === eventName) {
          this.eventRely[relyEvent].splice(i, 1);
          break;
        }
      }
      if (this.eventRely[relyEvent].length === 0) {
        const relyEventName = relyEvent;
        delete this.eventRely[relyEvent];
        this.emit(relyEventName);
      }
    }
    return this;
  }
  /**
     * @description 添加被动事件，被动事件定义为当条件满足时才触发的事件，检查条件是否满足需要时机，检查时机为checkPassiveEvent被调用时
     * @author      zhangfan
     * @param       {event}         event       [required]      default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  addPassiveEvent(event) {
    this.passiveEventList[event.name] = event;
    return this;
  }
  /**
     * @description 检查被动事件，检查条件是否满足，当条件满足时调用被动事件的handler
     * @author      zhangfan
     * @param       {event}         event       [required]      default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  checkPassiveEvent(list) {
    const passiveEventList = list || this.passiveEventList;
    Object.keys(passiveEventList).forEach((eventName) => {
      if (passiveEventList[eventName].condition()) {
        passiveEventList[eventName].handler();
      }
    });
    return this;
  }
  /**
     * @description 观察事件，通过定期检查被动事件，从而达到满足条件即触发被动事件的效果，检查周期interval可以自定义，单位为ms
     * @author      zhangfan
     * @param       {event}         event       [required]      default:
     * @param       {number}        interval    [required]      default:
     * @returns     {object}        self
     * @memberof    EventHandler
     */
  watch(event, interval) {
    const self = this;
    self.watchList[event.name] = event;
    if (typeof self.timer === 'undefined' || typeof interval !== 'undefined') {
      if (typeof self.timer !== 'undefined') {
        clearInterval(self.timer);
      }
      self.timer = setInterval(() => {
        self.checkPassiveEvent(self.watchList);
      }, interval || 100);
    }
    return this;
  }
}

Event.eventHandler = new EventHandler();

export {
  Event,
  EventHandler
};