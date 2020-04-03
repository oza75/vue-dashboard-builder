<template>
  <div class="min-w-full min-h-screen font-body">
    <div class="flex flex-start">
      <div class="hidden  lg:block lg:w-1/5 min-h-screen ">
        <div class="fixed hidden  lg:block lg:w-1/6 min-h-screen   bg-pico-700 text-left">
          <dashboard-sidebar :links="sidebarLinks"/>
          <a href="#" v-if="$admin.isLogged()" @click.prevent="$admin.logout" style="color: #3a0505"
             class="absolute bottom-0 py-3 px-3 lg:px-6 w-full bg-red-300 font-bold left-0 right-0">
            <i class="fas fa-sign-out-alt"></i>
            <span class="ml-3 inline-block">Logout</span>
          </a>
        </div>
      </div>
      <div class="w-full bg-gray-200">
        <router-view/>
      </div>
    </div>

    <alert-component/>
    <confirm-modal/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import AlertComponent from '../Components/Alert/Component.vue';
  // @ts-ignore
  import ConfirmModal from '../Components/Confirm/ConfirmModal.vue';
  import { SidebarLink } from '../types';

  @Component({ components: { AlertComponent, ConfirmModal } })
  export default class DashboardIndex extends Vue {
    name: string = 'Index';

    get sidebarLinks (): Array<SidebarLink> {
      return this.$admin.entities.map(entity => ({ title: entity.title, name: entity.name, icon: entity.icon }));
    }

    mounted () {
      if (this.$route.path === `/${this.$admin.config.prefix}/`) {
        this.$router.push({ name: 'dashboard.home' });
      }
    }
  }
</script>

<style scoped>

</style>
