import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
declare const DateEdit_base: import("vue-class-component/lib/declarations").VueClass<EditMixin>;
export declare class DateEdit extends DateEdit_base {
    format: string;
    sendUsingTimestamps: boolean;
    get language(): any;
    changed(value: any): void;
}
declare const DateShow_base: import("vue-class-component/lib/declarations").VueClass<ShowMixin>;
export declare class DateShow extends DateShow_base {
    now: Date;
    interval: any;
    item: any;
    field: any;
    humanReadable: boolean;
    fromNow: boolean;
    format: string;
    $admin: any;
    get value(): string;
    get parsed(): string;
    get renderValue(): string;
    mounted(): void;
    destroyed(): void;
}
declare const DateTableShow_base: import("vue-class-component/lib/declarations").VueClass<TableShowMixin>;
export declare class DateTableShow extends DateTableShow_base {
    now: Date;
    interval: any;
    item: any;
    field: any;
    humanReadable: boolean;
    fromNow: boolean;
    format: string;
    get value(): string;
    get parsed(): string;
    get renderValue(): string;
    mounted(): void;
    destroyed(): void;
}
export {};
