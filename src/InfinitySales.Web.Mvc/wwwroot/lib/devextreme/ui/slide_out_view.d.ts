/**
* DevExtreme (ui/slide_out_view.d.ts)
* Version: 19.1.4
* Build date: Mon Jun 17 2019
*
* Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DevExpress from '../bundles/dx.all';

declare global {
interface JQuery {
    dxSlideOutView(): JQuery;
    dxSlideOutView(options: "instance"): DevExpress.ui.dxSlideOutView;
    dxSlideOutView(options: string): any;
    dxSlideOutView(options: string, ...params: any[]): any;
    dxSlideOutView(options: DevExpress.ui.dxSlideOutViewOptions): JQuery;
}
}
export default DevExpress.ui.dxSlideOutView;
export type Options = DevExpress.ui.dxSlideOutViewOptions;

/** @deprecated use Options instead */
export type IOptions = DevExpress.ui.dxSlideOutViewOptions;