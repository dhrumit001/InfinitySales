/**
* DevExtreme (viz/sankey.d.ts)
* Version: 19.1.4
* Build date: Mon Jun 17 2019
*
* Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DevExpress from '../bundles/dx.all';

declare global {
interface JQuery {
    dxSankey(): JQuery;
    dxSankey(options: "instance"): DevExpress.viz.dxSankey;
    dxSankey(options: string): any;
    dxSankey(options: string, ...params: any[]): any;
    dxSankey(options: DevExpress.viz.dxSankeyOptions): JQuery;
}
}
export default DevExpress.viz.dxSankey;
export type Options = DevExpress.viz.dxSankeyOptions;

/** @deprecated use Options instead */
export type IOptions = DevExpress.viz.dxSankeyOptions;