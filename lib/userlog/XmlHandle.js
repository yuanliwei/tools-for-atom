'use babel';

import { $ } from 'atom-space-pen-views';

/*
  xml处理器
*/
export default class XmlHandle {
  constructor(xml) {
    this.xml = $.parseXML(xml)
  }

  /*
    获取有指定name属性的节点的内容
  */
  T(name){
    return this.xml.querySelector(`*[name=${name}]`).textContent
  }

  /*
    获取有指定name属性的节点的值
  */
  V(name){
    return this.xml.querySelector(`*[name=${name}]`).getAttribute('value')
  }
}
