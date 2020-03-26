import { Vue } from 'vue-property-decorator';
export declare class EditMixin extends Vue {
    formData: any;
    field: any;
    originals: any;
    errors: any;
    get value(): any;
    get renderValue(): any;
    get editable(): boolean;
    get rules(): Array<any>;
    get inputElement(): HTMLElement | undefined;
    input(value: any): void;
}
export declare class ShowMixin extends Vue {
    item: any;
    field: any;
    get value(): string;
    get renderValue(): string;
}
export declare class TableShowMixin extends Vue {
    item: any;
    field: any;
    get value(): string;
    get renderValue(): string;
}
