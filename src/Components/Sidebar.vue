<template>
  <div class="w-full relative">
    <router-link class="cursor-pointer no-underline text-black" :to="{name: 'dashboard.home'}"><h2 class="w-full py-4 bg-pico-800 text-white  text-2xl text-center font-bold">{{$admin.config.appName || 'Vue Dashboard'}}</h2></router-link>
    <ul class="list-none">
      <li v-for="link in links" :key="link.url" class="border-b border-pico-600">
        <router-link :to="{name: 'dashboard.index', params: {name: link.name}}"
                     class="py-3 px-3 lg:px-6 w-full block transition hover:bg-pico-600 text-white hover:text-white">
          <span v-html="$admin.config.resolveIcon(link.icon)" class="mr-3 "/>
          {{link.title}}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import { SidebarLink } from '../types';

  @Component
  export default class Sidebar extends Vue {
    name: string = 'Sidebar';
    @Prop({ default: () => ([]) }) links!: Array<SidebarLink>;
  }
</script>

<style scoped>

</style>
