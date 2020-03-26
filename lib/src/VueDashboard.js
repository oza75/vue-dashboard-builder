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
function install(Vue, options) {
    // @ts-ignore
    if (install.installed)
        return;
    // @ts-ignore
    install.installed = true;
    // registering routes
    let config = Object.assign(DefaultConfig, options.config);
    let prefix = '/' + config.prefix;
    let entities = options.entities || [];
    if (config.getAuthorizationHeader()) {
        axios.defaults.headers['Authorization'] = config.getAuthorizationHeader();
    }
    const addRoute = (path, component, name, props, children, beforeEnter) => {
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
        ], (to, from, next) => {
            if (config.isLogged && config.isLogged()) {
                next();
            }
            else if (config.loginForm) {
                next(prefix + '/login?redirect_to=' + to.fullPath);
            }
            else
                next();
        })
    ]);
    // const cmp: any = {
    //   'show-file': FileShow,
    //   'edit-file': FileEdit,
    //   'edit-boolean': BooleanEdit,
    //   'show-boolean': BooleanShow,
    //   'table-show-boolean': BooleanTableShow,
    //   'show-text': TextShow,
    //   'table-show-text': TextTableShow,
    //   'edit-text': TextEdit,
    //   'edit-date': DateEdit,
    //   'show-date': DateShow,
    //   'table-show-date': DateTableShow,
    //   'edit-image': ImageEdit,
    //   'show-image': ImageShow,
    //   'table-show-image': ImageTableShow,
    //   'edit-radio': RadioEdit,
    //   'show-radio': RadioShow,
    //   'table-show-radio': RadioTableShow,
    //   'edit-select': SelectEdit,
    //   'show-select': SelectShow,
    //   'table-show-select': SelectTableShow
    //   // 'edit-number': NumberEdit,
    //   // 'show-number': NumberShow,
    //   // 'table-show-number': NumberTableShow
    // };
    // Object.keys(cmp).forEach(k => {
    //   Vue.component(`dashboard-${k}-field`, cmp[k]);
    // });
    // Vue.component('dashboard-sidebar', () => import(('./Components/Sidebar.vue')));
    // Vue.component('dashboard-edit-textarea-field', () => import((`./Components/Fields/Textarea/EditTextarea.vue`)));
    // Vue.component('dashboard-edit-trix-field', () => import((`./Components/Fields/Trix/EditTrixField.vue`)));
    // Vue.component('dashboard-edit-file-field', () => import('./Components/Fields/File/FileEdit.vue'));
    // Vue.component('dashboard-show-file-field', () => import('./Components/Fields/File/FileShow.vue'));
    // Vue.component('dashboard-show-boolean-field', () => import('./Components/Fields/Boolean/BooleanShow.vue'));
    // Vue.component('dashboard-table-show-boolean-field', () => import('./Components/Fields/Boolean/BooleanTableShow.vue'));
    // Vue.component('dashboard-table-show-text-field', () => import('./Components/Fields/Text/TextTableShow.vue'));
    // Vue.component('dashboard-show-text-field', () => import('./Components/Fields/Text/TextShow.vue'));
    // Vue.component('dashboard-edit-text-field', () => import('./Components/Fields/Text/TextEdit.vue'));
    // Vue.component('dashboard-edit-date-field', () => import('./Components/Fields/DateTime/DateTimeEdit.vue'));
    // Vue.component('dashboard-show-date-field', () => import('./Components/Fields/DateTime/DateTimeShow.vue'));
    // Vue.component('dashboard-table-show-date-field', () => import('./Components/Fields/DateTime/DateTimeTableShow.vue'));
    // Vue.component('dashboard-show-image-field', () => import('./Components/Fields/Image/ImageShow.vue'));
    // Vue.component('dashboard-edit-image-field', () => import('./Components/Fields/Image/ImageEdit.vue'));
    // Vue.component('dashboard-table-show-image-field', () => import('./Components/Fields/Image/ImageTableShow.vue'));
    // Vue.component('dashboard-edit-radio-field', () => import('./Components/Fields/Radio/RadioEdit.vue'));
    // Vue.component('dashboard-show-radio-field', () => import('./Components/Fields/Radio/RadioShow.vue'));
    // Vue.component('dashboard-table-show-radio-field', () => import('./Components/Fields/Radio/RadioTableShow.vue'));
    // Vue.component('dashboard-edit-select-field', () => import('./Components/Fields/Select/SelectEdit.vue'));
    // Vue.component('dashboard-show-select-field', () => import('./Components/Fields/Select/SelectShow.vue'));
    // Vue.component('dashboard-table-show-select-field', () => import('./Components/Fields/Select/SelectTableShow.vue'));
    // Vue.component('dashboard-checkbox', () => import((`./Components/VCheckBox.vue`)));
    // Vue.component('dashboard-select', () => import((`./Components/VSelect.vue`)));
    // Vue.component('dashboard-input', () => import((`./Components/VInput.vue`)));
    // Vue.component('dashboard-index-table', () => import((`./Components/IndexTable.vue`)));
    // Vue.component('dashboard-login-page', () => import((`./Pages/Login.vue`)));
    // Vue.component('dashboard-modal', () => import((`./Components/Modal.vue`)));
    // Vue.component('dashboard-has-many', () => import((`./Components/HasManyComponent.vue`)));
    // Vue.component('dashboard-home', () => import((`./Pages/Home.vue`)));
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
        resolveUrl: (location) => {
            return typeof location === 'string' ? prefix + location : options.router.resolve(location);
        },
        responseResolver: (entity) => {
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
        translate: (key, params = {}) => {
            let language = config.language || navigator.language;
            let defaultLanguage = config.defaultLanguage;
            let messages = config.translation[language] || {};
            let message = messages[key] || (config.translation[defaultLanguage] || {})[key] || key;
            return Object.keys(params).reduce((acc, k) => {
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
const VueDashboard = {
    install
};
export default VueDashboard;
