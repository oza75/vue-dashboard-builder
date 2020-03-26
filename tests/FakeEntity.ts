import {Entity, Action, Field, Relation} from '../src/index';
import FakeField from './FakeField';

class FakeEntity extends Entity {
  protected queryUrl: string = '/fake-url';

  actions (): Array<Action> {
    return [];
  }

  fields (): Array<Field> {
    return [
      new FakeField('test')
    ];
  }

  relations (): Array<Relation> {
    return [];
  }

  setPrimaryKey (key: string): this {
    this.primaryKey = key;
    return this;
  }
  disableSearchable(): this {
    this.searchable = false;
    return this;
  }
}

export default FakeEntity;
