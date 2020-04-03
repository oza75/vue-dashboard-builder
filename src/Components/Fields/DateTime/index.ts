import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop } from 'vue-property-decorator';
// @ts-ignore
import Datepicker from 'vuejs-datepicker';

@Component({
  template: `
    <div>
      <datepicker :language="language" :format="format" :value="value" @input="changed"
                  input-class="transition outline-none border bg-white border-b-2  rounded  py-2 px-4 block w-full xl:w-2/3 leading-normal"/>
    </div>
  `,
  components: { Datepicker }
})
export class DateEdit extends mixins(EditMixin) {
  @Prop({ default: 'dd MMMM yyyy' }) format!: string;
  @Prop({ default: false }) sendUsingTimestamps!: boolean;

  get language () {
    return require('vuejs-datepicker/dist/locale/translations/fr.js');
  }

  changed (value: any) {
    let formatted = value instanceof Date ? value.toString() : value;
    if (this.sendUsingTimestamps) {
      formatted = new Date(value).getTime();
    }

    this.input(formatted);
  }
}

@Component({
  template: `
    <div v-html="renderValue"></div>
  `
})
export class DateShow extends mixins(ShowMixin) {
  now: Date = new Date();
  interval: any = null;
  @Prop({ required: true }) item!: any;
  @Prop({ required: true }) field!: any;
  @Prop({ default: false }) humanReadable!: boolean;
  @Prop({ default: false }) fromNow!: boolean;
  @Prop({ default: null }) format!: string;
  $admin: any;

  get value (): string {
    return this.item[this.field.getColumn()];
  }

  get parsed (): string {
    if (this.format) {
      return this.$admin.moment(this.value).format(this.format);
    }
    if (this.humanReadable) {
      return this.$admin.moment(this.value).calendar();
    }
    if (this.fromNow) {
      this.$admin.moment(this.value).from(this.now);
    }
    return this.value;
  }

  get renderValue (): string {
    return this.field.view('render_show', this.parsed, this.item);
  }

  mounted () {
    if (this.fromNow) {
      this.interval = setInterval(() => {
        this.now = new Date();
      }, 1000);
    }
  }

  destroyed () {
    clearInterval(this.interval);
  }
}

@Component({
  template: `
    <div v-html="renderValue"></div>
  `
})
export class DateTableShow extends mixins(TableShowMixin) {
  now: Date = new Date();
  interval: any = null;
  @Prop({ required: true }) item!: any;
  @Prop({ required: true }) field!: any;
  @Prop({ default: false }) humanReadable!: boolean;
  @Prop({ default: false }) fromNow!: boolean;
  @Prop({ default: null }) format!: string;

  get value (): string {
    return this.item[this.field.getColumn()];
  }

  get parsed (): string {
    if (this.format) {
      return this.$admin.dayjs(this.value).format(this.format);
    }
    if (this.humanReadable) {
      return this.$admin.dayjs().calendar(this.$admin.dayjs(this.value));
    }
    if (this.fromNow) {
      this.$admin.dayjs(this.value).from(this.now);
    }
    return this.value;
  }

  get renderValue (): string {
    return this.field.view('render_in_table', this.parsed, this.item);
  }

  mounted () {
    if (this.fromNow) {
      this.interval = setInterval(() => {
        this.now = new Date();
      }, 1000);
    }
  }

  destroyed () {
    clearInterval(this.interval);
  }
}
