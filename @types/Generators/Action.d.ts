import Entity from './Entity';
declare abstract class Action {
    title: string | null;
    description?: string;
    context: any;
    protected name: string | null;
    constructor(title?: string);
    setContext(context: any): void;
    abstract run(items: Array<any>, entity: Entity): Promise<any>;
}
export default Action;
