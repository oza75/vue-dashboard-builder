<template>
  <div v-html="renderValue"></div>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { ShowMixin } from '../Mixins';

  @Component
  export default class RadioShow extends mixins(ShowMixin) {
  }
</script>
