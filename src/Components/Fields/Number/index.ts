import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component } from 'vue-property-decorator';

@Component({
  template: `
    <div></div>
  `
})
export class NumberEdit extends mixins(EditMixin) {
}

@Component({
  template: `
    <div></div>
  `
})
export class NumberShow extends mixins(ShowMixin) {
}

@Component({
  template: `
    <div></div>
  `
})
export class NumberTableShow extends mixins(TableShowMixin) {
}
