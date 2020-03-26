import Vue from 'vue';
import { Admin } from './src/types';

declare module 'vue/types/vue' {

  interface Vue {
    $admin: Admin
  }
}
