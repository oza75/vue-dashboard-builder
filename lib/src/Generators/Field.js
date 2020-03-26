import Rules from './Rules';
export default class Field {
    constructor(column, title) {
        this.components = { edit: '', show: '', index: '' };
        this._sortable = true;
        this.props = {};
        this._canEdit = true;
        this._rules = [];
        this.render_functions = {
            render_in_table: [],
            render_edit: [],
            render_show: []
        };
        this.visibleIn = {
            index: true,
            show: true,
            edit: true
        };
        this.column = column;
        this.title = title || column;
    }
    view(type, value, item) {
        return this.render_functions[type].reduce((acc, f) => {
            acc = f(acc, item);
            return acc;
        }, value);
    }
    renderInTable(f) {
        return this.yield("render_in_table", f);
    }
    renderShow(f) {
        return this.yield("render_show", f);
    }
    renderEdit(f) {
        return this.yield("render_edit", f);
    }
    yield(type, f) {
        this.render_functions[type].push(f);
        return this;
    }
    render(f) {
        this.renderInTable(f);
        this.renderShow(f);
        this.renderEdit(f);
        return this;
    }
    getColumn() {
        return this.column;
    }
    sortable(sortable = true) {
        this._sortable = sortable;
        return this;
    }
    isSortable() {
        return this._sortable;
    }
    hideInIndex() {
        return this.hideIn('index');
    }
    hideInShow() {
        return this.hideIn('show');
    }
    hideInEdit() {
        return this.hideIn('edit');
    }
    hideIn(type) {
        this.visibleIn[type] = false;
        return this;
    }
    onlyInIndex() {
        this.hideInEdit();
        this.hideInShow();
        return this;
    }
    onlyInShow() {
        this.hideInIndex();
        this.hideInEdit();
        return this;
    }
    onlyInEdit() {
        this.hideInShow();
        this.hideInIndex();
        return this;
    }
    isVisible(type) {
        return this.visibleIn[type] || false;
    }
    getProps() {
        return this.props;
    }
    addProp(name, value) {
        this.props[name] = value;
        return this;
    }
    disableEdition() {
        this._canEdit = false;
        return this;
    }
    activeEdition() {
        this._canEdit = true;
        return this;
    }
    editable() {
        return this._canEdit;
    }
    getTitle() {
        return this.title || this.column;
    }
    rules(rules) {
        rules.forEach((rule) => {
            let params = null;
            if (typeof rule === "object") {
                params = rule[1];
                rule = rule[0];
            }
            if (typeof rule == 'string') {
                rule = Rules[rule] ? Rules[rule] : null;
            }
            if (rule) {
                let formatted = params !== null ? (typeof params === "object" ? params : [params]) : [];
                this._rules.push([rule, formatted]);
                if (rule.name) {
                    this.addProp(rule.name, params !== null ? params : true);
                }
            }
        });
        return this;
    }
    getRules() {
        return this._rules;
    }
}
