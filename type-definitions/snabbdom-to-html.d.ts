import {VNode} from "snabbdom";

export interface Module {
  (vnode: VNode): string;
}

declare module "snabbdom-to-html" {
  export default function toHTML(vnode: VNode): string;
}

declare module "snabbdom-to-html/init" {
  export default function init (modules: Module[]): (vnode: VNode) => string;
}

declare module "snabbdom-to-html/modules/attributes" {
  let attrModule: Module;
  export = attrModule;
}

declare module "snabbdom-to-html/modules/style" {
  let styleModule: Module;
  export = styleModule;
}
