import TextField from './TextField';
class TrixField extends TextField {
    constructor(column, title) {
        super(column, title);
        this._responseResolver = undefined;
        this.components.edit = 'dashboard-edit-trix-field';
    }
    uploadUrl(url, concatBaseUrl = true) {
        this.addProp('uploadUrl', url);
        return this.addProp('concatBaseUrl', concatBaseUrl);
    }
    fileKey(key) {
        return this.addProp('fileKey', key);
    }
    resolveResponse() {
        return this._responseResolver;
    }
    responseResolver(resolver) {
        this._responseResolver = resolver;
        return this;
    }
}
export default TrixField;
