import NumberField from './NumberField';

class MoneyField extends NumberField {
  currency (locale: string, currency: string): this {
    const formatter: Intl.NumberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: currency });
    const suffix: string = formatter.format(0).replace(/[0,.]+/gm, '').trim();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.renderInTable((value, item) => formatter.format(value));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.renderShow((value, item) => formatter.format(value));
    return this.addProp('suffix', suffix);
  }
}

export default MoneyField;
