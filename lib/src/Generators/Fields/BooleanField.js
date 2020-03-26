import RadioField from './RadioField';
class BooleanField extends RadioField {
    constructor(column, title) {
        super(column, title);
        this._sortable = false;
        this.components.index = 'dashboard-table-show-boolean-field';
        this.components.show = 'dashboard-show-boolean-field';
        this.options({ 1: 'Yes', 0: 'No' });
    }
}
export default BooleanField;
