class Confirm {
    constructor(message, title) {
        this._callbacks = [];
        this._message = message;
        this._title = title;
    }
    get title() {
        return this._title;
    }
    set title(value) {
        this._title = value;
    }
    get message() {
        return this._message;
    }
    set message(value) {
        this._message = value;
    }
    get show() {
        return !!this.message;
    }
    ask(message, title) {
        this._message = message;
        this._title = title;
        return this;
    }
    then(cb) {
        this._callbacks.push({ type: 'confirm', handler: cb });
        return this;
    }
    catch(cb) {
        this._callbacks.push({ type: 'cancel', handler: cb });
        return this;
    }
    reset() {
        this._message = undefined;
        this._callbacks = [];
        this._title = undefined;
    }
    exec(type) {
        this._callbacks.forEach((cb) => {
            if (cb.type === type)
                cb.handler();
        });
    }
}
const _confirm = new Confirm();
const confirm = (message, title) => {
    return _confirm.ask(message, title);
};
export { Confirm, confirm };
export default _confirm;
