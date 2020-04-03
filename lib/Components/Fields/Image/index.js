import { __decorate } from "tslib";
import { mixins } from 'vue-class-component';
import { EditMixin, ShowMixin, TableShowMixin } from '../Mixins';
import { Component, Prop, Watch } from 'vue-property-decorator';
// @ts-ignore
import FileInput from '../../FileInput.vue';
import { arrayToFileList, DASHBOARD_IMAGE_KEY_PREFIX } from '../../../utils';
let ImageEdit = class ImageEdit extends mixins(EditMixin) {
    constructor() {
        super(...arguments);
        this.base64Urls = [];
        this.detached = [];
        this.attached = [];
        this.images = [];
        this.defaultValue = null;
    }
    get canAdd() {
        return this.multiple || (!this.multiple && ((this.images.length + this.attached.length) < 1));
    }
    upload(files) {
        for (let file of files) {
            this.attached.push(file);
            let reader = new FileReader();
            reader.addEventListener('load', () => {
                this.base64Urls.push(reader.result);
            });
            reader.readAsDataURL(file);
        }
    }
    remove(index, item, base64Url = false) {
        if (!base64Url) {
            if (this.multiple) {
                if (!this.valueKey) {
                    throw new Error('When using multiple is true you need to set a valueKey and srcKey. call `.valueKey()` in your entity');
                }
                let detached = this.multiple ? this.renderValue[index][this.valueKey] : item;
                this.detached.push(detached);
            }
            else
                this.detached.push(item);
            this.images.splice(index, 1);
        }
        else {
            this.attached.splice(index, 1);
            this.base64Urls.splice(index, 1);
        }
    }
    onRemoved(detached) {
        if (!this.multiple)
            return;
        let value = Object.assign({}, this.formData[this.imageKey]);
        value['detached'] = detached;
        this.$emit('input', this.imageKey, value);
    }
    onFileAdded(files) {
        let value = Object.assign({}, this.formData[this.imageKey]);
        value['attached'] = arrayToFileList(files);
        this.$emit('input', this.imageKey, this.multiple ? value : files[0]);
    }
    get imageKey() {
        return `${DASHBOARD_IMAGE_KEY_PREFIX}${this.field.getColumn()}`;
    }
    src(item) {
        return this.multiple ? item[this.srcKey] : item;
    }
    mounted() {
        this.images = this.defaultValue = this.multiple ? this.renderValue : [this.renderValue];
        this.$emit('input', this.imageKey, { attached: [], detached: [] });
    }
};
__decorate([
    Prop({ default: false })
], ImageEdit.prototype, "multiple", void 0);
__decorate([
    Prop({ default: '' })
], ImageEdit.prototype, "alt", void 0);
__decorate([
    Prop({ default: null })
], ImageEdit.prototype, "valueKey", void 0);
__decorate([
    Prop({ default: null })
], ImageEdit.prototype, "srcKey", void 0);
__decorate([
    Watch('detached', { deep: true })
], ImageEdit.prototype, "onRemoved", null);
__decorate([
    Watch('attached', { deep: true })
], ImageEdit.prototype, "onFileAdded", null);
ImageEdit = __decorate([
    Component({
        template: `
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
        <p v-for="(value, k) in Object.values(errors)" class="text-red-600 font-bold ">
          {{value}}
        </p>
      </div>
    </div>
  `,
        components: { FileInput }
    })
], ImageEdit);
export { ImageEdit };
let ImageShow = class ImageShow extends mixins(ShowMixin) {
    constructor() {
        super(...arguments);
        this.selectedIndex = -1;
    }
    get altValue() {
        if (!this.alt)
            return '';
        if (typeof this.alt === 'function')
            return this.alt(this.value, this.item);
        return this.alt;
    }
    get selected() {
        if (this.selectedIndex <= -1)
            return null;
        return this.multiple ? this.renderValue[this.selectedIndex] : this.renderValue;
    }
    select(index) {
        this.selectedIndex = index;
    }
    close() {
        this.selectedIndex = -1;
    }
    mounted() {
        // this.selectedIndex = 0;
    }
};
__decorate([
    Prop({ default: false })
], ImageShow.prototype, "circle", void 0);
__decorate([
    Prop({ default: false })
], ImageShow.prototype, "lazy", void 0);
__decorate([
    Prop({ default: null })
], ImageShow.prototype, "classes", void 0);
__decorate([
    Prop({ default: null })
], ImageShow.prototype, "alt", void 0);
__decorate([
    Prop({ default: false })
], ImageShow.prototype, "multiple", void 0);
__decorate([
    Prop({ default: null })
], ImageShow.prototype, "srcKey", void 0);
__decorate([
    Prop({ default: null })
], ImageShow.prototype, "valueKey", void 0);
ImageShow = __decorate([
    Component({
        template: `
    <div class="py-3 w-full">
      <div v-if="multiple" class="flex justify-start items-center">
        <div v-for="(image,k) in renderValue" :key="'slide-'+k" class="mr-4 mb-4 bg-gray-300">
          <img :src="image[srcKey]" :alt="altValue" class="cursor-pointer w-64" @click="select(k)">
        </div>
      </div>

      <dashboard-modal :value="selected != null"
                       classes="bg-white max-w-full lg:max-w-2/3 xl:max-w-3/4 px-3 py-3 rounded-lg shadow-lg"
                       :custom-size="true">
        <div slot-scope="{modal}" class="relative" v-click-outside="close">
          <img :src="multiple ? selected[srcKey] : selected" class="mx-auto my-auto" :alt="altValue"
               style="max-height: calc(100vh - 100px)">
          <div class="absolute top-0 right-0 mx-3 my-3">
            <a :href="multiple ? selected[srcKey] : selected" target="_blank"
               class="bg-red-600 shadow-lg rounded-lg font-bold border-b-3 border-red-900 text-white px-3 py-2">
              {{$admin.translate('open_in_another_tab')}}
            </a>
          </div>
        </div>
      </dashboard-modal>
    </div>
  `
    })
], ImageShow);
export { ImageShow };
let ImageTableShow = class ImageTableShow extends mixins(TableShowMixin) {
    src(item) {
        if (this.multiple) {
            return item[this.srcKey];
        }
        return item;
    }
    get images() {
        return this.multiple ? [this.renderValue[0]] : [this.renderValue];
    }
    get altValue() {
        if (!this.alt)
            return '';
        if (typeof this.alt === 'function')
            return this.alt(this.value, this.item);
        return this.alt;
    }
};
__decorate([
    Prop({ default: false })
], ImageTableShow.prototype, "circle", void 0);
__decorate([
    Prop({ default: false })
], ImageTableShow.prototype, "lazy", void 0);
__decorate([
    Prop({ default: null })
], ImageTableShow.prototype, "classes", void 0);
__decorate([
    Prop({ default: null })
], ImageTableShow.prototype, "alt", void 0);
__decorate([
    Prop({ default: false })
], ImageTableShow.prototype, "multiple", void 0);
__decorate([
    Prop({ default: null })
], ImageTableShow.prototype, "srcKey", void 0);
__decorate([
    Prop({ default: null })
], ImageTableShow.prototype, "valueKey", void 0);
ImageTableShow = __decorate([
    Component({
        template: `
    <div>
      <img :src="src(image)" :loading="lazy" :alt="altValue" class="" v-for="(image, k) in images" :key="'image-'+k"
           :class="{[classes]: true, 'rounded-full': circle}">
    </div>
  `
    })
], ImageTableShow);
export { ImageTableShow };
