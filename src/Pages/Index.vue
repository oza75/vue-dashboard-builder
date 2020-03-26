<template>
  <main class="py-4 px-4 lg:py-8 lg:px-8 text-left" v-if="entity">
    <h1 class="text-2xl font-bold">{{entity.title}}</h1>
    <p class="font-bold text-gray-600">{{entity.description}}</p>

    <div class="mt-8">
      <div class="flex justify-between mb-3">
        <div v-if="entity.isSearchable()" class="w-full lg:w-1/3">
          <input type="search" v-model="search"
                 :placeholder="$admin.translate('search_in', {title: entity.title})"
                 class="input-form placeholder-gray-600 font-bold">
        </div>
        <router-link :to="{name: 'dashboard.create', params: {name: entity.name}}"
          class="bg-indigo-600 text-white text-sm px-3 py-2 font-bold rounded-lg border border-transparent  shadow-md">
          {{$admin.translate('create', {title: $admin.helpers.singular(entity.title)})}}
        </router-link>
      </div>

      <div class="flex justify-end py-2 px-2 w-full lg:border-b-2 lg:bg-white lg:rounded-t-lg"
           v-if="selected.length && actions.length">
        <div class="flex items-center" v-if="selected.length && actions.length">
          <dashboard-select name="action" class="mr-2" :options="actions" v-model="selectedAction" valueKey="name"
                            textKey="title"/>
          <button class="bg-blue-500 transition hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow"
                  @click="runAction">
            <span v-show="!loading" v-html="$admin.config.resolveIcon($admin.config.icons.play)"/>
            <span v-html="$admin.config.resolveIcon($admin.config.icons.loading)" v-show="loading"/>
          </button>
        </div>
      </div>
      <dashboard-index-table :entity="entity" :items="docs" :empty="empty" @remove="remove"
                             :queries="computedQueries" @sortBy="sortBy"
                             :selected="selected" @selected="setSelection"/>
    </div>
  </main>
</template>

<script lang="ts">
  import { Component, Vue, Watch } from 'vue-property-decorator';
  import { Route } from 'vue-router';
  import { Admin } from '../types';

  @Component
  export default class Index extends Vue {
    name: string = 'Index';
    entity: any = null;
    docs: Array<any> = [];
    selected: Array<any> = [];
    selectedAction: any | null = null;
    loading: boolean = false;
    empty: boolean = false;
    search: string = '';
    timer: number | undefined = undefined;
    queries: any = { sort_type: 'asc' };

    get actions (): Array<any> {
      // return entity actions
      return this.entity.actions();
    }

    get computedQueries (): any {
      // return an object that contains queries
      // that will be added to request url
      let queries: any = this.queries;
      queries['sort_by'] = this.entity.getKey(); // adding sort_by query
      // if the entity accept searching
      if (this.entity.isSearchable) {
        // we add search_in columns to the queries object
        let sIn: Array<any> = this.entity.getSearchIn();
        queries[this.entity.getSearchKey()] = this.search;
        if (sIn.length) queries['search_in'] = sIn;
      }
      return queries;
    }

    setSelection (items: Array<any>) {
      // set selection items
      this.selected = items;
    }

    remove (item: any) {
      // we prompt an confirm modal to ask if the user is really sure he want to do this action
      this.$admin.confirm.ask(this.$admin.translate('are_you_sure_to_delete') || '', this.$admin.translate('are_you_sure') || '')
        .then(() => {
          // if he confirm we make a delete request to the api
          this.$admin.axios.delete(this.entity.buildDeleteUrl(this.$admin.config.baseUrl, item[this.entity.getKey()]))
            .then(() => {
              // then we show a success message if everything go right
              this.$admin.alert.success(this.$admin.translate('deleted') || '');
              this.fetch(); // and we re-fetch data
            })
            .catch(this.$admin.handleError);
        });
    }

    fetch (): void {
      // we make a request to api
      this.$admin.axios
        .get(this.entity.buildIndexUrl(this.$admin.config.baseUrl, this.computedQueries))
        .then((res: any) => {
          this.docs = this.$admin.responseResolver(this.entity).data(res);
          this.empty = this.docs.length === 0;
        });
    }

    runAction () {
      // if we haven't an selected action we don't do anything
      if (!this.selectedAction) return false;
      // set loading to true that let user knows something is going on
      this.loading = true;
      // we retrieve selected items
      let items = this.docs.filter(item => this.selected.includes(item[this.entity.getKey()]));
      // we set action context and then we will be able to access some data like vuejs component etc..
      this.selectedAction.setContext({ vm: this, admin: this.$admin, config: this.$admin.config });
      // then we run the action and pass it the selected items and the the entity
      this.selectedAction.run(items, this.entity)
        .then((res: any) => {
            this.fetch(); // if the action finished running we refetch data from api
            this.loading = false; // we reset loading to false
            this.selected = []; // and we empty selected items
          }
        ).catch(() => {
        this.loading = false;
      });
    }

    sortBy (column: string) {
      // if the queries object sort_by is equal to the given column ->
      // that means we want to toggle sorting type
      if (this.queries['sort_by'] === column) {
        this.queries['sort_type'] = this.queries['sort_type'] === 'asc' ? 'desc' : 'asc';
      } else {
        // else we set sort_by to the given column
        this.queries['sort_by'] = column;
      }
      // and we re-fetch data from api
      this.fetch();
    }

    // we watch the vuejs $route and if it change that mean the entity has changed
    @Watch('$route', { immediate: true, deep: false })
    onRouteChanged (route: Route) {
      // we retrieve the given entity for entities passed to the VueDashboard options
      let entity = this.$admin.entities.find(entity => entity.name === route.params.name);
      // if we do not find anything, we redirect to the homepage
      if (!entity) {
        this.$router.push(this.$admin.config.prefix ? '/' + this.$admin.config.prefix : '/');
      }
      // else we set the entity
      this.entity = entity;
      this.docs = [];
      this.selectedAction = null;
      this.selected = [];
      this.fetch();
    }

    // if user try to search we set a timeout(debounce system) and after that time we ->
    // we fetch data from api
    @Watch('search')
    onSearch (search: string) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.fetch();
      }, 500);
    }

    mounted () {
      // We check if the entity has actions
      if (this.actions.length) {
        // we set the first action as default action
        this.selectedAction = this.actions[0];
      }
    }
  }
</script>

<style scoped>

</style>
