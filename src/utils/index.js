/* global window */
import classnames from 'classnames'
import lodash from 'lodash'
import config from './config'
import request from './request'

// 连字符转驼峰
String.prototype.hyphenToHump = function () {
  return this.replace(/-(\w)/g, (...args) => {
    return args[1].toUpperCase()
  })
}

// 驼峰转连字符
String.prototype.humpToHyphen = function () {
  return this.replace(/([A-Z])/g, '-$1').toLowerCase()
}

// 日期格式化
Date.prototype.format = function (format) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'H+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    S: this.getMilliseconds()
  }
  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, `${this.getFullYear()}`.substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp(`(${k})`).test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : `00${o[k]}`.substr(`${o[k]}`.length))
    }
  }
  return format
}


/**
 * @param   {String}
 * @return  {String}
 */

const queryURL = (name) => {
  let reg = new RegExp(`(^|&)${name}=([^&]*)(&|$)`, 'i')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) { return decodeURI(r[2]) }
  return null
}

/**
 * 数组内查询
 * @param   {array}      array
 * @param   {String}    id
 * @param   {String}    keyAlias
 * @return  {Array}
 */
const queryArray = (array, key, keyAlias = 'key') => {
  if (!(array instanceof Array)) {
    return null
  }
  const item = array.filter(_ => _[keyAlias] === key)
  if (item.length) {
    return item[0]
  }
  return null
}

/**
 * 数组格式转树状结构
 * @param   {array}     array
 * @param   {String}    id
 * @param   {String}    pid
 * @param   {String}    children
 * @return  {Array}
 */
const arrayToTree = (array, id = 'id', pid = 'pid', children = 'children') => {
  let data = lodash.cloneDeep(array)
  let result = []
  let hash = {}
  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach((item) => {
    let hashVP = hash[item[pid]]
    if (hashVP) {
      !hashVP[children] && (hashVP[children] = [])
      hashVP[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}

// 深复制，支持大部分类型
const deepClone = (values) => {
  let copy;

  // Handle the 3 simple types, and null or undefined
  if (values == null || typeof values !== 'object') { return values; }

  // Handle Date
  if (values instanceof Date) {
    copy = new Date();
    copy.setTime(values.getTime());
    return copy;
  }

  // Handle Array
  if (values instanceof Array) {
    copy = [];
    for (let i = 0, len = values.length; i < len; i++) {
      copy[i] = deepClone(values[i]);
    }
    return copy;
  }

  // Handle Object
  if (values instanceof Object) {
    copy = {};
    for (const attr in values) {
      if (values.hasOwnProperty(attr)) { copy[attr] = deepClone(values[attr]); }
    }
    return copy;
  }

  throw new Error('Unable to copy values! Its type isn\'t supported.');
};

// 点击复制
/*const copyTextToClipboard = (text, callback, msg) => {
  const successMsg = msg || '复制成功';
  const browser = navigator.userAgent;
  let msg = '若点击复制分享链接无效，请长按内容手动复制';
  if (browser.match(/(iPhone|iPod|iPad);?/i)) {
    let divArea = document.createElement("div");
    divArea.style.position = 'fixed';
    divArea.style.top = 0;
    divArea.style.left = 0;
    divArea.style.width = '2em';
    divArea.style.height = '2em';
    divArea.style.padding = 0;
    divArea.style.border = 'none';
    divArea.style.outline = 'none';
    divArea.style.boxShadow = 'none';
    divArea.style.opacity = 0;
    divArea.innerHTML = text;
    document.body.appendChild(divArea);
    const range = document.createRange();
    range.selectNode(divArea);
    window.getSelection().removeAllRanges(); // 清空之前选中
    window.getSelection().addRange(range);
    try {
      msg = document.execCommand('copy') ? successMsg : msg;
    } catch (err) { }
    setTimeout(() => { document.body.removeChild(divArea); }, 1000)

  } else if (browser.indexOf('Android') > -1) {
    let textArea = document.createElement("textarea");
    textArea.style.position = 'fixed';
    textArea.style.top = 0;
    textArea.style.left = 0;
    textArea.style.width = '2em';
    textArea.style.height = '2em';
    textArea.style.padding = 0;
    textArea.style.border = 'none';
    textArea.style.outline = 'none';
    textArea.style.boxShadow = 'none';
    textArea.style.background = 'transparent';
    textArea.innerHTML = text;
    textArea.readonly = "readonly";
    document.body.appendChild(textArea);

    textArea.select();
    try {
      msg = document.execCommand('copy') ? successMsg : msg;
    } catch (err) { }
    document.body.removeChild(textArea);
  }
  if (typeof callback === "function") {
    callback(msg);
  } else {
    alert(msg);
  }
};*/

module.exports = {
  config,
  request,
  classnames,
  queryURL,
  queryArray,
  arrayToTree,
  deepClone,
  //copyTextToClipboard
}
