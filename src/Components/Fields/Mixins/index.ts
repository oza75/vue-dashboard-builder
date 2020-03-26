import { Vue, Component, Prop, Watch, Inject } from 'vue-property-decorator';
import { DASHBOARD_OBJECT, messageType } from '../../../utils';
import Form from '../../../Form';
import RuleMessages from '../../../RuleMessages';

@Component
export class EditMixin extends Vue {
  @Prop({ required: true }) formData!: any;
  @Prop({ required: true }) field!: any;
  @Prop({ default: () => ({}) }) originals!: any;
  errors: any = {};

  get value () {
    return this.formData[this.field.getColumn()];
  }

  get renderValue () {
    let value = this.value;
    value = this.field.view('render_edit', value, this.formData);
    if (typeof value !== 'string') return value;
    return this.$admin.helpers.stripHtml(value) || '';
  }

  get editable (): boolean {
    return this.field.editable();
  }

  get rules (): Array<any> {
    return this.field.getRules();
  }

  get inputElement (): HTMLElement | undefined {
    return this.$refs['input'] as HTMLElement | undefined;
  }

  input (value: any) {
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
    } else this.$emit('remove-error', this);
  }
}

@Component
export class ShowMixin extends Vue {
  @Prop({ required: true }) item!: any;
  @Prop({ required: true }) field!: any;

  get value (): string {
    return this.item[this.field.getColumn()];
  }

  get renderValue (): string {
    return this.field.view('render_show', this.value, this.item);
  }
}

@Component
export class TableShowMixin extends Vue {
  @Prop({ required: true }) item!: any;
  @Prop({ required: true }) field!: any;

  get value (): string {
    return this.item[this.field.getColumn()];
  }

  get renderValue (): string {
    return this.field.view('render_in_table', this.value, this.item);
  }
}
