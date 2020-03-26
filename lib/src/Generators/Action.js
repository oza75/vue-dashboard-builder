class Action {
    constructor(title) {
        this.context = {};
        this.name = null;
        this.title = title || null;
        if (!this.name) {
            this.name = this.constructor.name.replace('Action', '');
        }
        if (!this.title) {
            this.title = this.constructor.name.replace('Action', '');
        }
    }
    setContext(context) {
        this.context = context;
    }
}
export default Action;
