<template>
  <div class="w-full xl:w-2/3 xl:max-w-2/3 trix-container">
    <VueTrix :srcContent="value" @input="input" @trix-attachment-add="handleAttachmentChanges"
             :placeholder="placeholder"/>
  </div>
</template>

<script lang="ts">
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';
  import { Component, Prop } from 'vue-property-decorator';

  // @ts-ignore
  const VueTrix: any = require('vue-trix/src/components/VueTrix.vue').default;

  @Component({ components: { VueTrix } })
  export default class EditTrixField extends mixins(EditMixin) {
    name: string = 'EditTrixField';
    @Prop({ default: 'Enter your content here ...' }) placeholder !: string;
    @Prop({ default: '/upload' }) uploadUrl !: string;
    @Prop({ default: 'file' }) fileKey !: string;
    @Prop({ default: true }) concatBaseUrl !: boolean;

    handleAttachmentChanges (event: any) {
      // 1. get file object
      const file = event.attachment.file;
      if (!file) return;
      const url: string = this.concatBaseUrl ? this.$admin.config.baseUrl + this.uploadUrl : this.uploadUrl;
      const formData: FormData = new FormData();
      formData.append(this.fileKey, file);
      // 2. upload file to remote server with FormData
      this.$admin.axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } }).then((res: any) => {
        const data: any = this.field.resolveResponse() ? this.field.resolveResponse().data(res) : this.$admin.config.responseResolver.data(res);
        event.attachment.setAttributes({ url: data['url'], href: data['href'] || data['url'], width: '100%' });
      });
    }
  }
</script>

<style lang="scss">
  .trix-container img {
    width: auto !important;
    max-width: 100% !important;
  }
</style>
