import TextField from './TextField';

class NumberField extends TextField {
  constructor (column: string, title?: string) {
    super(column, title);
    this.addProp('type', 'number');
  }

  min (min: number): this {
    return this.addProp('min', min);
  }

  max (max: number): this {
    return this.addProp('max', max);
  }

  step (step: number): this {
    return this.addProp('step', step);
  }
}

export default NumberField;
