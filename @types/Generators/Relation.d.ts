import Entity from './Entity';
declare abstract class Relation {
    protected parent: Entity;
    protected entity: Entity;
    protected column: string;
    protected singleValue: boolean;
    relation: boolean;
    protected relatedKey?: string;
    protected foreignKey?: string;
    protected position?: number;
    constructor(parent: Entity, entity: Entity, column: string, foreignKey?: string, relatedKey?: string);
    hasSingleValue(): boolean;
    getRelatedKey(): string;
    getForeignKey(): string | undefined;
    toPosition(position: number): this;
    getPosition(): number | undefined;
    getColumn(): string;
}
export default Relation;
