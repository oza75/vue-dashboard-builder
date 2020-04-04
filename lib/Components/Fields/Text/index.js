import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop, Watch } from 'vue-property-decorator';
let TextEdit = class TextEdit extends mixins(EditMixin) {
};
__decorate([
    Prop({ default: 'text' })
], TextEdit.prototype, "type", void 0);
__decorate([
    Prop({ default: null })
], TextEdit.prototype, "suffix", void 0);
TextEdit = __decorate([
    Component({
        template: `
    <div>
      <div class="flex items-center">
        <input :type="type" :disabled="!editable" v-bind="$attrs"
               :title="!editable ? 'This field cannot be edited': ''"
               :class="{'rounded-r-0': suffix, 'rounded-r': !suffix, 'bg-gray-300 cursor-not-allowed ': !editable, 'bg-white': editable}"
               class="transition outline-none border border-b-2 rounded-l  py-2 px-4 block w-full xl:w-2/3 leading-normal"
               :value="value" @input="input($event.target.value)">
        <div class="bg-gray-200 px-3 py-2 rounded-r border-b-2 " v-if="suffix">{{suffix}}</div>
      </div>
      <div v-if="Object.keys(errors).length" class="mt-3">
        <p v-for="(value, k) in Object.values(errors)" class="text-red-600 font-bold ">
          {{value}}
        </p>
      </div>
    </div>
  `
    })
], TextEdit);
export { TextEdit };
let TextShow = class TextShow extends mixins(ShowMixin) {
    constructor() {
        super(...arguments);
        this.isOpened = false;
    }
    get isLongText() {
        const str = this.$admin.helpers.stripHtml(this.value);
        return str.length > 200;
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onItemChanged(item) {
        this.isOpened = !this.isLongText;
    }
};
__decorate([
    Watch('value', { immediate: true })
], TextShow.prototype, "onItemChanged", null);
TextShow = __decorate([
    Component({
        template: `
    <div>
      <div v-if="isOpened" class="mb-2" v-html="renderValue"></div>
      <a href="#" class="text-blue-600 font-bold" v-if="isLongText" @click.prevent="isOpened =!isOpened">{{!isOpened ?
        $admin.translate('show_content') : $admin.translate('hide_content')}}</a>
    </div>
  `
    })
], TextShow);
export { TextShow };
let TextTableShow = class TextTableShow extends mixins(TableShowMixin) {
};
TextTableShow = __decorate([
    Component({
        template: `
    <span v-html="renderValue"/>
  `
    })
], TextTableShow);
export { TextTableShow };
