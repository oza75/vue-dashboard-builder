import Field from '../Field';
class SelectField extends Field {
    constructor() {
        super(...arguments);
        this.components = {
            edit: 'dashboard-edit-select-field',
            index: 'dashboard-table-show-select-field',
            show: 'dashboard-show-select-field'
        };
    }
    options(options) {
        return this.addProp('options', options);
    }
    displayUsingLabel() {
        return this.addProp('displayUsingLabel', true);
    }
    optionsFrom(url, resolver) {
        this.addProp('optionsFrom', url);
        const defaultResolver = response => response.data;
        return this.addProp('optionsResolver', resolver || defaultResolver);
    }
    valueKey(key) {
        return this.addProp('valueKey', key);
    }
    textKey(key) {
        return this.addProp('textKey', key);
    }
}
export default SelectField;
