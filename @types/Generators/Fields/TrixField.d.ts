import TextField from './TextField';
import { ResponseResolver } from '../type';
declare class TrixField extends TextField {
    private _responseResolver;
    constructor(column: string, title?: string);
    uploadUrl(url: string, concatBaseUrl?: boolean): this;
    fileKey(key: string): this;
    resolveResponse(): ResponseResolver | undefined;
    responseResolver(resolver: ResponseResolver): this;
}
export default TrixField;
