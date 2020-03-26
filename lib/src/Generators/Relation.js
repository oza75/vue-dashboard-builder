class Relation {
    constructor(parent, entity, column, foreignKey, relatedKey) {
        this.singleValue = false;
        this.relation = true;
        this.parent = parent;
        this.entity = entity;
        this.column = column;
        this.foreignKey = foreignKey;
        this.relatedKey = relatedKey;
    }
    hasSingleValue() {
        return this.singleValue;
    }
    getRelatedKey() {
        return this.relatedKey || this.entity.name;
    }
    getForeignKey() {
        return this.foreignKey;
    }
    toPosition(position) {
        this.position = position;
        return this;
    }
    getPosition() {
        return this.position;
    }
    getColumn() {
        return this.column;
    }
}
export default Relation;
