import TextField from './TextField';
class NumberField extends TextField {
    constructor(column, title) {
        super(column, title);
        this.addProp('type', 'number');
    }
    min(min) {
        return this.addProp('min', min);
    }
    max(max) {
        return this.addProp('max', max);
    }
    step(step) {
        return this.addProp('step', step);
    }
}
export default NumberField;
