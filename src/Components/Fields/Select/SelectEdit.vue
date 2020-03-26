<template>
  <div>
    <v-select :name="field.getColumn()" :options="opts" :return-object="false" :value-key="valueKey"
              :text-key="textKey" :value="value" @input="input"/>
  </div>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  // @ts-ignore
  import VSelect from '../../VSelect.vue';
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';
  import { BaseSelect } from './index';

  @Component({
    components: { VSelect }
  })
  export default class SelectEdit extends mixins(BaseSelect, EditMixin) {
  }

</script>
