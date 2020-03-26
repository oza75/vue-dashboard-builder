import { Vue } from 'vue-property-decorator';
import { Route } from 'vue-router';
declare class Editable extends Vue {
    entity: any;
    datum: any;
    formData: any;
    errors: any[];
    get hasErrors(): boolean;
    addError(component: any): void;
    removeError(component: any): void;
    get fields(): Array<any>;
    get allRelations(): Array<any>;
    get singleValueRelations(): Array<any>;
    get relations(): Array<any>;
    get allFields(): Array<any>;
    input(key: string, value: string): void;
    routeChanged(route: Route): void;
}
export default Editable;
