import {VNode} from "snabbdom";

export interface Module {
  (vnode: VNode, attributes: Map<string, number | string>): void;
}

declare module "snabbdom-to-html" {
  namespace toHTML { }
  function toHTML(vnode: VNode): string;
  export = toHTML
}

declare module "snabbdom-to-html/init" {
  namespace init { }
  function init (modules: Module[]): (vnode: VNode) => string;
  export = init
}

export interface ModuleIndex {
  class: Module;
  props: Module;
  attributes: Module;
  style: Module;
}

declare module "snabbdom-to-html/modules" {
  namespace modules { }
  let modules: ModuleIndex;
  export = modules
}

declare module "snabbdom-to-html/modules/index" {
  namespace modules { }
  let modules: ModuleIndex;
  export = modules
}

declare module "snabbdom-to-html/modules/attributes" {
  namespace attrModule { }
  let attrModule: Module;
  export = attrModule;
}

declare module "snabbdom-to-html/modules/class" {
  namespace classModule { }
  let classModule: Module;
  export = classModule;
}

declare module "snabbdom-to-html/modules/props" {
  namespace propsModule { }
  let propsModule: Module;
  export = propsModule;
}

declare module "snabbdom-to-html/modules/style" {
  namespace styleModule { }
  let styleModule: Module;
  export = styleModule;
}
