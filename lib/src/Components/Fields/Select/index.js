import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop, Vue } from 'vue-property-decorator';
// @ts-ignore
import VSelect from '../../VSelect.vue';
let BaseSelect = class BaseSelect extends Vue {
    constructor() {
        super(...arguments);
        this.opts = [];
    }
    fetchOptions(url, resolver) {
        this.$admin.axios.get(url).then((res) => {
            this.opts = resolver ? resolver(res) : res;
        }).catch(this.$admin.handleError);
    }
    created() {
        if (this.optionsFrom) {
            this.fetchOptions(this.optionsFrom, this.optionsResolver);
        }
        else {
            this.opts = this.options;
        }
    }
};
__decorate([
    Prop({ default: () => ([]) })
], BaseSelect.prototype, "options", void 0);
__decorate([
    Prop({ default: null })
], BaseSelect.prototype, "valueKey", void 0);
__decorate([
    Prop({ default: null })
], BaseSelect.prototype, "textKey", void 0);
__decorate([
    Prop({ default: null })
], BaseSelect.prototype, "optionsFrom", void 0);
__decorate([
    Prop({ default: null })
], BaseSelect.prototype, "optionsResolver", void 0);
BaseSelect = __decorate([
    Component
], BaseSelect);
export { BaseSelect };
let BaseSelectViewable = class BaseSelectViewable extends mixins(BaseSelect) {
    get renderValue() {
        // @ts-ignore
        let value = this.value;
        if (this.displayUsingLabel) {
            // eslint-disable-next-line eqeqeq
            let result = this.opts.find((item) => {
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
    getLabel(option) {
        if (typeof option === 'object') {
            return option[this.textKey];
        }
        return option;
    }
};
__decorate([
    Prop({ default: false })
], BaseSelectViewable.prototype, "displayUsingLabel", void 0);
BaseSelectViewable = __decorate([
    Component
], BaseSelectViewable);
export { BaseSelectViewable };
let SelectEdit = class SelectEdit extends mixins(BaseSelect, EditMixin) {
};
SelectEdit = __decorate([
    Component({
        template: `
    <div>
      <v-select :name="field.getColumn()" :options="opts" :return-object="false" :value-key="valueKey"
                :text-key="textKey" :value="value" @input="input"/>
    </div>
  `,
        components: { VSelect }
    })
], SelectEdit);
export { SelectEdit };
let SelectShow = class SelectShow extends mixins(BaseSelectViewable, ShowMixin) {
};
SelectShow = __decorate([
    Component({
        template: `
    <div v-html="renderValue"></div>
  `
    })
], SelectShow);
export { SelectShow };
let SelectTableShow = class SelectTableShow extends mixins(BaseSelectViewable, TableShowMixin) {
};
SelectTableShow = __decorate([
    Component({
        template: `
    <div v-html="renderValue"></div>
  `
    })
], SelectTableShow);
export { SelectTableShow };
