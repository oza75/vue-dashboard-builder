import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  template: `
    <div>
      <div class="flex" v-if="!isLong">
        <div v-for="(label, option) in options" @click="input(option)"
             :class="{'bg-indigo-600 text-white': isSelected(option)}"
             class="px-3 cursor-pointer hover:bg-indigo-600 transition hover:text-white block py-2 bg-gray-100 shadow border-r">
          <span>{{label}}</span>
        </div>
      </div>
      <div v-else>
        <label :for="field.getColumn() + '_value_'+option" v-for="(label, option) in options"
               class="mr-3 cursor-pointer"
               :key="option">
          <input type="radio" :name="field.getColumn()" :id="field.getColumn() + '_value_'+option" :value="option">
          <span class="font-bold">{{label}}</span>
        </label>
      </div>
    </div>
  `
})
export class RadioEdit extends mixins(EditMixin) {
  @Prop({ required: true }) options!: any;

  get isLong (): boolean {
    return this.options.length > 4;
  }

  isSelected (option: string) {
    // eslint-disable-next-line eqeqeq
    return this.value == option;
  }
}

@Component({
  template: `
    <div v-html="renderValue"></div>
  `
})
export class RadioShow extends mixins(ShowMixin) {
}

@Component({
  template: `
    <div v-html="renderValue"></div>
  `
})
export class RadioTableShow extends mixins(TableShowMixin) {
}
