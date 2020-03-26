import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop, Vue } from 'vue-property-decorator';
// @ts-ignore
import VSelect from '../../VSelect.vue';

@Component
export class BaseSelect extends Vue {
  opts: Array<any> = [];
  @Prop({ default: () => ([]) }) options!: any;
  @Prop({ default: null }) valueKey!: string;
  @Prop({ default: null }) textKey!: string;
  @Prop({ default: null }) optionsFrom!: string | null;
  @Prop({ default: null }) optionsResolver!: Function | null;

  fetchOptions (url: string, resolver: Function | null) {
    this.$admin.axios.get(url).then((res: any) => {
      this.opts = resolver ? resolver(res) : res;
    }).catch(this.$admin.handleError);
  }

  created () {
    if (this.optionsFrom) {
      this.fetchOptions(this.optionsFrom, this.optionsResolver);
    } else {
      this.opts = this.options;
    }
  }
}

@Component
export class BaseSelectViewable extends mixins<BaseSelect>(BaseSelect) {
  @Prop({ default: false }) displayUsingLabel!: boolean;
  get renderValue () {
    // @ts-ignore
    let value = this.value;
    if (this.displayUsingLabel) {
      // eslint-disable-next-line eqeqeq
      let result = this.opts.find((item: any) => {
        if (typeof item === 'object') {
          // eslint-disable-next-line eqeqeq
          return item[this.valueKey] == value;
        }
        // eslint-disable-next-line eqeqeq
        return item == value;
      });
      value = result ? this.getLabel(result) : value;
    }
    // @ts-ignore
    return this.field.view('render_show', value, this.item);
  }

  getLabel (option: any) {
    if (typeof option === 'object') {
      return option[this.textKey];
    }
    return option;
  }
}

@Component({
  template: `
    <div>
      <v-select :name="field.getColumn()" :options="opts" :return-object="false" :value-key="valueKey"
                :text-key="textKey" :value="value" @input="input"/>
    </div>
  `,
  components: { VSelect }
})
export class SelectEdit extends mixins(BaseSelect, EditMixin) {
}

@Component({
  template: `
    <div v-html="renderValue"></div>
  `
})
export class SelectShow extends mixins(BaseSelectViewable, ShowMixin) {

}

@Component({
  template: `
    <div v-html="renderValue"></div>
  `
})
export class SelectTableShow extends mixins(BaseSelectViewable, TableShowMixin) {
}
