import NumberField from './NumberField';

class MoneyField extends NumberField {
  currency (locale: string, currency: string): this {
    let formatter: Intl.NumberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: currency });
    let suffix: string = formatter.format(0).replace(/[0,.]+/gm, '').trim();
    this.renderInTable((value, item) => formatter.format(value));
    this.renderShow((value, item) => formatter.format(value));
    return this.addProp('suffix', suffix);
  }
}

export default MoneyField;
