import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
declare const RadioEdit_base: import("vue-class-component/lib/declarations").VueClass<EditMixin>;
export declare class RadioEdit extends RadioEdit_base {
    options: any;
    get isLong(): boolean;
    isSelected(option: string): boolean;
}
declare const RadioShow_base: import("vue-class-component/lib/declarations").VueClass<ShowMixin>;
export declare class RadioShow extends RadioShow_base {
}
declare const RadioTableShow_base: import("vue-class-component/lib/declarations").VueClass<TableShowMixin>;
export declare class RadioTableShow extends RadioTableShow_base {
}
export {};
