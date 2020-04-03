<template>
  <div v-html="renderValue"></div>
</template>

<script lang="ts">

  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { ShowMixin } from '../Mixins';
  import { BaseSelectViewable } from './index';

  @Component
  export default class SelectShow extends mixins(BaseSelectViewable, ShowMixin) {

  }
</script>
