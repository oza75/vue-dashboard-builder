import NumberField from './NumberField';
declare class MoneyField extends NumberField {
    currency(locale: string, currency: string): this;
}
export default MoneyField;
