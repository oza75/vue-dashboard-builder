import { AltFunction, DetachKeyResolver } from '../type';
import FileField from './FileField';

class ImageField extends FileField {
  protected _sortable: boolean = false;
  protected _detachKey?: DetachKeyResolver;

  constructor (column: string, title?: string) {
    super(column, title);
    this.components.index = 'dashboard-table-show-image-field';
    this.components.show = 'dashboard-show-image-field';
    this.components.edit = 'dashboard-edit-image-field';
  }

  lazy (): this {
    return this.addProp('lazy', true);
  }

  alt (alt: string | AltFunction): this {
    return this.addProp('alt', alt);
  }

  circle (): this {
    return this.addProp('circle', true);
  }

  classes (classes: string): this {
    return this.addProp('classes', classes);
  }

  detachKey (resolver: DetachKeyResolver): this {
    this._detachKey = resolver;
    return this;
  }

  detachKeyResolver (): DetachKeyResolver | undefined {
    return this._detachKey;
  }

  multiple () {
    return this.addProp('multiple', true);
  }

  valueKey (key: string) {
    return this.addProp('valueKey', key);
  }

  srcKey (key: string) {
    return this.addProp('srcKey', key);
  }
}

export default ImageField;
