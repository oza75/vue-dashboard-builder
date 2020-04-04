import Relation from '../Relation';
declare class HasOne extends Relation {
    protected singleValue: boolean;
    getRelatedKey(): string;
}
export default HasOne;
