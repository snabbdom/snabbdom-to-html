declare module "snabbdom-to-html-common" {
  import {VNode} from "snabbdom/vnode"
  
  interface Module {
    (vnode: VNode, attributes: Map<string, number | string>): void;
  }

  interface ModuleIndex {
    class: Module;
    props: Module;
    attributes: Module;
    style: Module;
  }

  export {
    VNode,
    ModuleIndex,
    Module
  }
}

declare module "snabbdom-to-html" {
  import {VNode} from "snabbdom-to-html-common";
  function toHTML(vnode: VNode): string;
  export = toHTML
}

declare module "snabbdom-to-html/init" {
  import {VNode, Module, ModuleIndex} from "snabbdom-to-html-common";
  function init (modules: Module[]): (vnode: VNode) => string;
  export = init
}


declare module "snabbdom-to-html/modules" {
  import {ModuleIndex} from "snabbdom-to-html-common";
  let modules: ModuleIndex;
  export = modules
}

declare module "snabbdom-to-html/modules/index" {
  import {ModuleIndex} from "snabbdom-to-html-common";
  let modules: ModuleIndex;
  export = modules
}

declare module "snabbdom-to-html/modules/attributes" {
  import {Module} from "snabbdom-to-html-common";
  let attrModule: Module;
  export = attrModule;
}

declare module "snabbdom-to-html/modules/class" {
  import {Module} from "snabbdom-to-html-common";
  let classModule: Module;
  export = classModule;
}

declare module "snabbdom-to-html/modules/props" {
  import {Module} from "snabbdom-to-html-common";
  let propsModule: Module;
  export = propsModule;
}

declare module "snabbdom-to-html/modules/style" {
  import {Module} from "snabbdom-to-html-common";
  let styleModule: Module;
  export = styleModule;
}
