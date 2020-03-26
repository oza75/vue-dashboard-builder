import TextField from './TextField';
import { ResponseResolver } from '../type';

class TrixField extends TextField {
  private _responseResolver: undefined | ResponseResolver = undefined;

  constructor (column: string, title?: string) {
    super(column, title);
    this.components.edit = 'dashboard-edit-trix-field';
  }

  uploadUrl (url: string, concatBaseUrl: boolean = true): this {
    this.addProp('uploadUrl', url);
    return this.addProp('concatBaseUrl', concatBaseUrl);
  }

  fileKey (key: string): this {
    return this.addProp('fileKey', key);
  }

  public resolveResponse (): ResponseResolver | undefined {
    return this._responseResolver;
  }

  public responseResolver (resolver: ResponseResolver): this {
    this._responseResolver = resolver;
    return this;
  }
}

export default TrixField;
