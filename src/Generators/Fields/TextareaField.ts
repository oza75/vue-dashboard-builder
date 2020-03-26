import TextField from './TextField';

class TextareaField extends TextField {
  constructor (column: string, title?: string) {
    super(column, title);
    this.components.edit = 'dashboard-edit-textarea-field';
  }
}

export default TextareaField;
