import { __decorate } from "tslib";
import { Vue, Component, Prop } from 'vue-property-decorator';
import { messageType } from '../../../utils';
import RuleMessages from '../../../RuleMessages';
let EditMixin = class EditMixin extends Vue {
    constructor() {
        super(...arguments);
        this.errors = {};
    }
    get value() {
        return this.formData[this.field.getColumn()];
    }
    get renderValue() {
        let value = this.value;
        value = this.field.view('render_edit', value, this.formData);
        if (typeof value !== 'string')
            return value;
        return this.$admin.helpers.stripHtml(value) || '';
    }
    get editable() {
        return this.field.editable();
    }
    get rules() {
        return this.field.getRules();
    }
    get inputElement() {
        return this.$refs['input'];
    }
    input(value) {
        this.$emit('input', this.field.getColumn(), value);
        this.errors = {};
        this.rules.forEach(item => {
            let rule = item[0];
            let params = item[1] || [];
            if (!rule(value, params, this.inputElement)) {
                let type = this.$props['type'];
                type = type ? (['number', 'tel'].includes(type) ? 'numeric' : messageType(value)) : messageType(value);
                this.errors[rule.name] = RuleMessages.getMessage(rule.name, params, type);
            }
        });
        if (Object.keys(this.errors).length > 0) {
            this.$emit('add-error', this);
        }
        else
            this.$emit('remove-error', this);
    }
};
__decorate([
    Prop({ required: true })
], EditMixin.prototype, "formData", void 0);
__decorate([
    Prop({ required: true })
], EditMixin.prototype, "field", void 0);
__decorate([
    Prop({ default: () => ({}) })
], EditMixin.prototype, "originals", void 0);
EditMixin = __decorate([
    Component
], EditMixin);
export { EditMixin };
let ShowMixin = class ShowMixin extends Vue {
    get value() {
        return this.item[this.field.getColumn()];
    }
    get renderValue() {
        return this.field.view('render_show', this.value, this.item);
    }
};
__decorate([
    Prop({ required: true })
], ShowMixin.prototype, "item", void 0);
__decorate([
    Prop({ required: true })
], ShowMixin.prototype, "field", void 0);
ShowMixin = __decorate([
    Component
], ShowMixin);
export { ShowMixin };
let TableShowMixin = class TableShowMixin extends Vue {
    get value() {
        return this.item[this.field.getColumn()];
    }
    get renderValue() {
        return this.field.view('render_in_table', this.value, this.item);
    }
};
__decorate([
    Prop({ required: true })
], TableShowMixin.prototype, "item", void 0);
__decorate([
    Prop({ required: true })
], TableShowMixin.prototype, "field", void 0);
TableShowMixin = __decorate([
    Component
], TableShowMixin);
export { TableShowMixin };
