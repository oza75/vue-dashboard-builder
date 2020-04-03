<template>
  <table class="w-full">
    <tbody>
    <tr v-for="(field, k) in fields" :key="entity.column + '-field-' + k" class="border-b">
      <td class="w-1/2 lg:w-1/4 xl:w-1/5 px-3 py-4 font-bold text-gray-700 first-letter-capitalize">
        <span v-if="isRelation(field)">{{$admin.helpers.singular(field.entity.title)}}</span>
        <span v-else>{{field.getTitle().toLowerCase()}}</span>
        <span v-if="isRequired(field)"><sup class="font-bold text-red-600 xl:text-xl">*</sup></span>
      </td>
      <td class="py-4">
        <div v-if="isRelation(field)">
          <has-one-component :entity="field.entity" :relation="field" @input="input" :parent="entity"/>
        </div>
        <component v-else :is="field.components.edit" @add-error="$emit('add-error', $event)"
                   @remove-error="$emit('remove-error', $event)" @input="input" :originals="originals"
                   :form-data="formData"
                   :field="field"
                   v-bind="field.getProps()"/>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import HasOneComponent from './HasOneComponent.vue';

  @Component({ components: { HasOneComponent } })
  export default class EditComponent extends Vue {
    name: string = 'Edit';
    @Prop({ required: true }) entity!: any;
    @Prop({ required: true }) fields!: Array<any>;
    @Prop({ default: () => ({}) }) originals!: any;
    @Prop({ default: () => ({}) }) formData!: any;

    input (key: string, value: any) {
      this.$emit('input', key, value);
    }

    isRelation (field: any) {
      return field.relation;
    }

    isRequired (field: any) {
      if (!field.getProps) {
        return false;
      }
      return field.getProps()['required'] || false;
    }
  }
</script>

<style scoped>

</style>
