import Field from '../Field';
import { Components } from '../type';
declare class DateField extends Field {
    components: Components;
    format(format: string): this;
    humanReadable(): this;
    fromNow(): this;
}
export default DateField;
