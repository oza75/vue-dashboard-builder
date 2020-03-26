<template>
  <div>
    <img :src="src(image)" :loading="lazy" :alt="altValue" class="w-12" v-for="(image, k) in images" :key="'image-'+k"
         :class="{[classes]: true, 'rounded-full': circle}">
  </div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { TableShowMixin } from '../Mixins';

  @Component
  export default class ImageTableShow extends mixins(TableShowMixin) {
    @Prop({ default: false }) circle!: boolean;
    @Prop({ default: false }) lazy!: boolean;
    @Prop({ default: null }) classes!: string;
    @Prop({ default: null }) alt!: any;
    @Prop({ default: false }) multiple!: boolean;
    @Prop({ default: null }) srcKey!: string;
    @Prop({ default: null }) valueKey!: string;

    src (item: any) {
      if (this.multiple) {
        return item[this.srcKey];
      }

      return item;
    }

    get images () {
      return this.multiple ? [this.renderValue[0]] : [this.renderValue];
    }

    get altValue (): string {
      if (!this.alt) return '';
      if (typeof this.alt === 'function') return this.alt(this.value, this.item);
      return this.alt;
    }
  }

</script>
