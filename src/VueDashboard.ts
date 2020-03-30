import { Vue as _Vue } from 'vue/types/vue';
import { Config } from './types';
import { NavigationGuard, RawLocation, Route, RouteConfig } from 'vue-router';
import axios from 'axios';
import DefaultConfig from './config';
import { handleError, pluralize, singular, stripHtml } from './utils';
import { AlertInstance } from './Components/Alert/AlertContainer';
import _confirm from './Components/Confirm/Confirm';
// import moment from 'moment';
// @ts-ignore
import ClickOutside from 'vue-click-outside';
import calendar from 'dayjs/plugin/calendar';
import relativeTime from 'dayjs/plugin/relativeTime';

import dayjs from 'dayjs';

dayjs.extend(relativeTime);
dayjs.extend(calendar);

function install (Vue: typeof _Vue, options: any) {
  // @ts-ignore
  if (install.installed) return;
  // @ts-ignore
  install.installed = true;

  // registering routes
  const config: Config = Object.assign(DefaultConfig, options.config);
  const prefix: string = '/' + config.prefix;
  const entities: Array<any> = options.entities || [];
  if (config.getAuthorizationHeader()) {
    axios.defaults.headers['Authorization'] = config.getAuthorizationHeader();
  }
  const addRoute: Function = (path: string, component: string, name?: string, props?: any, children?: Array<RouteConfig>, beforeEnter?: NavigationGuard): RouteConfig => {
    return {
      path: prefix + path,
      // component: () => import(/* webpackChunkName: "[request]" */ `./Pages/${component}.vue`),
      component: require(`./Pages/${component}.vue`).default,
      name,
      props,
      children,
      beforeEnter
    };
  };

  options.router.addRoutes([
    addRoute('/login', 'Login', 'dashboard.login'),
    addRoute('', 'Wrapper', 'dashboard.wrapper', {}, [
      addRoute('/home', 'Home', 'dashboard.home'),
      addRoute('/:name/:key/edit', 'Edit', 'dashboard.edit'),
      addRoute('/:name/create', 'Create', 'dashboard.create'),
      addRoute('/:name', 'Index', 'dashboard.index'),
      addRoute('/:name/:key', 'Show', 'dashboard.show')
    ], (to: Route, from: Route, next: any) => {
      if (config.isLogged && config.isLogged()) {
        next();
      } else if (config.loginForm) {
        next(prefix + '/login?redirect_to=' + to.fullPath);
      } else next();
    })
  ]);

  Vue.component('dashboard-sidebar', require('./Components/Sidebar.vue').default);
  Vue.component('dashboard-edit-textarea-field', require(`./Components/Fields/Textarea/EditTextarea.vue`).default);
  Vue.component('dashboard-edit-trix-field', require(`./Components/Fields/Trix/EditTrixField.vue`).default);
  Vue.component('dashboard-edit-file-field', require('./Components/Fields/File/FileEdit.vue').default);
  Vue.component('dashboard-show-file-field', require('./Components/Fields/File/FileShow.vue').default);
  Vue.component('dashboard-show-boolean-field', require('./Components/Fields/Boolean/BooleanShow.vue').default);
  Vue.component('dashboard-table-show-boolean-field', require('./Components/Fields/Boolean/BooleanTableShow.vue').default);
  Vue.component('dashboard-table-show-text-field', require('./Components/Fields/Text/TextTableShow.vue').default);
  Vue.component('dashboard-show-text-field', require('./Components/Fields/Text/TextShow.vue').default);
  Vue.component('dashboard-edit-text-field', require('./Components/Fields/Text/TextEdit.vue').default);
  Vue.component('dashboard-edit-date-field', require('./Components/Fields/DateTime/DateTimeEdit.vue').default);
  Vue.component('dashboard-show-date-field', require('./Components/Fields/DateTime/DateTimeShow.vue').default);
  Vue.component('dashboard-table-show-date-field', require('./Components/Fields/DateTime/DateTimeTableShow.vue').default);
  Vue.component('dashboard-show-image-field', require('./Components/Fields/Image/ImageShow.vue').default);
  Vue.component('dashboard-edit-image-field', require('./Components/Fields/Image/ImageEdit.vue').default);
  Vue.component('dashboard-table-show-image-field', require('./Components/Fields/Image/ImageTableShow.vue').default);
  Vue.component('dashboard-edit-radio-field', require('./Components/Fields/Radio/RadioEdit.vue').default);
  Vue.component('dashboard-show-radio-field', require('./Components/Fields/Radio/RadioShow.vue').default);
  Vue.component('dashboard-table-show-radio-field', require('./Components/Fields/Radio/RadioTableShow.vue').default);
  Vue.component('dashboard-edit-select-field', require('./Components/Fields/Select/SelectEdit.vue').default);
  Vue.component('dashboard-show-select-field', require('./Components/Fields/Select/SelectShow.vue').default);
  Vue.component('dashboard-table-show-select-field', require('./Components/Fields/Select/SelectTableShow.vue').default);
  Vue.component('dashboard-checkbox', require(`./Components/VCheckBox.vue`).default);
  Vue.component('dashboard-select', require(`./Components/VSelect.vue`).default);
  Vue.component('dashboard-input', require(`./Components/VInput.vue`).default);
  Vue.component('dashboard-index-table', require(`./Components/IndexTable.vue`).default);
  Vue.component('dashboard-login-page', require(`./Pages/Login.vue`).default);
  Vue.component('dashboard-modal', require(`./Components/Modal.vue`).default);
  Vue.component('dashboard-has-many', require(`./Components/HasManyComponent.vue`).default);
  Vue.component('dashboard-home', require(`./Pages/Home.vue`).default);
  // Directives
  Vue.directive('click-outside', ClickOutside);
  Vue.prototype.$admin = {
    entities,
    config,
    axios,
    resolveUrl: (location: RawLocation): string => {
      return typeof location === 'string' ? prefix + location : options.router.resolve(location);
    },
    responseResolver: (entity: any) => {
      return entity.responseResolver || config.responseResolver;
    },
    logout: function () {
      window.localStorage.removeItem(config.accessToken);
      window.location.reload();
    },
    isLogged: function () {
      return config.isLogged && config.isLogged();
    },
    handleError,
    alert: AlertInstance,
    confirm: _confirm,
    dayjs: dayjs,
    translate: (key: string, params: any = {}) => {
      const language = config.language || navigator.language;
      const defaultLanguage = config.defaultLanguage;
      const messages = config.translation[language] || {};
      const message: string = messages[key] || (config.translation[defaultLanguage] || {})[key] || key;
      return Object.keys(params).reduce((acc: string, k: string) => {
        acc = acc.replace(new RegExp(':' + k, 'gm'), params[k]);
        return acc;
      }, message);
    },
    helpers: {
      singular,
      pluralize,
      stripHtml
    }
  };
}

const VueDashboard: any = {
  install
};

export default VueDashboard;
