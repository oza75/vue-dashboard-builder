import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component } from 'vue-property-decorator';
let NumberEdit = class NumberEdit extends mixins(EditMixin) {
};
NumberEdit = __decorate([
    Component({
        template: `
    <div></div>
  `
    })
], NumberEdit);
export { NumberEdit };
let NumberShow = class NumberShow extends mixins(ShowMixin) {
};
NumberShow = __decorate([
    Component({
        template: `
    <div></div>
  `
    })
], NumberShow);
export { NumberShow };
let NumberTableShow = class NumberTableShow extends mixins(TableShowMixin) {
};
NumberTableShow = __decorate([
    Component({
        template: `
    <div></div>
  `
    })
], NumberTableShow);
export { NumberTableShow };
