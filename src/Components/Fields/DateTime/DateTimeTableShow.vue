<template>
  <div v-html="renderValue"></div>
</template>

<script lang="ts">
  import { Component, Prop } from 'vue-property-decorator';
  import { mixins } from 'vue-class-component';
  import { TableShowMixin } from '../Mixins';

  @Component
  export default class DateTableShow extends mixins(TableShowMixin) {
    now: Date = new Date();
    interval: any = null;
    @Prop({ required: true }) item!: any;
    @Prop({ required: true }) field!: any;
    @Prop({ default: false }) humanReadable!: boolean;
    @Prop({ default: false }) fromNow!: boolean;
    @Prop({ default: null }) format!: string;

    get value (): string {
      return this.item[this.field.getColumn()];
    }

    get parsed (): string {
      if (this.format) {
        return this.$admin.dayjs(this.value).format(this.format);
      }
      if (this.humanReadable) {
        return this.$admin.dayjs().calendar(this.$admin.dayjs(this.value));
      }
      if (this.fromNow) {
        this.$admin.dayjs(this.value).from(this.now);
      }
      return this.value;
    }

    get renderValue (): string {
      return this.field.view('render_in_table', this.parsed, this.item);
    }

    mounted () {
      if (this.fromNow) {
        this.interval = setInterval(() => {
          this.now = new Date();
        }, 1000);
      }
    }

    destroyed () {
      clearInterval(this.interval);
    }
  }

</script>
