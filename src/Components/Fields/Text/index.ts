import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop, Watch } from 'vue-property-decorator';

@Component({
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
export class TextEdit extends mixins(EditMixin) {
  @Prop({ default: 'text' }) type!: string;
  @Prop({ default: null }) suffix!: string;
}

@Component({
  template: `
    <div>
      <div v-if="isOpened" class="mb-2" v-html="renderValue"></div>
      <a href="#" class="text-blue-600 font-bold" v-if="isLongText" @click.prevent="isOpened =!isOpened">{{!isOpened ?
        $admin.translate('show_content') : $admin.translate('hide_content')}}</a>
    </div>
  `
})
export class TextShow extends mixins(ShowMixin) {
  isOpened: boolean = false;

  get isLongText (): boolean {
    let str: string = this.$admin.helpers.stripHtml(this.value);
    return str.length > 200;
  }

  @Watch('value', { immediate: true })
  onItemChanged (item: string) {
    if (this.isLongText) this.isOpened = false;
    else this.isOpened = true;
  }
}

@Component({
  template: `
    <span v-html="renderValue"/>
  `
})
export class TextTableShow extends mixins(TableShowMixin) {
}
