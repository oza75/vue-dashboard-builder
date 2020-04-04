import NumberField from './NumberField';
class IdField extends NumberField {
    constructor(column, title) {
        super(column, title);
        this.hideInEdit();
    }
}
export default IdField;
