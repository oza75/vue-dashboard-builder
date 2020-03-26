<template>
  <div v-html="renderValue"></div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { TableShowMixin } from '../Mixins';

  @Component
  export default class RadioTableShow extends mixins(TableShowMixin) {
  }
</script>
