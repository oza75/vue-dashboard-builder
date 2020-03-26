import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component } from 'vue-property-decorator';
let BooleanEdit = class BooleanEdit extends mixins(EditMixin) {
};
BooleanEdit = __decorate([
    Component({
        template: `<div></div>`
    })
], BooleanEdit);
export { BooleanEdit };
let BooleanShow = class BooleanShow extends mixins(ShowMixin) {
};
BooleanShow = __decorate([
    Component({
        template: `
    <div>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.valid)" v-if="value" class="text-green-600"/>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.nonValid)" v-else class="text-red-600"/>
    </div>
  `
    })
], BooleanShow);
export { BooleanShow };
let BooleanTableShow = class BooleanTableShow extends mixins(TableShowMixin) {
};
BooleanTableShow = __decorate([
    Component({
        template: `
    <div>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.valid)" v-if="value" class="text-green-600"/>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.nonValid)" v-else class="text-red-600"/>
    </div>
  `
    })
], BooleanTableShow);
export { BooleanTableShow };
