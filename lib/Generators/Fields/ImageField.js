import FileField from './FileField';
class ImageField extends FileField {
    constructor(column, title) {
        super(column, title);
        this._sortable = false;
        this.components.index = 'dashboard-table-show-image-field';
        this.components.show = 'dashboard-show-image-field';
        this.components.edit = 'dashboard-edit-image-field';
    }
    lazy() {
        return this.addProp('lazy', true);
    }
    alt(alt) {
        return this.addProp('alt', alt);
    }
    circle() {
        return this.addProp('circle', true);
    }
    classes(classes) {
        return this.addProp('classes', classes);
    }
    detachKey(resolver) {
        this._detachKey = resolver;
        return this;
    }
    detachKeyResolver() {
        return this._detachKey;
    }
    multiple() {
        return this.addProp('multiple', true);
    }
    valueKey(key) {
        return this.addProp('valueKey', key);
    }
    srcKey(key) {
        return this.addProp('srcKey', key);
    }
}
export default ImageField;
