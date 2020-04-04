import Field from '../Field';
class DateField extends Field {
    constructor() {
        super(...arguments);
        this.components = {
            edit: 'dashboard-edit-date-field',
            show: 'dashboard-show-date-field',
            index: 'dashboard-table-show-date-field'
        };
    }
    format(format) {
        return this.addProp('format', format);
    }
    humanReadable() {
        return this.addProp('human-readable', true);
    }
    fromNow() {
        return this.addProp('from-now', true);
    }
}
export default DateField;
