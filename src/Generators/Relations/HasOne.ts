import Relation from '../Relation';

const pluralize = require('pluralize');

class HasOne extends Relation {
  protected singleValue: boolean = true;

  public getRelatedKey (): string {
    return this.relatedKey || pluralize.singular(this.entity.name);
  }
}

export default HasOne;
