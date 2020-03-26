import Field from "./Field";
import { ResponseResolver } from './type';
import Action from "./Action";
import Relation from "./Relation";
export default abstract class Entity {
    title: string;
    description?: string;
    name: string;
    icon?: string;
    defaultKey?: string;
    protected concatBaseUrl: boolean;
    protected queryUrl: string;
    protected extraParams: any;
    protected primaryKey?: string;
    private _responseResolver?;
    protected searchable: boolean;
    protected searchKey: string;
    protected searchIn: Array<string>;
    private _relatedFields;
    protected updateMethod?: string;
    constructor(title?: string, name?: string, icon?: string);
    abstract actions(): Array<Action>;
    abstract fields(): Array<Field>;
    abstract relations(): Array<Relation>;
    private getEntityName;
    buildIndexUrl(baseUrl: string, queries?: any): string;
    buildShowUrl(baseUrl: string, id: string, queries?: any): string;
    buildUpdateUrl(baseUrl: string, id: string, queries?: any): string;
    buildCreateUrl(baseUrl: string): string;
    buildDetachUrl(baseUrl: string): string;
    buildAttachUrl(baseUrl: string): string;
    buildDeleteUrl(baseUrl: string, id: string): string;
    protected addQueriesToUrl(url: string, queries?: any): string;
    get responseResolver(): ResponseResolver | undefined;
    get relatedFields(): Array<any>;
    resolveResponse(): ResponseResolver | undefined;
    getKey(): string | null;
    isSearchable(): boolean;
    getSearchKey(): string;
    getSearchIn(): Array<any> | boolean;
    hasOne(entity: Entity, column: string, foreignKey?: string, relatedKey?: string): Relation;
    hasMany(entity: Entity, column: string, foreignKey?: string, relatedKey?: string): Relation;
    getUpdateMethod(defaultMethod?: string): string;
}