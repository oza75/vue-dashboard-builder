<template>
  <div class="alerts-container">
    <AlertItem :alert="alert" :index="k" v-for="(alert, k) in instance.alerts" :key="'alert-'+k"/>
  </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';
  // @ts-ignore
  import AlertItem from './Alert.vue';
  import { AlertInstance } from './AlertContainer';

  @Component({
    components: { AlertItem }
  })
  export default class AlertComponent extends Vue {
    name: string = 'AlertComponent';
    instance: any = AlertInstance
  }
</script>

<style lang="scss">
  .alerts-container {
    background-color: transparent;
    position: fixed;
    right: 10px;
    bottom: 10px;
  }
</style>
