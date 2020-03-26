import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop } from 'vue-property-decorator';
// @ts-ignore
import Datepicker from 'vuejs-datepicker';
let DateEdit = class DateEdit extends mixins(EditMixin) {
    get language() {
        return require('vuejs-datepicker/dist/locale/translations/fr.js');
    }
    changed(value) {
        let formatted = value instanceof Date ? value.toString() : value;
        if (this.sendUsingTimestamps) {
            formatted = new Date(value).getTime();
        }
        this.input(formatted);
    }
};
__decorate([
    Prop({ default: 'dd MMMM yyyy' })
], DateEdit.prototype, "format", void 0);
__decorate([
    Prop({ default: false })
], DateEdit.prototype, "sendUsingTimestamps", void 0);
DateEdit = __decorate([
    Component({
        template: `
    <div>
      <datepicker :language="language" :format="format" :value="value" @input="changed"
                  input-class="transition outline-none border bg-white border-b-2  rounded  py-2 px-4 block w-full xl:w-2/3 leading-normal"/>
    </div>
  `,
        components: { Datepicker }
    })
], DateEdit);
export { DateEdit };
let DateShow = class DateShow extends mixins(ShowMixin) {
    constructor() {
        super(...arguments);
        this.now = new Date();
        this.interval = null;
    }
    get value() {
        return this.item[this.field.getColumn()];
    }
    get parsed() {
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
    get renderValue() {
        return this.field.view('render_show', this.parsed, this.item);
    }
    mounted() {
        if (this.fromNow) {
            this.interval = setInterval(() => {
                this.now = new Date();
            }, 1000);
        }
    }
    destroyed() {
        clearInterval(this.interval);
    }
};
__decorate([
    Prop({ required: true })
], DateShow.prototype, "item", void 0);
__decorate([
    Prop({ required: true })
], DateShow.prototype, "field", void 0);
__decorate([
    Prop({ default: false })
], DateShow.prototype, "humanReadable", void 0);
__decorate([
    Prop({ default: false })
], DateShow.prototype, "fromNow", void 0);
__decorate([
    Prop({ default: null })
], DateShow.prototype, "format", void 0);
DateShow = __decorate([
    Component({
        template: `
    <div v-html="renderValue"></div>
  `
    })
], DateShow);
export { DateShow };
let DateTableShow = class DateTableShow extends mixins(TableShowMixin) {
    constructor() {
        super(...arguments);
        this.now = new Date();
        this.interval = null;
    }
    get value() {
        return this.item[this.field.getColumn()];
    }
    get parsed() {
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
    get renderValue() {
        return this.field.view('render_in_table', this.parsed, this.item);
    }
    mounted() {
        if (this.fromNow) {
            this.interval = setInterval(() => {
                this.now = new Date();
            }, 1000);
        }
    }
    destroyed() {
        clearInterval(this.interval);
    }
};
__decorate([
    Prop({ required: true })
], DateTableShow.prototype, "item", void 0);
__decorate([
    Prop({ required: true })
], DateTableShow.prototype, "field", void 0);
__decorate([
    Prop({ default: false })
], DateTableShow.prototype, "humanReadable", void 0);
__decorate([
    Prop({ default: false })
], DateTableShow.prototype, "fromNow", void 0);
__decorate([
    Prop({ default: null })
], DateTableShow.prototype, "format", void 0);
DateTableShow = __decorate([
    Component({
        template: `
    <div v-html="renderValue"></div>
  `
    })
], DateTableShow);
export { DateTableShow };
