<template>
  <div>
    <div class="flex items-center">
      <input :type="type" :disabled="!editable" v-bind="$attrs"
             :title="!editable ? 'This field cannot be edited': ''"
             :class="{'rounded-r-0': suffix, 'rounded-r': !suffix, 'bg-gray-300 cursor-not-allowed ': !editable, 'bg-white': editable}"
             class="transition outline-none border border-b-2 rounded-l  py-2 px-4 block w-full xl:w-2/3 leading-normal"
             :value="value" @input="input($event.target.value)">
      <div class="bg-gray-200 px-3 py-2 rounded-r border-b-2 " v-if="suffix">{{suffix}}</div>
    </div>
    <div v-if="Object.keys(errors).length" class="mt-3">
      <p v-for="(value, k) in Object.values(errors)" :key="k" class="text-red-600 font-bold ">
        {{value}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';

  @Component
  export default class TextEdit extends mixins(EditMixin) {
    @Prop({ default: 'text' }) type!: string;
    @Prop({ default: null }) suffix!: string;
  }
</script>
