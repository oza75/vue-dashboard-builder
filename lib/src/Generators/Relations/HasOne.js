import Relation from '../Relation';
const pluralize = require('pluralize');
class HasOne extends Relation {
    constructor() {
        super(...arguments);
        this.singleValue = true;
    }
    getRelatedKey() {
        return this.relatedKey || pluralize.singular(this.entity.name);
    }
}
export default HasOne;
