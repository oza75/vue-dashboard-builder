import { Components } from '../type';
import RadioField from './RadioField';

class BooleanField extends RadioField {
  protected _sortable: boolean = false;

  constructor (column: string, title?: string) {
    super(column, title);
    this.components.index = 'dashboard-table-show-boolean-field';
    this.components.show = 'dashboard-show-boolean-field';
    this.options({ 1: 'Yes', 0: 'No' });
  }
}

export default BooleanField;
