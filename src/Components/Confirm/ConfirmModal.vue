<template>
    <div class="text-left">
        <dashboard-modal v-if="confirm.show" v-model="state">
            <div class="bg-white rounded-lg shadow-lg">
                <div class="px-4 py-4">
                    <h1 class="font-bold text-xl mb-4 font-heading" v-if="confirm.title">
                        {{confirm.title}}
                    </h1>
                    <p class="font-bold text-gray-600" v-html="confirm.message"/>
                </div>
                <div class="bg-gray-200 rounded-b-lg px-4 py-2 flex justify-end items-center">
                    <button class="font-bold text-gray-600 hover:bg-gray-200 transition hover:text-black mr-3 px-3 py-2" @click="cancel">
                        Annuler
                    </button>
                    <button @click="go" class="bg-indigo-600 hover:bg-indigo-400 transition font-bold text-white rounded-lg shadow px-4 py-2">
                        Confirmer
                    </button>
                </div>
            </div>
        </dashboard-modal>
    </div>
</template>

<script lang="ts">
  import { Vue, Component } from 'vue-property-decorator';

  import _confirm, { Confirm } from './Confirm';

    @Component({
        components: {},
        computed: {}
    })
  export default class ConfirmModal extends Vue {
        name: string = 'ConfirmModal';
        confirm: Confirm = _confirm;
        state: boolean = true;

        cancel () {
            this.confirm.exec('cancel');
            this.confirm.reset();
        }

        go () {
            this.confirm.exec('confirm');
            this.confirm.reset();
        }
  }
</script>
