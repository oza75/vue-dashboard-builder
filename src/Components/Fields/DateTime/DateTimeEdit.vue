<template>
  <div>
    <datepicker :language="language" :format="format" :value="value" @input="changed"
                input-class="transition outline-none border bg-white border-b-2  rounded  py-2 px-4 block w-full xl:w-2/3 leading-normal"/>
  </div>
</template>

<script lang="ts">
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';
  import { Component, Prop } from 'vue-property-decorator';
  // @ts-ignore
  import Datepicker from 'vuejs-datepicker';

  @Component({
    components: { Datepicker }
  })
  export default class DateEdit extends mixins(EditMixin) {
    @Prop({ default: 'dd MMMM yyyy' }) format!: string;
    @Prop({ default: false }) sendUsingTimestamps!: boolean;

    get language () {
      return require('vuejs-datepicker/dist/locale/translations/fr.js');
    }

    changed (value: any) {
      let formatted = value instanceof Date ? value.toString() : value;
      if (this.sendUsingTimestamps) {
        formatted = new Date(value).getTime();
      }
      this.input(formatted);
    }
  }
</script>
