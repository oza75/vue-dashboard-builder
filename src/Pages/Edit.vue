<template>
  <main class="py-4 px-4 lg:py-8 lg:px-8 text-left" v-if="entity && datum">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">{{$admin.translate('edit_title', { title: $admin.helpers.singular(entity.title) })
        }}</h1>
    </div>
    <form action="#" method="post" @submit.prevent="save">
      <div class="bg-white shadow-lg rounded-t-lg px-4 py-4 mt-4 w-full">
        <edit-component @input="input" :entity="entity" :originals="datum" :form-data="formData" :fields="allFields"/>
      </div>
      <div class="flex justify-end bg-gray-200 shadow-lg rounded-b-lg py-3 px-3 items-center">
        <button type="submit" :disabled="hasErrors"
                :class="{'bg-gray-600': hasErrors, 'bg-indigo-600 text-white': !hasErrors}"
                class=" font-bold px-3 py-2 rounded-lg shadow-lg">
        <span v-if="!loading">
          {{$admin.translate('edit',  { title: $admin.helpers.singular(entity.title) })}}
        </span>
          <span v-else v-html="$admin.config.resolveIcon($admin.config.icons.loading)"/>
        </button>
      </div>
    </form>
  </main>
</template>

<script lang="ts">
  import { Component, Provide, Vue, Watch } from 'vue-property-decorator';
  import { Route } from 'vue-router';
  import Form from '../Form';
  import { mixins } from 'vue-class-component';
  import Editable from './Editable';

  @Component
  export default class Edit extends mixins(Editable) {
    name: string = 'Edit';
    loading: boolean = false;

    fetch (id: string) {
      let url: string = this.entity.buildShowUrl(this.$admin.config.baseUrl, id);
      this.$admin.axios.get(url).then((res: any) => {
        this.datum = this.$admin.responseResolver(this.entity).data(res);
        this.fields.forEach(field => {
          let value = this.datum[field.getColumn()];
          this.$set(this.formData, field.getColumn(), value);
        });
      }).catch(this.$admin.handleError);
    }

    save () {
      let method: string = this.entity.getUpdateMethod(this.$admin.config.updateMethod).toLowerCase();
      let formData: FormData | any;
      let request: any;
      if (method === 'post') {
        formData = new Form(this.formData).toFormData();
        formData.append('_method', 'PUT');
        request = this.$admin.axios.post;
      } else {
        formData = new Form(this.formData).toFormData();
        request = this.$admin.axios.put;
      }

      let url: string = this.entity.buildUpdateUrl(this.$admin.config.baseUrl, this.datum[this.entity.getKey()]);
      this.loading = true;

      request(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        .then((res: any) => {
          this.$router.push({
            name: 'dashboard.show',
            params: { name: this.entity.name, key: this.datum[this.entity.getKey()] }
          }).finally(() => {
            this.$admin.alert.success(this.$admin.translate('saved_successfully') || '');
          });
        }).catch(this.$admin.handleError).finally(() => {
        this.loading = false;
      });
    }

    @Watch('$route', { deep: true, immediate: true })
    onRouteChanged (route: Route) {
      this.routeChanged(route);
      let id: string = route.params.key;
      this.fetch(id);
    }
  }
</script>

<style scoped>

</style>
