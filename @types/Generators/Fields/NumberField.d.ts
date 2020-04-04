import TextField from './TextField';
declare class NumberField extends TextField {
    constructor(column: string, title?: string);
    min(min: number): this;
    max(max: number): this;
    step(step: number): this;
}
export default NumberField;
