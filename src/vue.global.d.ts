import Vue from 'vue';
import { Admin } from './types';

declare module 'vue/types/vue' {

  interface Vue {
    $admin: Admin
  }
}
