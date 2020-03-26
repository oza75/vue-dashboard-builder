import Field from '../src/Generators/Field';
import { Components } from '../src/Generators/type';

class FakeField extends Field {
  public components: Components = {
    edit: 'dashboard-edit-fake-field',
    show: 'dashboard-show-fake-field',
    index: 'dashboard-index-fake-field'
  }
}

export default FakeField;
