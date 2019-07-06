/**
* DevExtreme (ui/resizable.d.ts)
* Version: 19.1.4
* Build date: Mon Jun 17 2019
*
* Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DevExpress from '../bundles/dx.all';

declare global {
interface JQuery {
    dxResizable(): JQuery;
    dxResizable(options: "instance"): DevExpress.ui.dxResizable;
    dxResizable(options: string): any;
    dxResizable(options: string, ...params: any[]): any;
    dxResizable(options: DevExpress.ui.dxResizableOptions): JQuery;
}
}
export default DevExpress.ui.dxResizable;
export type Options = DevExpress.ui.dxResizableOptions;

/** @deprecated use Options instead */
export type IOptions = DevExpress.ui.dxResizableOptions;