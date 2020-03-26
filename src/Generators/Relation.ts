import Entity from "./Entity";

abstract class Relation {
  protected parent: Entity;
  protected entity: Entity;
  protected column: string;
  protected singleValue: boolean = false;
  public relation: boolean = true;
  protected relatedKey?: string;
  protected foreignKey?: string;
  protected position?: number;

  constructor (parent: Entity, entity: Entity, column: string, foreignKey?: string, relatedKey?: string) {
    this.parent = parent;
    this.entity = entity;
    this.column = column;
    this.foreignKey = foreignKey;
    this.relatedKey = relatedKey;
  }

  public hasSingleValue (): boolean {
    return this.singleValue;
  }

  public getRelatedKey (): string {
    return this.relatedKey || this.entity.name;
  }

  public getForeignKey (): string | undefined {
    return this.foreignKey;
  }

  public toPosition (position: number): this {
    this.position = position;
    return this;
  }

  public getPosition (): number | undefined {
    return this.position;
  }

  public getColumn (): string {
    return this.column;
  }
}

export default Relation;

