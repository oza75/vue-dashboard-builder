export interface Components {
    edit: string;
    show: string;
    index: string;
}

export interface RenderFunction {
    (value: any, item?: any): string | any;
}

export interface RenderFunctions {
    render_in_table: RenderFunction[];
    render_show: RenderFunction[];
    render_edit: RenderFunction[];

    [key: string]: RenderFunction[];
}

export interface ResponseResolver {
    data: (res: any) => any;
    meta: (res: any) => any;
}

export interface AltFunction {
    (value: string, item: any): string;
}
export interface DetachKeyResolver {
  (value: any): string;
}
