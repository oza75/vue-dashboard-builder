import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component } from 'vue-property-decorator';

@Component({
  template: `<div></div>`
})
export class BooleanEdit extends mixins(EditMixin) {
}

@Component({
  template: `
    <div>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.valid)" v-if="value" class="text-green-600"/>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.nonValid)" v-else class="text-red-600"/>
    </div>
  `
})
export class BooleanShow extends mixins(ShowMixin) {
}

@Component({
  template: `
    <div>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.valid)" v-if="value" class="text-green-600"/>
      <span v-html="$admin.config.resolveIcon($admin.config.icons.nonValid)" v-else class="text-red-600"/>
    </div>
  `
})
export class BooleanTableShow extends mixins(TableShowMixin) {
}
