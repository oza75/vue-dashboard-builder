<template>
  <main class="py-4 px-4 lg:py-8 lg:px-8 text-left" v-if="entity">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">{{$admin.translate('create', { title: $admin.helpers.singular(entity.title)
        })
        }}</h1>
    </div>
    <form action="#" method="post" @submit.prevent="save">
      <div class="bg-white shadow-lg rounded-t-lg px-4 py-4 mt-4 w-full">
        <edit-component @input="input" :entity="entity" @add-error="addError" @remove-error="removeError"
                        :originals="{}" :form-data="formData" :fields="fields"/>
      </div>
      <div class="flex justify-end bg-gray-200 shadow-lg rounded-b-lg py-3 px-3 items-center">
        <button type="submit" :disabled="hasErrors" :class="{'bg-gray-300': hasErrors, 'bg-indigo-600 text-white': !hasErrors}"
                class=" font-bold px-3 py-2 rounded-lg shadow-lg">
        <span v-if="!loading">
          {{$admin.translate('create',  { title: $admin.helpers.singular(entity.title) })}}
        </span>
          <span v-else v-html="$admin.config.resolveIcon($admin.config.icons.loading)"/>
        </button>
      </div>
    </form>
  </main>
</template>

<script lang="ts">
  import { Component, Provide, Vue, Watch } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import Editable from './Editable';
  import Form from '../Form';
  import { Route } from 'vue-router';

  @Component

  export default class Create extends mixins(Editable) {
    name: string = 'Create';
    loading: boolean = false;

    save () {
      if (this.hasErrors) return;
      let formData: FormData = new Form(this.formData).toFormData();
      let url: string = this.entity.buildCreateUrl(this.$admin.config.baseUrl);
      this.loading = true;
      this.$admin.axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res: any) => {
          let data = this.$admin.responseResolver(this.entity).data(res);
          this.$router.push({
            name: 'dashboard.show',
            params: { name: this.entity.name, key: data[this.entity.getKey()] }
          }).finally(() => {
            this.$admin.alert.success(this.$admin.translate('created_successfully') || '');
          });
        }).catch(this.$admin.handleError).finally(() => {
        this.loading = false;
      });
    }

    @Watch('$route', { deep: true, immediate: true })
    onRouteChanged (route: Route) {
      this.routeChanged(route);
    }
  }
</script>

<style scoped>

</style>
