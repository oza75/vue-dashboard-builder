import Field from '../Field';
import { Components } from '../type';

class FileField extends Field {
  public components: Components = {
    edit: 'dashboard-edit-file-field',
    show: 'dashboard-show-file-field',
    index: 'dashboard-table-show-file-field'
  };
}

export default FileField;
