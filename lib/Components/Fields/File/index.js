import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin } from '../Mixins';
import { Component, Prop } from 'vue-property-decorator';
let FileEdit = class FileEdit extends mixins(EditMixin) {
};
__decorate([
    Prop({ default: false })
], FileEdit.prototype, "multiple", void 0);
FileEdit = __decorate([
    Component({
        template: `
    <div>
      <input type="file" :value="value" @input="input($event.target.value)" :multiple="multiple">
    </div>`
    })
], FileEdit);
export { FileEdit };
let FileShow = class FileShow extends mixins(ShowMixin) {
};
FileShow = __decorate([
    Component({
        template: `
    <div></div>`
    })
], FileShow);
export { FileShow };
