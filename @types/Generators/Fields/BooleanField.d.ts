import RadioField from './RadioField';
declare class BooleanField extends RadioField {
    protected _sortable: boolean;
    constructor(column: string, title?: string);
}
export default BooleanField;
