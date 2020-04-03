<template>
  <div>
    <label class="font-bold inline-block text-gray-700" :for="id || label"
           :class="{'mb-2 mt-2 ': label}" v-if="label">{{label}}</label>
    <input step="any" :min="min" :type="type" :id="id || label" :value="value" :name="id || label" @input="input"
           :placeholder="placeholder"
           :class="{'transition focus:outline-0 border border-transparent focus:bg-white focus:border-gray-300 placeholder-gray-900 rounded-lg bg-gray-200 py-2 pr-4 pl-4 block w-full appearance-none leading-normal ds-input': type !== 'color'}">
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop } from 'vue-property-decorator';

  @Component
  export default class VInput extends Vue {
    name: string = 'VInput';
    @Prop({ required: false }) label !: string;
    @Prop({ default: null }) value !: any;
    @Prop({ default: null }) id!: string;
    @Prop({ default: 'text' }) type!: string;
    @Prop({ default: '' }) placeholder!: string;
    @Prop({ default: null }) min!: number;

    input (e: any) {
      this.$emit('input', e.target.value);
    }
  }
</script>
