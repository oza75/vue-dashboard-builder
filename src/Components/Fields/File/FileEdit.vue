<template>
  <div>
    <input type="file" :value="value" @input="input($event.target.value)" :multiple="multiple">
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';

  @Component
  export default class FileEdit extends mixins(EditMixin) {
    @Prop({ default: false }) multiple!: boolean;
  }
</script>
