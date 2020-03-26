import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
declare const TextEdit_base: import("vue-class-component/lib/declarations").VueClass<EditMixin>;
export declare class TextEdit extends TextEdit_base {
    type: string;
    suffix: string;
}
declare const TextShow_base: import("vue-class-component/lib/declarations").VueClass<ShowMixin>;
export declare class TextShow extends TextShow_base {
    isOpened: boolean;
    get isLongText(): boolean;
    onItemChanged(item: string): void;
}
declare const TextTableShow_base: import("vue-class-component/lib/declarations").VueClass<TableShowMixin>;
export declare class TextTableShow extends TextTableShow_base {
}
export {};
