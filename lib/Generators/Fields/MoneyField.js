import NumberField from './NumberField';
class MoneyField extends NumberField {
    currency(locale, currency) {
        let formatter = new Intl.NumberFormat(locale, { style: 'currency', currency: currency });
        let suffix = formatter.format(0).replace(/[0,.]+/gm, '').trim();
        this.renderInTable((value, item) => formatter.format(value));
        this.renderShow((value, item) => formatter.format(value));
        return this.addProp('suffix', suffix);
    }
}
export default MoneyField;
