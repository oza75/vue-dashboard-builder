import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin } from '../Mixins';
import { Component, Prop } from 'vue-property-decorator';

@Component({
  template: `
    <div>
      <input type="file" :value="value" @input="input($event.target.value)" :multiple="multiple">
    </div>`
})
export class FileEdit extends mixins(EditMixin) {
  @Prop({ default: false }) multiple!: boolean;
}

@Component({
  template: `
    <div></div>`
})
export class FileShow extends mixins(ShowMixin) {}
