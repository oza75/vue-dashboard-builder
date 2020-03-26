export interface Callback {
    type: string;
    handler: Function;
}

class Confirm {
  get title (): string | undefined {
    return this._title;
  }

  set title (value: string | undefined) {
    this._title = value;
  }

  get message (): string | undefined {
    return this._message;
  }

  set message (value: string | undefined) {
    this._message = value;
  }

  get show () {
    return !!this.message;
  }

    private _title: string | undefined;
    private _message: string | undefined;
    private _callbacks: Array<Callback> = [];

    constructor (message?: string, title?: string) {
      this._message = message;
      this._title = title;
    }

    ask (message: string, title?: string) {
      this._message = message;
      this._title = title;

      return this;
    }

    then (cb: Function) {
      this._callbacks.push({ type: 'confirm', handler: cb });

      return this;
    }

    catch (cb: Function) {
      this._callbacks.push({ type: 'cancel', handler: cb });

      return this;
    }

    reset () {
      this._message = undefined;
      this._callbacks = [];
      this._title = undefined;
    }

    exec (type: string) {
      this._callbacks.forEach((cb: Callback) => {
        if (cb.type === type) cb.handler();
      });
    }
}

const _confirm = new Confirm();
const confirm = (message: string, title?: string): Confirm => {
  return _confirm.ask(message, title);
};

export { Confirm, confirm };

export default _confirm;
