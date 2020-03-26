<template>
  <div>
    <div v-if="empty" class="bg-white text-left w-full rounded-b-lg shadow-lg flex justify-center items-center">
      <div class="py-4 text-center">
        <span class="block text-center text-5xl" v-html="$admin.config.resolveIcon($admin.config.icons.emptyItems)"/>
        <p class="font-bold text-gray-600 mb-3">{{$admin.translate('empty_items', {title: $admin.helpers.singular(entity.title).toLowerCase()})}}</p>
        <router-link :to="{name: 'dashboard.create', params: {name: entity.name}}" class="px-2 py-1 text-center border-2 border-indigo-600 rounded text-indigo-600 hover:bg-indigo-600 transition hover:text-white">  {{$admin.translate('create', {title: $admin.helpers.singular(entity.title)})}}</router-link>
      </div>
    </div>
    <table v-else class="table-auto bg-white text-left w-full rounded-b-lg shadow-lg ">
      <thead>
      <tr class="bg-gray-300 border">
        <th class="px-2 pl-4 py-2 text-gray-700 font-bold">
          <dashboard-checkbox @input="selectAll" :checked="selection.length === items.length"/>
        </th>
        <th class="px-2 py-2 text-gray-700 font-bold"
            v-for="(field, k) in fields"
            :key="entity.title + '-field-'+ field.getColumn() + k">
            <span class="cursor-pointer flex opacity-75 uppercase"
                  @click="field.isSortable() ? $emit('sortBy', field.getColumn()) : () => {}">
              {{field.getTitle()}}
              <span v-if="field.isSortable()" class="inline-block ml-2"
                    v-html="rightSorting(field)"/>
            </span>

        </th>
        <th class="px-2 py-2 text-gray-700 font-bold text-right lg:pr-6">
           <span class="opacity-75 uppercase">
             Actions
            </span>
        </th>
      </tr>
      </thead>
      <tbody v-if="fields.length > 0">
      <tr v-for="(item,k) in items" :key="entity.title + '-row-'+k"
          class="border-b transition cursor-pointer hover:bg-gray-100" :class="{'bg-gray-100': isSelected(item)}"
          @click="select(item)">
        <td class="px-2 pl-4 py-2">
          <dashboard-checkbox @input="select(item)" :checked="isSelected(item)"/>
        </td>
        <td v-for="(field, i) in fields" :key="entity.title + '-column-'+ field.getColumn() + i" class="px-2 py-2">
          <component :is="field.components.index" :item="item" :field="field" v-bind="field.getProps()"/>
        </td>
        <td class="px-2 py-2 text-right">
          <router-link
            :to="{name: 'dashboard.show', params: {name: entity.name, key: item[entity.getKey()]}}"
            class="mr-3 inline-block">
            <span v-html="$admin.config.resolveIcon($admin.config.icons.show)"/>
          </router-link>
          <router-link :to="{name: 'dashboard.edit', params: {name: entity.name, key: item[entity.getKey()]}}" class="mr-3 inline-block">
            <span v-html="$admin.config.resolveIcon($admin.config.icons.edit)"/>
          </router-link>
          <button @click="$emit('remove', item)" class="mr-3 inline-block text-red-600">
            <span v-html="$admin.config.resolveIcon($admin.config.icons.remove)"/>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  @Component
  export default class IndexTable extends Vue {
    name: string = 'IndexTable';
    selection: Array<any> = [];
    @Prop({ required: true }) entity!: any;
    @Prop({ default: false }) empty!: boolean;
    @Prop({ default: () => ([]) }) items!: Array<any>;
    @Prop({ default: () => ([]) }) selected!: Array<any>;
    @Prop({ default: null }) sortedBy!: Array<any>;
    @Prop({ default: () => ({}) }) queries!: any;

    get fields (): Array<any> {
      return this.entity.fields().filter((f: any) => f.isVisible('index'));
    }

    selectAll (checked: boolean) {
      if (checked) {
        let key: any = this.entity.getKey();
        if (!key) return false;
        this.selection = this.items.map(item => item[key]);
      } else {
        this.selection = [];
      }
    }

    select (item: any) {
      let value = item[this.entity.getKey()];
      if (!value) return false;
      let index: number = this.selection.findIndex(item => item === value);
      if (index > -1) {
        this.selection.splice(index, 1);
      } else {
        this.selection.push(value);
      }
    }

    isSelected (item: any): boolean {
      let value = item[this.entity.getKey()];
      if (!value) return false;
      let index: number = this.selection.findIndex(item => item === value);
      return index > -1;
    }

    rightSorting (field: any): any {
      if (this.queries['sort_by'] === field.getColumn()) {
        return this.$admin.config.resolveIcon(this.$admin.config.icons[this.queries['sort_type'] === 'asc' ? 'sortUp' : 'sortDown']);
      }
      return this.$admin.config.resolveIcon(this.$admin.config.icons.sort);
    }

    @Watch('selected', { immediate: true, deep: true })
    onSelected (selected: Array<any>) {
      this.selection = selected;
    }

    @Watch('selection')
    sendSelection (selection: Array<any>) {
      this.$emit('selected', selection);
    }
  }
</script>

<style scoped>

</style>
