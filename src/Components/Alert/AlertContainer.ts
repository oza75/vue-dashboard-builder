import Alert from './Alert';
import { AlertType } from './AlertType';

class AlertContainer {
  get alerts (): Array<Alert> {
    return this._alerts;
  }

  set alerts (value: Array<Alert>) {
    this._alerts = value;
  }

  private _alerts: Array<Alert> = [];

  add (type: AlertType, message: string) {
    let alert: Alert = new Alert();
    this.alerts.push(alert);
    alert.type = type;
    alert.message = message;
    return alert;
  }

  info (message: string) {
    return this.add(AlertType.INFO, message);
  }

  error (message: string) {
    return this.add(AlertType.ERROR, message);
  }

  success (message: string) {
    return this.add(AlertType.SUCCESS, message);
  }

  warning (message: string) {
    return this.add(AlertType.WARNING, message);
  }

  remove (index: number) {
    this.alerts.splice(index, 1);
  }
}

const _container = new AlertContainer();
const info = (message: string) => _container.info(message);
const success = (message: string) => _container.success(message);
const error = (message: string) => _container.error(message);
const warning = (message: string) => _container.warning(message);
export { info, success, error, warning };
export default AlertContainer;
export const AlertInstance = _container;
