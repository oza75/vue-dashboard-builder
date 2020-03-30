import { AlertType } from './AlertType';
declare class Alert {
    get isVisible(): boolean;
    set isVisible(value: boolean);
    get type(): AlertType;
    set type(value: AlertType);
    get message(): string;
    set message(value: string);
    visible(): void;
    private _type;
    private _message;
    private _isVisible;
}
export default Alert;
