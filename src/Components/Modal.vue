<template>
  <div class="fixed flex justify-center items-center top-0 left-0 right-0 bottom-0 "
       style="background: rgba(26, 32, 44, 0.5); z-index: 1000" v-show="open">
    <transition name="show-modal" :enter-active-class="animation(0)" :leave-active-class="animation(1)">
      <div v-if="showModal" class=""
           :class="{[classes]: true, 'w-full h-full min-h-screen': full && !customSize, 'w-full mx-3 lg:mx-0 lg:w-1/3': !full && !customSize}">
        <slot :modal="modal"/>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Component, Vue, Prop, Watch } from 'vue-property-decorator';

  @Component
  export default class Modal extends Vue {
    name: string = 'Modal';
    showModal: boolean = false;
    open: boolean = false;
    @Prop({ default: false }) full !: boolean;
    @Prop({ default: false }) value !: boolean;
    @Prop({ default: '' }) classes !: string;
    @Prop({ default: false }) customSize!: boolean;

    get modal () {
      return { close: this.close };
    }

    close () {
      this.showModal = false;
      setTimeout(() => {
        this.open = false;
        this.$emit('input', false);
        this.$emit('closed');
      }, 20);
    }

    @Watch('value', { immediate: true })
    onOpen (value: boolean) {
      if (!value) return this.close();
      this.open = true;
      setTimeout(() => {
        this.showModal = true;
        document.addEventListener('keyup', this.esc);
      }, 20);
    }

    animation (status: number) {
      if (status === 0) {
        return this.full ? 'animated fadeIn' : 'animated zoomIn';
      }

      return this.full ? 'animated fadeOut' : 'animated zoomOut';
    }

    esc (e: KeyboardEvent) {
      if (e.code === 'Escape') {
        this.close();
        document.removeEventListener('keyup', this.esc);
      }
    }
  }
</script>

<style scoped>

</style>
