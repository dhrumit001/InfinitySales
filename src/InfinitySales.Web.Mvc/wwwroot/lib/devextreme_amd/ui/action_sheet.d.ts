/**
* DevExtreme (ui/action_sheet.d.ts)
* Version: 19.1.4
* Build date: Mon Jun 17 2019
*
* Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DevExpress from '../bundles/dx.all';

declare global {
interface JQuery {
    dxActionSheet(): JQuery;
    dxActionSheet(options: "instance"): DevExpress.ui.dxActionSheet;
    dxActionSheet(options: string): any;
    dxActionSheet(options: string, ...params: any[]): any;
    dxActionSheet(options: DevExpress.ui.dxActionSheetOptions): JQuery;
}
}
export default DevExpress.ui.dxActionSheet;
export type Options = DevExpress.ui.dxActionSheetOptions;

/** @deprecated use Options instead */
export type IOptions = DevExpress.ui.dxActionSheetOptions;