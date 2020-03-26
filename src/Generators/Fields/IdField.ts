import NumberField from './NumberField';

class IdField extends NumberField {
  constructor (column: string, title?: string) {
    super(column, title);
    this.hideInEdit();
  }
}

export default IdField;
