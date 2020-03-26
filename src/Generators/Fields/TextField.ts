import Field from '../Field';
import { Components } from '../type';

class TextField extends Field {
  public components: Components = {
    edit: 'dashboard-edit-text-field',
    show: 'dashboard-show-text-field',
    index: 'dashboard-table-show-text-field'
  }
}

export default TextField;
