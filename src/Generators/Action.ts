import Entity from "./Entity";

abstract class Action {
  title: string | null;
  description?: string;
  context: any = {};
  protected name: string | null = null;

  constructor (title?: string) {
    this.title = title || null;
    if (!this.name) {
      this.name = this.constructor.name.replace('Action', '')
    }
    if (!this.title) {
      this.title = this.constructor.name.replace('Action', '')
    }
  }

  setContext (context: any) {
    this.context = context;
  }

  public abstract run (items: Array<any>, entity: Entity): Promise<any>;
}

export default Action;
