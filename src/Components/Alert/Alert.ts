import { AlertType } from './AlertType';

class Alert {
  get isVisible (): boolean {
    return this._isVisible;
  }

  set isVisible (value: boolean) {
    this._isVisible = value;
  }

  get type (): AlertType {
    return this._type;
  }

  get message (): string {
    return this._message;
  }

  set message (value: string) {
    this._message = value;
  }

  set type (value: AlertType) {
    this._type = value;
  }

  visible () {
    this._isVisible = true;
  }

  private _type: AlertType = AlertType.INFO;
  private _message: string = '';
  private _isVisible: boolean = false;
}

export default Alert;
