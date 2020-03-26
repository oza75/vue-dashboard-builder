<template>
  <div class="alert-component-container">
    <transition name="slide-left">
      <div class="alert-component shadow-lg rounded-lg" v-if="alert.isVisible" :class=" classes ">
        <div class="icon"><i :class="icons[alert.type]"></i></div>
        <div class="content" v-html="alert.message"></div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
  import { Vue, Component, Watch, Prop } from 'vue-property-decorator';
  import Alert from './Alert';
  import { AlertInstance } from './AlertContainer';

  @Component
  export default class AlertItem extends Vue {
    name: string = 'AlertItem';
    @Prop({ required: true }) alert!: Alert;
    @Prop({ required: true }) index!: number;
    timeout: number = 1000 * 10;

    @Watch('alert.isVisible', { immediate: true, deep: true })
    onVisible (visible: boolean) {
      if (visible) {
        setTimeout(() => {
          this.alert.isVisible = false;
          AlertInstance.remove(this.index);
        }, this.timeout);
      }
    }

    get icons () {
      return {
        info: 'fas fa-info',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation',
        success: 'fas fa-check-circle'
      };
    }

    get classes () {
      let type: string = `v-alert-${this.alert.type}`;
      let classes: any = {};
      classes[type] = true;

      return classes;
    }

    mounted () {
      this.$nextTick(() => {
        this.alert.visible();
      });
    }
  }
</script>

<style lang="scss">
  .alert-component-container {
    $info: #0984e3;
    $error: #d63031;
    $success: #00b894;
    $warning: #fdcb6e;

    .alert-component {
      padding: 10px 15px;
      display: flex;
      justify-content: flex-start;
      transition: all .3s cubic-bezier(.51, .05, .15, 1.01);
      margin-bottom: 10px;
      z-index: 10000;

      .content {
        max-width: 300px;
      }

      .icon {
        margin-right: 10px;
        font-size: 18px;
      }

      @mixin color($color) {
        background-color: $color;
        color: white;
        box-shadow: 5px 9px 10px rgba($color, 0.1);
        position: relative;

        .icon {
          color: lighten($color, 40%);
        }

        &::after {
          content: ' ';
          width: 100%;
          height: 6px;
          background-color: lighten($color, 10%);
          position: absolute;
          bottom: 0;
          right: 0;
          left: 0;
          animation: timeout 10s forwards;
        }
      }

      &.v-alert-info {
        @include color($info)
      }

      &.v-alert-success {
        @include color($success)
      }

      &.v-alert-error {
        @include color($error)
      }

      &.v-alert-warning {
        @include color($warning)
      }

    }

    .slide-left-leave {
      opacity: 1;
    }

    .slide-left-leave-to {
      opacity: 0;
    }

    .slide-left-enter {
      transform: translateX(100px);
    }

    .slide-left-enter-to {
      transform: translateX(0px);
    }

    @keyframes timeout {
      from {
        width: 100%;
      }
      to {
        width: 0%;
      }
    }
  }
</style>
