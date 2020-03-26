<template>
  <div v-html="renderValue"></div>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { TableShowMixin } from '../Mixins';
  import { BaseSelectViewable } from './index';

  @Component
  export default class SelectTableShow extends mixins(BaseSelectViewable, TableShowMixin) {
  }

</script>
