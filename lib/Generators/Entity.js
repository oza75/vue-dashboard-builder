import HasOne from "./Relations/HasOne";
import HasMany from "./Relations/HasMany";
const pluralize = require('pluralize');
export default class Entity {
    constructor(title, name, icon) {
        // Shall we concat the base url to the query URL ?
        // useful when an entity fetch his data to another
        // api different to the api that the app use.
        this.concatBaseUrl = true;
        // the url that will be used to fetch data
        // for example : For a Product entity the queryUrl can take
        // '/products' value that mean when we will fetch products we will
        // concat baseUrl to '/products' to get the url
        // for example (https://test.dev/products)
        // Remember that is you disable concatBaseUrl you need to pass
        // the full url here (instead of '/products', it will be 'https://another-api.dev/products')
        this.queryUrl = '/';
        // Extra params will be added to all requests to the api
        this.extraParams = {};
        this.searchable = true;
        // the key that will contains the search value
        this.searchKey = 'search';
        // the columns you take into account during the search
        this.searchIn = [];
        this._relatedFields = [];
        this.title = title || this.getEntityName();
        this.name = name || pluralize.plural(this.getEntityName().toLowerCase());
        this.icon = icon;
    }
    getEntityName() {
        let name = this.constructor.name;
        if (name.includes('Entity')) {
            return name.replace('Entity', '');
        }
        return name;
    }
    buildIndexUrl(baseUrl, queries = {}) {
        let url = this.concatBaseUrl ? baseUrl + this.queryUrl : this.queryUrl;
        return this.addQueriesToUrl(url, queries);
    }
    buildShowUrl(baseUrl, id, queries = {}) {
        let url = this.queryUrl + `/${id}`;
        if (this.concatBaseUrl)
            url = baseUrl + url;
        return this.addQueriesToUrl(url, queries);
    }
    buildUpdateUrl(baseUrl, id, queries = {}) {
        let url = this.queryUrl + `/${id}`;
        if (this.concatBaseUrl)
            url = baseUrl + url;
        return this.addQueriesToUrl(url, queries);
    }
    buildCreateUrl(baseUrl) {
        return this.buildIndexUrl(baseUrl);
    }
    buildDetachUrl(baseUrl) {
        return this.buildIndexUrl(baseUrl) + '/detach';
    }
    buildAttachUrl(baseUrl) {
        return this.buildIndexUrl(baseUrl) + '/attach';
    }
    buildDeleteUrl(baseUrl, id) {
        return this.buildIndexUrl(baseUrl) + `/${id}`;
    }
    addQueriesToUrl(url, queries = {}) {
        let params = new URLSearchParams({ ...this.extraParams, ...queries });
        if (params.toString().length)
            url += '?' + params;
        return url;
    }
    //@ts-ignore
    get responseResolver() {
        return this.resolveResponse();
    }
    //@ts-ignore
    get relatedFields() {
        return this._relatedFields;
    }
    resolveResponse() {
        return undefined;
    }
    getKey() {
        return this.primaryKey || (this.fields().length > 0 ? this.fields()[0].getColumn() : null);
    }
    isSearchable() {
        return this.searchable;
    }
    getSearchKey() {
        return this.searchKey;
    }
    getSearchIn() {
        return this.searchIn;
    }
    hasOne(entity, column, foreignKey, relatedKey) {
        return new HasOne(this, entity, column, foreignKey, relatedKey);
    }
    hasMany(entity, column, foreignKey, relatedKey) {
        return new HasMany(this, entity, column, foreignKey, relatedKey);
    }
    getUpdateMethod(defaultMethod) {
        return this.updateMethod || defaultMethod || 'PUT';
    }
}
