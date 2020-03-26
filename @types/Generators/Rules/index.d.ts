export interface Rule {
    (value: string | number | object | Array<any>, params?: any, el?: HTMLElement): boolean;
}
export declare const required: Rule;
export declare const min: Rule;
export declare const max: Rule;
declare const rules: any;
export default rules;
