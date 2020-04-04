import Field from '../Field';
class FileField extends Field {
    constructor() {
        super(...arguments);
        this.components = {
            edit: 'dashboard-edit-file-field',
            show: 'dashboard-show-file-field',
            index: 'dashboard-table-show-file-field'
        };
    }
}
export default FileField;
