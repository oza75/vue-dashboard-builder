import TextField from './TextField';
class TextareaField extends TextField {
    constructor(column, title) {
        super(column, title);
        this.components.edit = 'dashboard-edit-textarea-field';
    }
}
export default TextareaField;
