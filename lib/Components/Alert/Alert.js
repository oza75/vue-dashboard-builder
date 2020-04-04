import { AlertType } from './AlertType';
class Alert {
    constructor() {
        this._type = AlertType.INFO;
        this._message = '';
        this._isVisible = false;
    }
    get isVisible() {
        return this._isVisible;
    }
    set isVisible(value) {
        this._isVisible = value;
    }
    get type() {
        return this._type;
    }
    set type(value) {
        this._type = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    visible() {
        this._isVisible = true;
    }
}
export default Alert;
