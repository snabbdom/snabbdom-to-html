import {VNode} from "snabbdom";

export interface Module {
  (vnode: VNode, attributes: Map<string, number | string>): void;
}

declare module "snabbdom-to-html" {
  export default function toHTML(vnode: VNode): string;
}

declare module "snabbdom-to-html/init" {
  export default function init (modules: Module[]): (vnode: VNode) => string;
}

export interface ModuleIndex {
  class: Module;
  props: Module;
  attributes: Module;
  style: Module;
}

declare module "snabbdom-to-html/modules" {
  let modules: ModuleIndex;
  export = modules
}

declare module "snabbdom-to-html/modules/index" {
  let modules: ModuleIndex;
  export = modules
}

declare module "snabbdom-to-html/modules/attributes" {
  let attrModule: Module;
  export = attrModule;
}

declare module "snabbdom-to-html/modules/class" {
  let classModule: Module;
  export = classModule;
}


declare module "snabbdom-to-html-modules/props" {
  let propsModule: Module;
  export = propsModule;
}

declare module "snabbdom-to-html/modules/style" {
  let styleModule: Module;
  export = styleModule;
}
