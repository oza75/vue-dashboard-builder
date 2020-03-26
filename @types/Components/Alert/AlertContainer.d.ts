import Alert from './Alert';
import { AlertType } from './AlertType';
declare class AlertContainer {
    get alerts(): Array<Alert>;
    set alerts(value: Array<Alert>);
    private _alerts;
    add(type: AlertType, message: string): Alert;
    info(message: string): Alert;
    error(message: string): Alert;
    success(message: string): Alert;
    warning(message: string): Alert;
    remove(index: number): void;
}
declare const info: (message: string) => Alert;
declare const success: (message: string) => Alert;
declare const error: (message: string) => Alert;
declare const warning: (message: string) => Alert;
export { info, success, error, warning };
export default AlertContainer;
export declare const AlertInstance: AlertContainer;
