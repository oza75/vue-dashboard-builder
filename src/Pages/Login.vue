<template>
  <div class="flex bg-gray-300 items-center justify-center text-left min-h-screen min-w-full"
       v-if="$admin.config.loginForm">
    <div class="bg-white shadow-lg rounded-lg w-full lg:w-1/5">
      <h1 class="font-bold px-3 py-3 text-lg border-b-2">{{$admin.config.loginForm.title || 'Login'}} - &nbsp;&nbsp;{{$admin.config.appName}}</h1>
      <form class="px-3 py-3" @submit.prevent="submit">
        <dashboard-input v-for="(field, k) in $admin.config.loginForm.fields"
                         :key="'field-'+k" :label="field.label" class="mb-3"
                         :name="field.name" :type="field.type || 'text'" v-model="datum[field.name]"/>

        <button type="submit"
                class="bg-pico-600 px-3 py-2 text-white font-bold rounded mt-3 shadow transition hover:bg-blue-700">
          <span v-if="!running">
            {{$admin.config.loginForm.buttonText || 'Login'}}
          </span>
          <span v-else>
            <i class="fas fa-spin fa-circle-notch"></i>
          </span>
        </button>
      </form>
    </div>
    <alert-component/>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';
  // @ts-ignore
  import AlertComponent from '../Components/Alert/Component.vue';

  @Component({ components: { AlertComponent } })
  export default class Login extends Vue {
    name: string = 'Login';
    datum: any = {};
    running: boolean = false;

    submit () {
      if (!this.$admin.config.loginForm) return;
      const { url } = this.$admin.config.loginForm;
      this.running = true;
      this.$admin.axios.post(this.$admin.config.baseUrl + url, this.datum)
        .then((res: any) => {
          // @ts-ignore
          const token = this.$admin.config.loginForm.retrieveAccessToken(res);
          window.localStorage.setItem(this.$admin.config.accessToken, token);

          // @ts-ignore
          this.$router.push(this.$route.query.redirect_to || this.$admin.resolveUrl('/'));
          window.location.reload();
        }).catch((err: any) => {
        this.$admin.handleError(err);
      })
        .finally(() => {
          this.running = false;
        });
    }
  }
</script>

<style scoped>

</style>
