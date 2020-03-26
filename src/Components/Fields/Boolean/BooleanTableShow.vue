<template>
  <div>
    <span v-html="$admin.config.resolveIcon($admin.config.icons.valid)" v-if="value" class="text-green-600"/>
    <span v-html="$admin.config.resolveIcon($admin.config.icons.nonValid)" v-else class="text-red-600"/>
  </div>
</template>

<script lang="ts">

  import { Component } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { TableShowMixin } from '../Mixins';

  @Component
  export default class BooleanTableShow extends mixins(TableShowMixin) {
  }

</script>
