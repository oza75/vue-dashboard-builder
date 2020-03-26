import Field from '../Field';
class HasOneField extends Field {
    constructor() {
        super(...arguments);
        this.components = {
            edit: 'dashboard-edit-text-field',
            show: 'dashboard-show-text-field',
            index: 'dashboard-table-show-text-field'
        };
    }
}
export default HasOneField;
