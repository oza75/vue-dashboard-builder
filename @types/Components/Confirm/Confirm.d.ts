export interface Callback {
    type: string;
    handler: Function;
}
declare class Confirm {
    get title(): string | undefined;
    set title(value: string | undefined);
    get message(): string | undefined;
    set message(value: string | undefined);
    get show(): boolean;
    private _title;
    private _message;
    private _callbacks;
    constructor(message?: string, title?: string);
    ask(message: string, title?: string): this;
    then(cb: Function): this;
    catch(cb: Function): this;
    reset(): void;
    exec(type: string): void;
}
declare const _confirm: Confirm;
declare const confirm: (message: string, title?: string | undefined) => Confirm;
export { Confirm, confirm };
export default _confirm;
