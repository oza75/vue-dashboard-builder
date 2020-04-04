import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Vue } from 'vue-property-decorator';
export declare class BaseSelect extends Vue {
    opts: Array<any>;
    options: any;
    valueKey: string;
    textKey: string;
    optionsFrom: string | null;
    optionsResolver: Function | null;
    fetchOptions(url: string, resolver: Function | null): void;
    created(): void;
}
declare const BaseSelectViewable_base: import("vue-class-component/lib/declarations").VueClass<BaseSelect>;
export declare class BaseSelectViewable extends BaseSelectViewable_base {
    displayUsingLabel: boolean;
    get renderValue(): any;
    getLabel(option: any): any;
}
declare const SelectEdit_base: import("vue-class-component/lib/declarations").VueClass<BaseSelect & EditMixin>;
export declare class SelectEdit extends SelectEdit_base {
}
declare const SelectShow_base: import("vue-class-component/lib/declarations").VueClass<BaseSelectViewable & ShowMixin>;
export declare class SelectShow extends SelectShow_base {
}
declare const SelectTableShow_base: import("vue-class-component/lib/declarations").VueClass<BaseSelectViewable & TableShowMixin>;
export declare class SelectTableShow extends SelectTableShow_base {
}
export {};
