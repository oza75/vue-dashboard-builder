<template>
  <div class="py-3 w-full">
    <div v-if="multiple" class="flex justify-start items-center">
      <div v-for="(image,k) in renderValue" :key="'slide-'+k" class="mr-4 mb-4 bg-gray-300">
        <img :src="image[srcKey]" :alt="altValue" class="cursor-pointer w-64" @click="select(k)">
      </div>
    </div>

    <dashboard-modal :value="selected != null" v-if="selected"
                     classes="bg-white max-w-full lg:max-w-2/3 xl:max-w-3/4 px-3 py-3 rounded-lg shadow-lg"
                     :custom-size="true">
      <div class="relative" v-click-outside="close">
        <img :src="multiple ? selected[srcKey] : selected" class="mx-auto my-auto" :alt="altValue"
             style="max-height: calc(100vh - 100px)">
        <div class="absolute top-0 right-0 mx-3 my-3">
          <a :href="multiple ? selected[srcKey] : selected" target="_blank"
             class="bg-red-600 shadow-lg rounded-lg font-bold border-b-3 border-red-900 text-white px-3 py-2">
            {{$admin.translate('open_in_another_tab')}}
          </a>
        </div>
      </div>
    </dashboard-modal>
  </div>

</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { ShowMixin } from '../Mixins';

  @Component
  export default class ImageShow extends mixins(ShowMixin) {
    selectedIndex: number = -1;
    @Prop({ default: false }) circle!: boolean;
    @Prop({ default: false }) lazy!: boolean;
    @Prop({ default: null }) classes!: string;
    @Prop({ default: null }) alt!: any;
    @Prop({ default: false }) multiple!: boolean;
    @Prop({ default: null }) srcKey!: string;
    @Prop({ default: null }) valueKey!: string;

    get altValue (): string {
      if (!this.alt) return '';
      if (typeof this.alt === 'function') return this.alt(this.value, this.item);
      return this.alt;
    }

    get selected () {
      if (this.selectedIndex <= -1) return null;
      return this.multiple ? this.renderValue[this.selectedIndex] : this.renderValue;
    }

    select (index: number) {
      this.selectedIndex = index;
    }

    close () {
      this.selectedIndex = -1;
    }

    mounted () {
      // this.selectedIndex = 0;
    }
  }
</script>

<style scoped>

</style>
