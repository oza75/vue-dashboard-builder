import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
declare const ImageEdit_base: import("vue-class-component/lib/declarations").VueClass<EditMixin>;
export declare class ImageEdit extends ImageEdit_base {
    base64Urls: Array<any>;
    detached: Array<any>;
    attached: Array<File>;
    images: Array<any>;
    defaultValue: any;
    multiple: boolean;
    alt: string | Function;
    valueKey: string;
    srcKey: string;
    get canAdd(): boolean;
    upload(files: FileList): void;
    remove(index: number, item: string, base64Url?: boolean): void;
    onRemoved(detached: Array<any>): void;
    onFileAdded(files: File[]): void;
    get imageKey(): string;
    src(item: any): any;
    mounted(): void;
}
declare const ImageShow_base: import("vue-class-component/lib/declarations").VueClass<ShowMixin>;
export declare class ImageShow extends ImageShow_base {
    selectedIndex: number;
    circle: boolean;
    lazy: boolean;
    classes: string;
    alt: any;
    multiple: boolean;
    srcKey: string;
    valueKey: string;
    get altValue(): string;
    get selected(): string | null;
    select(index: number): void;
    close(): void;
    mounted(): void;
}
declare const ImageTableShow_base: import("vue-class-component/lib/declarations").VueClass<TableShowMixin>;
export declare class ImageTableShow extends ImageTableShow_base {
    circle: boolean;
    lazy: boolean;
    classes: string;
    alt: any;
    multiple: boolean;
    srcKey: string;
    valueKey: string;
    src(item: any): any;
    get images(): string[];
    get altValue(): string;
}
export {};
