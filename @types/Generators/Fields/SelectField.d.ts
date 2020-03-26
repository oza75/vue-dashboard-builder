import Field from '../Field';
import { Components } from '../type';
declare class SelectField extends Field {
    components: Components;
    options(options: Array<any>): this;
    displayUsingLabel(): this;
    optionsFrom(url: string, resolver?: (response: any) => any): this;
    valueKey(key: string): this;
    textKey(key: string): this;
}
export default SelectField;
