<template>
  <div>
    <div class="flex items-center">
      <div v-for="(image, k) in images" :key="'image-'+k"
           class="w-32 h-32 hover-overlay mr-2  hover:text-white transition cursor-pointer shadow-inner rounded bg-gray-200 flex justify-center items-center">
        <img :src="src(image)" class="w-full">
        <div class="hover-overlay-item  justify-center items-center">
            <span @click="remove(k, image)"
                  class="block text-lg rounded-full w-10 h-10 bg-red-600 flex justify-center items-center"
                  v-html="$admin.config.resolveIcon($admin.config.icons.remove)"/>
        </div>
      </div>
      <div v-for="(url, i) in base64Urls" :key="'base-64-url-'+i"
           class="w-32 h-32 hover-overlay  hover:text-white mr-2 transition cursor-pointer shadow-inner rounded bg-gray-200 flex justify-center items-center">
        <img :src="url" class="w-full">
        <div class="hover-overlay-item  justify-center items-center">
            <span @click="remove(i, url, true)"
                  class="block text-lg rounded-full w-10 h-10 bg-red-600 flex justify-center items-center"
                  v-html="$admin.config.resolveIcon($admin.config.icons.remove)"/>
        </div>
      </div>
      <file-input @upload="upload" :multiple="multiple" v-if="canAdd">
        <template v-slot:activator>
          <div :title="$admin.translate('add_a_new_image')"
               class="w-32 h-32 hover:bg-indigo-600 hover:text-white transition cursor-pointer shadow-inner rounded bg-gray-200 flex justify-center items-center">
            <span v-html="$admin.config.resolveIcon($admin.config.icons.add)"/>
          </div>
        </template>
      </file-input>
    </div>
    <div v-if="Object.keys(errors).length" class="mt-3">
      <p v-for="(value, k) in Object.values(errors)" :key="k" class="text-red-600 font-bold ">
        {{value}}
      </p>
    </div>
  </div>
</template>

<script lang="ts">
  import { mixins } from 'vue-class-component';
  import { EditMixin } from '../Mixins';
  import { Component, Prop, Watch } from 'vue-property-decorator';
  import FileInput from '../../FileInput.vue';
  import { arrayToFileList, DASHBOARD_IMAGE_KEY_PREFIX } from '../../../utils';

  @Component({
    components: { FileInput }
  })
  export default class ImageEdit extends mixins(EditMixin) {
    base64Urls: Array<any> = [];
    detached: Array<any> = [];
    attached: Array<File> = [];
    images: Array<any> = [];
    defaultValue: any = null;
    @Prop({ default: false }) multiple!: boolean;
    @Prop({ default: '' }) alt!: string | Function;
    @Prop({ default: null }) valueKey!: string;
    @Prop({ default: null }) srcKey!: string;

    get canAdd (): boolean {
      return this.multiple || (!this.multiple && ((this.images.length + this.attached.length) < 1));
    }

    upload (files: FileList) {
      for (let file of files) {
        this.attached.push(file);
        let reader = new FileReader();
        reader.addEventListener('load', () => {
          this.base64Urls.push(reader.result);
        });
        reader.readAsDataURL(file);
      }
    }

    remove (index: number, item: string, base64Url: boolean = false) {
      if (!base64Url) {
        if (this.multiple) {
          if (!this.valueKey) {
            throw new Error('When using multiple is true you need to set a valueKey and srcKey. call `.valueKey()` in your entity');
          }
          let detached = this.multiple ? this.renderValue[index][this.valueKey] : item;
          this.detached.push(detached);
        } else this.detached.push(item);
        this.images.splice(index, 1);
      } else {
        this.attached.splice(index, 1);
        this.base64Urls.splice(index, 1);
      }
    }

    @Watch('detached', { deep: true })
    onRemoved (detached: Array<any>) {
      if (!this.multiple) return;
      let value: any = Object.assign({}, this.formData[this.imageKey]);
      value['detached'] = detached;
      this.$emit('input', this.imageKey, value);
    }

    @Watch('attached', { deep: true })
    onFileAdded (files: File[]) {
      let value = Object.assign({}, this.formData[this.imageKey]);
      value['attached'] = arrayToFileList(files);
      this.$emit('input', this.imageKey, this.multiple ? value : files[0]);
    }

    get imageKey () {
      return `${DASHBOARD_IMAGE_KEY_PREFIX}${this.field.getColumn()}`;
    }

    src (item: any) {
      return this.multiple ? item[this.srcKey] : item;
    }

    mounted () {
      this.images = this.defaultValue = this.multiple ? this.renderValue : [this.renderValue];
      this.$emit('input', this.imageKey, { attached: [], detached: [] });
    }
  }
</script>

<style scoped>

</style>
