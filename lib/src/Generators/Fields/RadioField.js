import Field from '../Field';
class RadioField extends Field {
    constructor() {
        super(...arguments);
        this.components = {
            edit: 'dashboard-edit-radio-field',
            show: 'dashboard-show-radio-field',
            index: 'dashboard-table-show-radio-field'
        };
    }
    options(options) {
        this.addProp('options', options);
        this.components.edit = 'dashboard-edit-radio-field';
    }
}
export default RadioField;
