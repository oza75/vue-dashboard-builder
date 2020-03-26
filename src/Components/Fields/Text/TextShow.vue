<template>
  <div>
    <div v-if="isOpened" class="mb-2" v-html="renderValue"></div>
    <a href="#" class="text-blue-600 font-bold" v-if="isLongText" @click.prevent="isOpened =!isOpened">{{!isOpened ?
      $admin.translate('show_content') : $admin.translate('hide_content')}}</a>
  </div>
</template>

<script lang="ts">
  import { Component, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { ShowMixin } from '../Mixins';

  @Component
  export default class TextShow extends mixins(ShowMixin) {
    isOpened: boolean = false;

    get isLongText (): boolean {
      let str: string = this.$admin.helpers.stripHtml(this.value);
      return str.length > 200;
    }

    @Watch('value', { immediate: true })
    onItemChanged (item: string) {
      this.isOpened = !this.isLongText;
    }
  }
</script>

<style scoped>

</style>
