<template>
  <div>
    <h1 class="text-2xl font-bold">{{entity.title}}</h1>
    <div class="mt-4">
      <div class="flex justify-between mb-3">
        <div v-if="entity.isSearchable()" class="w-full lg:w-1/3">
          <input type="search" v-model="search"
                 :placeholder="$admin.translate('search_in', {title: entity.title})"
                 class="input-form placeholder-gray-600 font-bold">
        </div>
        <button @click="openModal"
                class="bg-indigo-600 text-white text-sm px-3 py-2 font-bold rounded-lg border border-transparent  shadow-md">
          {{$admin.translate('attach', {title: $admin.helpers.singular(entity.title)})}}
        </button>
      </div>
    </div>
    <div class="flex justify-end py-2 px-2 w-full lg:border-b-2 lg:bg-white lg:rounded-t-lg"
         v-if="selected.length && actions.length">
      <div class="flex items-center" v-if="selected.length && actions.length">
        <dashboard-select name="action" class="mr-2" :options="actions" v-model="selectedAction" valueKey="name"
                          textKey="title"/>
        <button class="bg-blue-500 transition hover:bg-blue-400 text-white px-4 py-2 rounded-lg shadow"
                @click="runAction">
          <span v-show="!running" v-html="$admin.config.resolveIcon($admin.config.icons.play)"/>
          <span v-html="$admin.config.resolveIcon($admin.config.icons.loading)" v-show="running"/>
        </button>
      </div>
    </div>
    <dashboard-index-table :items="docs" :empty="empty" :entity="entity" @remove="detach"
                           :queries="computedQueries" @sortBy="sortBy"
                           :selected="selected" @selected="setSelection"/>
    <dashboard-modal v-model="modalState">
      <div class="bg-white rounded-lg shadow-lg">
        <div class="px-4 py-4">
          <h1 class="font-bold text-xl mb-4 font-heading">
            {{$admin.translate('attach', {title: $admin.helpers.singular(this.entity.name)})}}
          </h1>
          <!--          <p class="font-bold text-gray-600">Hello tous le monde</p>-->
          <auto-complete :items="autocompleteItems" :text-key="entity.defaultKey || entity.getKey()"
                         @search="searchItemsToAttach"
                         :placeholder="$admin.translate('search_in', {title: $admin.helpers.singular(entity.name)})"
                         input-classes="font-bold" v-model="itemToAttach"/>

        </div>
        <div class="bg-gray-200 rounded-b-lg px-4 py-2 flex justify-end items-center">
          <button class="font-bold text-gray-600 hover:bg-gray-200 transition hover:text-black mr-3 px-3 py-2"
                  @click="modalState = false">
            {{$admin.translate('cancel')}}
          </button>
          <button
            class="bg-indigo-600 hover:bg-indigo-400 transition font-bold text-white rounded-lg shadow px-4 py-2 mr-3"
            @click="attach(false)">
            <span v-show="loading !== 1">{{$admin.translate('attach_and_attach_btn')}}</span>
            <span v-html="$admin.config.resolveIcon($admin.config.icons.loading)" v-if="loading === 1"/>
          </button>
          <button class="bg-pico-600 hover:bg-pico-400 transition font-bold text-white rounded-lg shadow px-4 py-2"
                  @click="attach">
            <span v-show="loading !== 0">{{$admin.translate('attach_btn')}}</span>
            <span v-html="$admin.config.resolveIcon($admin.config.icons.loading)" v-if="loading === 0"/>
          </button>
        </div>
      </div>
    </dashboard-modal>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
  import AutoComplete from './AutoComplete/AutoComplete.vue';

  @Component({ components: { AutoComplete } })
  export default class HasManyComponent extends Vue {
    name: string = 'HasManyComponent';
    search: string = '';
    running: boolean = false;
    empty: boolean = false;
    loading: number = -1;
    selected: Array<any> = [];
    selectedAction: any | null = null;
    queries: any = {};
    docs: Array<any> = [];
    timer: any = null;
    itemToAttach: any = null;
    modalState: boolean = false;
    autocompleteItems: Array<any> = [];
    @Prop({ required: true }) items!: Array<any>;
    @Prop({ required: true }) entity!: any;
    @Prop({ required: true }) parent!: any;
    @Prop({ required: true }) parentId!: any;

    get actions (): Array<any> {
      // get entity actions
      return this.entity.actions();
    }

    get computedQueries (): any {
      // return an object that contains queries
      // that will be added to request url
      const queries: any = this.queries;
      queries['sort_by'] = this.entity.getKey(); // adding sort_by query
      // *IMPORTANT* we add the parent entity id to the request
      queries[this.$admin.helpers.singular(this.parent.name) + '_id'] = this.parentId;
      // if the entity allows searching
      if (this.entity.isSearchable) {
        // we add search_in columns to the queries object
        const sIn: Array<any> = this.entity.getSearchIn();
        queries[this.entity.getSearchKey()] = this.search;
        if (sIn.length) queries['search_in'] = sIn;
      }
      return queries;
    }

    openModal () {
      // we fetch non attached items from api
      this.fetchNonAttached();
      // then we open the modal
      this.modalState = true;
    }

    fetchNonAttached (queries: any = {}) {
      // this function make a request to api
      // and add  to_attach_to (the parent entity name)
      // and to_attach_id (the parent item id ) queries to url
      this.$admin.axios.get(
        this.entity.buildIndexUrl(
          this.$admin.config.baseUrl,
          {
            ...queries,
            to_attach_to: this.parent.name,
            to_attach_id: this.parentId
          })
      )
        .then((res: any) => {
          // we set response items
          this.autocompleteItems = this.$admin.responseResolver(this.entity)
            .data(res)
            .map((item: any) => ({
              ...item,
              text: item[this.entity.defaultKey || this.entity.getKey()]
            }));
        }).catch(this.$admin.handleError);
    }

    fetch (): void {
      // fetch item from api
      this.$admin.axios.get(this.entity.buildIndexUrl(this.$admin.config.baseUrl, this.computedQueries))
        .then((res: any) => {
          this.docs = this.$admin.responseResolver(this.entity).data(res);
          this.empty = this.docs.length === 0;
        });
    }

    detach (item: any) {
      // we ask user if he is sure that he want to detach this item
      this.$admin.confirm.ask(this.$admin.translate('are_you_sure_to_detach') || '', this.$admin.translate('are_you_sure') || '')
        .then(() => {
          // if he confirms we make an request to the api
          this.$admin.axios.post(this.parent.buildDetachUrl(this.$admin.config.baseUrl), item)
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            .then((res: any) => {
              // if the request success, we show a success message
              this.$admin.alert.success(this.$admin.translate('detached') || '');
              // then we re-fetch items from api
              this.fetch();
            }).catch(this.$admin.handleError);
        });
    }

    attach (closeModal: boolean = true) {
      // if there isn't an item to attach  we don't do anything
      if (!this.itemToAttach) return;
      // setting loader that let user knows something is going on
      this.loading = 0;
      // we make a post request to the api that as data : the primaryKey of the item to be attached
      this.$admin.axios.post(this.parent.buildAttachUrl(this.$admin.config.baseUrl), this.itemToAttach)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((res: any) => {
          // if the request success, we show a success message
          this.$admin.alert.success(this.$admin.translate('attached') || '');
          // and we re-fetch data from api
          this.fetch();
          // then if the closeModal is true we close the modal
          if (closeModal) this.modalState = false;
        })
        .catch(this.$admin.handleError)
        .then(() => {
          this.loading = -1;
        });
    }

    searchItemsToAttach (query: string) {
      // we set a timeout (debounce system) and after that delay ->
      // we make a request with search params
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const queries: any = { search: query };
        if (this.entity.getSearchIn().length) queries['search_in'] = this.entity.getSearchIn().join(',');
        this.fetchNonAttached(queries);
      }, 500);
    }

    setSelection (items: Array<any>) {
      // setting selected items
      this.selected = items;
    }

    runAction () {
      // same as the Index.vue run Action ->
      // it will be better to use a mixin here
      if (!this.selectedAction) return false;
      this.running = true;
      const items = this.docs.filter(item => this.selected.includes(item[this.entity.getKey()]));
      this.selectedAction.setContext({ vm: this, admin: this.$admin, config: this.$admin.config });
      this.selectedAction.run(items, this.entity)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .then((res: any) => {
            this.fetch();
            this.running = false;
            this.selected = [];
          }
        ).catch(() => {
        this.running = false;
      });
    }

    sortBy (column: string) {
      // same as the Index.vue sortBy
      if (this.queries['sort_by'] === column) {
        this.queries['sort_type'] = this.queries['sort_type'] === 'asc' ? 'desc' : 'asc';
      } else {
        this.queries['sort_by'] = column;
      }

      this.fetch();
    }
    // same as the Index.vue onSearch
    @Watch('search')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSearch (search: string) {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.fetch();
      }, 500);
    }

    created () {
      this.fetch();
    }
  }
</script>

<style scoped>

</style>
