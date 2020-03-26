<template>
  <div></div>
</template>

<script lang="ts">

  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { ShowMixin } from '../Mixins';

  @Component
  export default class FileShow extends mixins(ShowMixin) {
  }
</script>

<style scoped>

</style>
