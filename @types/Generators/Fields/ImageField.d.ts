import { AltFunction, DetachKeyResolver } from '../type';
import FileField from './FileField';
declare class ImageField extends FileField {
    protected _sortable: boolean;
    protected _detachKey?: DetachKeyResolver;
    constructor(column: string, title?: string);
    lazy(): this;
    alt(alt: string | AltFunction): this;
    circle(): this;
    classes(classes: string): this;
    detachKey(resolver: DetachKeyResolver): this;
    detachKeyResolver(): DetachKeyResolver | undefined;
    multiple(): this;
    valueKey(key: string): this;
    srcKey(key: string): this;
}
export default ImageField;
