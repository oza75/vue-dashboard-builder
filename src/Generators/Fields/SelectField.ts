import Field from '../Field';
import { Components } from '../type';

class SelectField extends Field {
  public components: Components = {
    edit: 'dashboard-edit-select-field',
    index: 'dashboard-table-show-select-field',
    show: 'dashboard-show-select-field'
  };

  public options (options: Array<any>) {
    return this.addProp('options', options);
  }

  public displayUsingLabel () {
    return this.addProp('displayUsingLabel', true);
  }

  public optionsFrom (url: string, resolver?: (response: any) => any): this {
    this.addProp('optionsFrom', url);
    const defaultResolver: (response: any) => any = response => response.data;
    return this.addProp('optionsResolver', resolver || defaultResolver);
  }

  public valueKey (key: string): this {
    return this.addProp('valueKey', key);
  }

  public textKey (key: string): this {
    return this.addProp('textKey', key);
  }
}

export default SelectField;
