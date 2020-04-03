<template>
  <div>
    <textarea :disabled="!editable" class="transition outline-none border bg-white border-b-2 rounded  py-2 px-4 block w-full xl:w-2/3 leading-normal"
              :name="field.getColumn()" :id="field.getColumn()" cols="30" rows="5" :value="value"
              @input="input($event.target.value)"/>
  </div>
</template>

<script lang="ts">
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';
  import { Prop } from 'vue-property-decorator';

  export default class EditTextarea extends mixins(EditMixin) {
    name: string = 'dashboard-edit-textarea-field';
    @Prop({ default: 10 }) rows!: number;
  }
</script>

<style scoped>

</style>
