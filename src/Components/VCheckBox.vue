<template>
    <label class="container">{{label}}
        <input type="checkbox" :value="value" @change="input" :checked="checked">
        <span class="checkmark rounded border-t border-b border-r border-l shadow-inner bg-white"/>
    </label>
</template>

<script lang="ts">
  import { Vue, Component, Prop } from 'vue-property-decorator';

    @Component({
        components: {},
        computed: {}
    })
  export default class VCheckBox extends Vue {
        name: string = 'VCheckBox'
        @Prop({ default: false }) value !: boolean;
        @Prop({ default: null }) label !: string;
        @Prop({ default: false }) checked !: boolean;

        input (e: any) {
            this.$emit('input', e.target.checked);
        }
  }
</script>

<style scoped lang="scss">
    /* Customize the label (the container) */
    .container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .checkmark {
        position: absolute;
        top: 0;
        left: 0;
        height: 20px;
        width: 20px;
    }

    /* On mouse-over, add a grey background color */
    .container:hover input ~ .checkmark {
        background-color: #e2e8f0;
    }

    /* When the checkbox is checked, add a blue background */
    .container input:checked ~ .checkmark {
        background-color: #e2e8f0;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .checkmark:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .container input:checked ~ .checkmark:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .container .checkmark:after {
        left: 8px;
        top: 3px;
        width: 5px;
        height: 10px;
        border: solid #2d3748;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }
</style>
