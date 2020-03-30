<template>
  <main class="py-4 px-4 lg:py-8 lg:px-8 text-left" v-if="entity && datum">
    <div class="flex justify-between">
      <h1 class="text-2xl font-bold">{{$admin.translate('show_details', { title: $admin.helpers.singular(entity.title) }
        ) }}</h1>
      <div>
        <button @click="remove"
                class="bg-white font-bold shadow-lg rounded-lg px-4 py-2 text-lg transition hover:bg-red-600 hover:text-white"
                :title="$admin.translate('remove')"
                v-html="$admin.config.resolveIcon($admin.config.icons.remove)"/>
        <router-link :to="{name: 'dashboard.edit', params: {name: entity.name, key: datum[entity.getKey()]}}"
                     class="bg-blue-600 font-bold shadow-lg text-white rounded-lg transition hover:bg-pico-600 px-4 py-2 text-lg inline-block ml-3"
                     :title="$admin.translate('edit')"
                     v-html="$admin.config.resolveIcon($admin.config.icons.edit)"/>
      </div>
    </div>
    <table class="bg-white shadow-lg rounded-lg px-4 py-4 mt-4 w-full" v-if="datum">
      <tbody>
      <tr v-for="(field, k) in allFields" :key="'field-'+k" class="border-b">
        <td class="w-1/2 lg:w-1/4 xl:w-1/5 px-3 py-3 font-bold text-gray-700 first-letter-capitalize">
          <span v-if="field.relation">{{$admin.helpers.singular(field.entity.title)}}</span>
          <span v-else>{{field.getTitle().toLowerCase()}}</span>
        </td>
        <td>
          <span v-if="field.relation">
            <router-link class="font-bold"
                         :to="{name: 'dashboard.show', params:{name: field.entity.name, key: datum[field.getColumn()][field.entity.getKey()]}}"
                         v-if="datum[field.getColumn()]">
            {{datum[field.getColumn()][field.entity.defaultKey || field.entity.getKey()]}}
          </router-link>
          </span>
          <component :is="field.components.show" :item="datum" :field="field" v-bind="field.getProps()" v-else/>
        </td>
      </tr>
      </tbody>
    </table>
    <div v-for="(relation, k) in relations" :key="'relation-'+k" class="mt-8">
      <dashboard-has-many :items="datum[relation.column]" :parent-id="datum[entity.getKey()]" :parent="relation.parent"
                          :entity="relation.entity"/>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Route } from 'vue-router';

  @Component
  export default class Show extends Vue {
    name = 'Show';
    entity: any = null;
    datum: any = null;

    fetch (id: string) {
      const url: string = this.entity.buildShowUrl(this.$admin.config.baseUrl, id, this.queries);
      this.$admin.axios.get(url).then((res: any) => {
        this.datum = this.$admin.responseResolver(this.entity).data(res);
      }).catch(this.$admin.handleError);
    }

    get fields (): Array<any> {
      return this.entity.fields().filter((f: any) => f.isVisible('show'));
    }

    get allRelations (): Array<any> {
      return this.entity.relations();
    }

    get singleValueRelations (): Array<any> {
      return this.allRelations.filter(r => r.hasSingleValue());
    }

    get relations (): Array<any> {
      return this.allRelations.filter(r => !r.hasSingleValue());
    }

    get allFields (): Array<any> {
      const items = this.fields;
      this.singleValueRelations.forEach(r => {
        if (r.getPosition() <= 0) items.unshift(r);
        else if (r.getPosition() >= this.fields.length) items.push(r);
        else items.splice(r.getPosition(), 0, r);
      });

      return items;
    }

    remove () {
      this.$admin.confirm.ask(this.$admin.translate('are_you_sure_to_delete') || '', this.$admin.translate('are_you_sure') || '')
        .then(() => {
          this.$admin.axios.delete(this.entity.buildDeleteUrl(this.$admin.config.baseUrl, this.datum[this.entity.getKey()]))
            .then((res: any) => {
              this.$admin.alert.success(this.$admin.translate('deleted') || '');
              this.$router.back();
            }).catch(this.$admin.handleError);
        });
    }

    get queries (): any {
      const queries = {};
      if (this.singleValueRelations.length) {
        // @ts-ignore
        queries[this.$admin.config.relationKey] = this.singleValueRelations.map(r => r.getRelatedKey()).join(',');
      }

      return queries;
    }

    @Watch('$route', { deep: true, immediate: true })
    onRouteChanged (route: Route) {
      const entity = this.$admin.entities.find(entity => entity.name === route.params.name);
      if (!entity) {
        this.$router.push(this.$admin.resolveUrl('/'));
      }
      this.entity = entity;
      this.datum = null;
      const id: string = route.params.key;
      this.fetch(id);
    }
  }
</script>

<style scoped>

</style>
