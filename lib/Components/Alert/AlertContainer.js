import Alert from './Alert';
import { AlertType } from './AlertType';
class AlertContainer {
    constructor() {
        this._alerts = [];
    }
    get alerts() {
        return this._alerts;
    }
    set alerts(value) {
        this._alerts = value;
    }
    add(type, message) {
        const alert = new Alert();
        this.alerts.push(alert);
        alert.type = type;
        alert.message = message;
        return alert;
    }
    info(message) {
        return this.add(AlertType.INFO, message);
    }
    error(message) {
        return this.add(AlertType.ERROR, message);
    }
    success(message) {
        return this.add(AlertType.SUCCESS, message);
    }
    warning(message) {
        return this.add(AlertType.WARNING, message);
    }
    remove(index) {
        this.alerts.splice(index, 1);
    }
}
const _container = new AlertContainer();
const info = (message) => _container.info(message);
const success = (message) => _container.success(message);
const error = (message) => _container.error(message);
const warning = (message) => _container.warning(message);
export { info, success, error, warning };
export default AlertContainer;
export const AlertInstance = _container;
