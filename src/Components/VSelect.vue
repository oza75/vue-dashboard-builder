<template>
  <div class="inline-block relative">
    <label :for="name" v-if="label">{{label}}</label>
    <select :name="name" :id="name" @input="input"
            class="block appearance-none w-full bg-white focus:bg-white border-gray-400 shadow border px-4 py-2 pr-8 rounded  leading-tight focus:outline-none focus:shadow-outline">
      <option v-for="(option, k) in options" :value="getValue(option)" :key="k">{{getLabel(option)}}</option>
    </select>
    <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" class="fill-current h-4 w-4">
        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';

  @Component
  export default class VSelect extends Vue {
    @Prop({ required: true }) name!: string;
    @Prop({ required: false }) label!: string;
    @Prop({ required: true }) options!: Array<any>;
    @Prop({ default: 'value' }) valueKey!: string;
    @Prop({ default: 'text' }) textKey!: string;
    @Prop({ default: true }) returnObject!: boolean;
    @Prop({ default: null }) value!: any;

    input ($event: any) {
      let value: string = $event.target.value;
      let item: any = this.options.find(item => {
        if (typeof item === 'object') {
          // eslint-disable-next-line eqeqeq
          return item[this.valueKey] == value;
        }
        // eslint-disable-next-line eqeqeq
        return item == value;
      });
      this.$emit('input', this.returnObject ? item : this.getValue(item));
    }

    getValue (option: any) {
      if (typeof option === 'object') {
        return option[this.valueKey];
      }
      return option;
    }

    getLabel (option: any) {
      if (typeof option === 'object') {
        return option[this.textKey];
      }
      return option;
    }
  };
</script>

<style scoped>

</style>
