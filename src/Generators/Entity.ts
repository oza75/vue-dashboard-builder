import Field from "./Field";
import { ResponseResolver } from './type';
import Action from "./Action";
import HasOne from "./Relations/HasOne";
import HasMany from "./Relations/HasMany";
import Relation from "./Relation";

const pluralize = require('pluralize');

export default abstract class Entity {
  public title: string;
  public description?: string;
  public name: string;
  public icon?: string;
  // the default key of the entity is will be used
  // for example to display correct value of the entity
  // in hasMany relation
  public defaultKey?: string;
  // Shall we concat the base url to the query URL ?
  // useful when an entity fetch his data to another
  // api different to the api that the app use.
  protected concatBaseUrl: boolean = true;
  // the url that will be used to fetch data
  // for example : For a Product entity the queryUrl can take
  // '/products' value that mean when we will fetch products we will
  // concat baseUrl to '/products' to get the url
  // for example (https://test.dev/products)
  // Remember that is you disable concatBaseUrl you need to pass
  // the full url here (instead of '/products', it will be 'https://another-api.dev/products')
  protected queryUrl: string = '/';
  // Extra params will be added to all requests to the api
  protected extraParams: any = {};
  // the primaryKey of the entity will be used to fetch datum
  // if in your backend to fetch a product you need a `slug`, so
  // the primary key will be `slug`
  protected primaryKey?: string;
  // responseResolver will be used to correctly resolve ajax response
  private _responseResolver?: ResponseResolver;
  protected searchable: boolean = true;
  // the key that will contains the search value
  protected searchKey: string = 'search';
  // the columns you take into account during the search
  protected searchIn: Array<string> = [];
  private _relatedFields: Array<any> = [];
  // Method that will be used to make an ajax request
  // while edition
  protected updateMethod?: string;

  constructor (title?: string, name?: string, icon?: string) {
    this.title = title || this.getEntityName();
    this.name = name || pluralize.plural(this.getEntityName().toLowerCase());
    this.icon = icon;
  }

  public abstract actions (): Array<Action>;

  public abstract fields (): Array<Field>;

  public abstract relations (): Array<Relation>;


  private getEntityName (): string {
    let name: string = this.constructor.name;
    if (name.includes('Entity')) {
      return name.replace('Entity', '');
    }

    return name;
  }


  public buildIndexUrl (baseUrl: string, queries: any = {}): string {
    let url: string = this.concatBaseUrl ? baseUrl + this.queryUrl : this.queryUrl;
    return this.addQueriesToUrl(url, queries);
  }

  public buildShowUrl (baseUrl: string, id: string, queries: any = {}): string {
    let url: string = this.queryUrl + `/${id}`;
    if (this.concatBaseUrl) url = baseUrl + url;
    return this.addQueriesToUrl(url, queries);
  }

  public buildUpdateUrl (baseUrl: string, id: string, queries: any = {}): string {
    let url: string = this.queryUrl + `/${id}`;
    if (this.concatBaseUrl) url = baseUrl + url;
    return this.addQueriesToUrl(url, queries);
  }

  public buildCreateUrl (baseUrl: string) {
    return this.buildIndexUrl(baseUrl);
  }

  public buildDetachUrl (baseUrl: string) {
    return this.buildIndexUrl(baseUrl) + '/detach';
  }

  public buildAttachUrl (baseUrl: string) {
    return this.buildIndexUrl(baseUrl) + '/attach';
  }

  public buildDeleteUrl (baseUrl: string, id: string): string {
    return this.buildIndexUrl(baseUrl) + `/${id}`;
  }

  protected addQueriesToUrl (url: string, queries: any = {}): string {
    let params = new URLSearchParams({ ...this.extraParams, ...queries });
    if (params.toString().length) url += '?' + params;
    return url;
  }

  //@ts-ignore
  get responseResolver (): ResponseResolver | undefined {
    return this.resolveResponse();
  }

  //@ts-ignore
  get relatedFields (): Array<any> {
    return this._relatedFields;
  }

  public resolveResponse (): ResponseResolver | undefined {
    return undefined;
  }

  public getKey (): string | null {
    return this.primaryKey || (this.fields().length > 0 ? this.fields()[0].getColumn() : null)
  }

  public isSearchable (): boolean {
    return this.searchable;
  }

  public getSearchKey (): string {
    return this.searchKey;
  }

  public getSearchIn (): Array<any> | boolean {
    return this.searchIn;
  }

  public hasOne (entity: Entity, column: string, foreignKey?: string, relatedKey?: string): Relation {
    return new HasOne(this, entity, column, foreignKey, relatedKey);
  }

  public hasMany (entity: Entity, column: string, foreignKey?: string, relatedKey?: string): Relation {
    return new HasMany(this, entity, column, foreignKey, relatedKey);
  }

  public getUpdateMethod (defaultMethod?: string): string {
    return this.updateMethod || defaultMethod || 'PUT';
  }
}
