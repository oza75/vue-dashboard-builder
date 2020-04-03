declare class Form {
    data: any;
    constructor(data: any);
    append(key: string, value: any): void;
    delete(key: string): void;
    get(key: string): any;
    keys(): Array<string>;
    entries(): [string, unknown][];
    toFormData(): FormData;
    toObject(): any;
    private addToFormData;
}
export default Form;
