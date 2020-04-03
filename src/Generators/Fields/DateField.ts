import Field from '../Field';
import { Components } from '../type';

class DateField extends Field {
  public components: Components = {
    edit: 'dashboard-edit-date-field',
    show: 'dashboard-show-date-field',
    index: 'dashboard-table-show-date-field'
  };

  format (format: string): this {
    return this.addProp('format', format);
  }

  humanReadable (): this {
    return this.addProp('human-readable', true);
  }

  fromNow (): this {
    return this.addProp('from-now', true);
  }
}

export default DateField;
