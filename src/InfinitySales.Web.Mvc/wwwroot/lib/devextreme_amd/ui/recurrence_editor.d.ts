/**
* DevExtreme (ui/recurrence_editor.d.ts)
* Version: 19.1.4
* Build date: Mon Jun 17 2019
*
* Copyright (c) 2012 - 2019 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import DevExpress from '../bundles/dx.all';

declare global {
interface JQuery {
    dxRecurrenceEditor(): JQuery;
    dxRecurrenceEditor(options: "instance"): DevExpress.ui.dxRecurrenceEditor;
    dxRecurrenceEditor(options: string): any;
    dxRecurrenceEditor(options: string, ...params: any[]): any;
    dxRecurrenceEditor(options: DevExpress.ui.dxRecurrenceEditorOptions): JQuery;
}
}
export default DevExpress.ui.dxRecurrenceEditor;
export type Options = DevExpress.ui.dxRecurrenceEditorOptions;

/** @deprecated use Options instead */
export type IOptions = DevExpress.ui.dxRecurrenceEditorOptions;