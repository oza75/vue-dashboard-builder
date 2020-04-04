import Field from '../Field';
import { Components } from '../type';
declare class RadioField extends Field {
    components: Components;
    options(options: any): void;
}
export default RadioField;
