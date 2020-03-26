<template>
  <span v-html="renderValue"/>
</template>

<script lang="ts">
  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { TableShowMixin } from '../Mixins';

  @Component
  export default class TextTableShow extends mixins(TableShowMixin) {
  }

</script>
