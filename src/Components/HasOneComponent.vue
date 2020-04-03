<template>
  <div>
    <v-select :name="entity.constructor.name + '_'+parent.constructor.name+ '_relation'" :options="items"
              :value-key="entity.getKey()" @input="input" :return-object="false"
              :text-key="entity.defaultKey"/>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue } from 'vue-property-decorator';
  import VSelect from './VSelect.vue';

  @Component({ components: { VSelect } })
  export default class HasOneComponent extends Vue {
    name: string = 'HasOneComponent';
    items: Array<any> = [];
    @Prop({ required: true }) relation!: any;
    @Prop({ required: true }) entity!: any;
    @Prop({ required: true }) parent!: any;

    fetch () {
      this.$admin.axios.get(this.entity.buildIndexUrl(this.$admin.config.baseUrl))
        .then((res: any) => {
          this.items = this.$admin.responseResolver(this.entity).data(res);
        }).catch(this.$admin.handleError);
    }

    input (value: any) {
      this.$emit('input', this.relation.getForeignKey() || this.relation.column, value);
    }

    created () {
      this.fetch();
    }
  }
</script>

<style scoped>

</style>
