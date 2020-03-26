<template>
  <div class="autocomplete">
    <div class="autocomplete-input-container">
      <input type="text" class="autocomplete-input" ref="input" autocomplete="off"
             @focus="opened = true" @blur="close"
             @keydown="keyPressed" @keyup.enter="submit"
             :class="{[inputClasses]: true}"
             :placeholder="placeholder" :value="query" @input="onQuery($event.target.value)"/>
    </div>
    <div class="autocomplete-items-container" v-show="opened">
      <ul class="autocomplete-items">
        <li v-for="(item, i) in items" class="autocomplete-item-wrapper" :key="'item-'+i" @click="select(i)">
          <slot name="item" v-bind:item="item" v-bind:isActive="isActive(i)">
            <span class="autocomplete-item" :class="{'active': index === i}">
              {{textValue(item)}}
            </span>
          </slot>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
  import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

  const ARROW_DOWN = 'ArrowDown';
  const ARROW_UP = 'ArrowUp';
  @Component
  export default class AutoComplete extends Vue {
    name: string = 'auto-complete';
    opened: boolean = false;
    index: number = 0;
    query: string = '';
    @Prop({ default: () => [] }) items!: Array<any>;
    @Prop({ default: null }) value!: Array<any>;
    @Prop({ default: '' }) inputClasses !: string;
    @Prop({ default: null }) textKey!: string | Function;
    @Prop({ default: null }) valueKey!: string | Function;
    @Prop({ default: '' }) search!: string;
    @Prop({ default: 'Start typing your search...' }) placeholder !: string;

    get selected () {
      // if we have no items we return null
      if (!this.items.length) return null;
      // else the selected item is the item is the index position
      let item: any = this.items[this.index];
      // if item is a string we just return it
      if (typeof item === 'string') return item;
      // if the valueKey prop is not passed we return the whole item object
      if (!this.valueKey) return item;
      // else if the valueKey is a function we call the function and pass it the current item
      if (typeof this.valueKey === 'function') return this.valueKey(item);
      // else we return the value
      return item[this.valueKey];
    }

    textValue (item: any): string {
      // if text prop is null we try to guess the label column
      if (!this.textKey) {
        // if item is a string we just return it
        if (typeof item === 'string') return item;
        // else we take the first key of item as the column of label and we return its value
        let column: string = Object.keys(item)[0];
        return item[column];
      }
      // if the textKey prop is an function
      if (typeof this.textKey === 'function') return this.textKey(item);
      // then textKey is a string so we just return the value
      return item[this.textKey];
    }

    up () {
      // if the UP key is pressed we need to go up (ascend) ->
      // Remember that the UP KEY meant to ascend the list so ->
      // so we have to decrease our index
      if (this.index > 0) this.index--;
      this.scrollToItem();
    }

    down () {
      // if the DOWN key is pressed we need to go down (descend) ->
      // Remember that the DOWN KEY meant to descend the list so ->
      // so we have to increase our index
      if (this.index < this.items.length) this.index++;
      this.scrollToItem();
    }

    keyPressed (event: KeyboardEvent) {
      switch (event.key) {
        case ARROW_DOWN:
          return this.down();
        case ARROW_UP:
          return this.up();
        default:
      }
    }

    scrollToItem (): void {
      // This function we scroll to the current item
      let item: HTMLElement | Element | null = this.$el.getElementsByClassName('autocomplete-item-wrapper')[this.index];
      if (item && item.scrollIntoView) item.scrollIntoView(false);
    }

    close () {
      setTimeout(() => {
        this.opened = false;
      }, 200);
    }

    isActive (index: number) {
      // Determine if an item is active (the current item)
      return this.index === index;
    }

    submit () {
      this.$emit('input', this.selected);
      this.$emit('selected', this.selected);
      // update input value
      // let input: any = this.$refs['input'];
      // if (input) {
      //   input.value = this.textValue(this.selected);
      // }
      this.query = this.textValue(this.selected);
    }

    select (index: number) {
      this.index = index;
      this.submit();
    }

    // @Watch('query')
    onQuery (search: string) {
      this.query = search;
      this.$emit('search', search);
    }

    @Watch('search', { immediate: true })
    onSearch (search: string) {
      this.query = search;
    }
  }
</script>
<style lang="scss">
  .autocomplete {
    .autocomplete-items-container {
      position: relative;
    }

    .autocomplete-input {
      -webkit-font-smoothing: antialiased;
      box-sizing: inherit;
      border-style: solid;
      margin: 0;
      overflow: visible;
      color: black;
      outline-offset: -2px;
      /*font-weight: 700;*/
      transition: all 280ms ease-in-out;
      background-color: #edf2f7;
      /*box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);*/
      border-width: 1px;
      border-color: transparent;
      font-size: 0.875rem;
      /*border-radius: 0.5rem;*/
      padding: 0.5rem 1rem;
      display: block;
      width: 100%;
      -webkit-appearance: none;
      line-height: 1.5;

      &:focus {
        outline: none;
        background-color: white;
        border: 2px solid #edf2f7;
      }
    }

    .autocomplete-items {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      height: 250px;
      overflow-y: auto;
      background-color: white;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      border-bottom-right-radius: 0.25rem;
      border-bottom-left-radius: 0.25rem;

      .autocomplete-item {
        padding: 15px;
        display: block;
        border-bottom: 1px solid #ededed;
        cursor: pointer;
        transition: all 300ms;

        &:hover {
          background-color: #edf2f7;
        }

        &.active {
          background-color: #4c51bf;
          color: white;
          font-weight: 700;
        }
      }
    }
  }
</style>
