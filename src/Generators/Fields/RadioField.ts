import Field from '../Field';
import { Components } from '../type';

class RadioField extends Field {
  public components: Components = {
    edit: 'dashboard-edit-radio-field',
    show: 'dashboard-show-radio-field',
    index: 'dashboard-table-show-radio-field'
  };

  options (options: any) {
    this.addProp('options', options);
    this.components.edit = 'dashboard-edit-radio-field';
  }
}

export default RadioField;
