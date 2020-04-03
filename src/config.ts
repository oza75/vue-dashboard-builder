import { Config } from './types';

const config: Config = {
  prefix: 'dashboard',
  appName: 'Vue Dashboard',
  accessToken: 'dashboard_access_token',
  defaultLanguage: 'en',
  relationKey: 'with',
  loginForm: {
    title: 'Login',
    buttonText: 'Login',
    url: '/login',
    retrieveAccessToken: (res: any) => res.data.access_token,
    fields: [
      {
        label: 'Email',
        name: 'email',
        type: 'email'
      },
      {
        label: 'Password',
        name: 'password',
        type: 'password'
      }]
  },
  resolveIcon: (icon: string) => {
    if (!icon) return '';
    return `<i class="${icon}"></i>`;
  },
  getAuthorizationHeader () {
    // @ts-ignore
    const token: string = window.localStorage.getItem(this.accessToken);
    if (token) return 'Bearer ' + token;
  },
  icons: {
    edit: 'far fa-edit',
    show: 'far fa-eye',
    remove: 'far fa-trash-alt',
    play: 'fas fa-play',
    loading: 'fas fa-circle-notch fa-spin',
    sort: 'fas fa-sort',
    sortUp: 'fas fa-sort-up',
    sortDown: 'fas fa-sort-down',
    valid: 'fas fa-check-circle',
    nonValid: 'fas fa-times',
    emptyItems: 'far fa-list-alt',
    add: 'fas fa-plus'
  },
  responseResolver: {
    data: (res: any) => res.data,
    meta: (res: any) => res.meta
  },
  isLogged () {
    // @ts-ignore
    return !!window.localStorage.getItem(this.accessToken);
  },
  translation: {
    en: {
      search_in: 'Search in :title',
      create: 'Create a :title',
      show_details: ':title details',
      show_content: 'Show content',
      hide_content: 'Hide content',
      remove: 'Remove',
      edit: 'Edit',
      attach: 'Attach :title',
      detached: 'The record has been detached',
      deleted: 'this record has been deleted',
      cancel: 'Cancel',
      attach_btn: 'Attach',
      attach_and_attach_btn: 'Attach and attach another',
      are_you_sure_to_delete: 'Are you sure to delete this record',
      are_you_sure: 'Are you sure ?',
      are_you_sure_to_detach: 'Are you sure you want to detach this record ? ',
      empty_items: 'No :title matched the given criteria.',
      edit_title: 'Edit :title',
      add_a_new_image: 'Click to add new image',
      save: 'Save',
      saved_successfully: 'Your changes has been saved successfully',
      open_in_another_tab: 'Open in another tab'
    },
    fr: {
      search_in: 'Rechercher dans :title',
      create: 'Créer un :title',
      show_details: 'Détails :title',
      show_content: 'Afficher le contenu',
      hide_content: 'Masquer le contenu',
      remove: 'Supprimer',
      edit: 'Modifier',
      attach: 'Attacher :title',
      detached: 'Cet enregistrement à été détaché',
      deleted: 'Cet enregistrement à été supprimé',
      cancel: 'Annuler',
      attach_btn: 'Attacher',
      attach_and_attach_btn: 'Attacher et attacher un autre',
      are_you_sure_to_delete: 'Etes-vous sûr de vouloir supprimer cet enregistrement',
      are_you_sure: 'Etes-vous sûr ?',
      are_you_sure_to_detach: 'Etes-vous sûr de vouloir détacher cet enregistrement ? ',
      empty_items: 'Aucun :title ne correspond aux critères donnés.',
      edit_title: 'Modifier :title',
      add_a_new_image: 'Cliquer pour ajouter une image',
      save: 'Enregistrer',
      saved_successfully: 'Vos Modifications ont été enregistrées avec succès !',
      open_in_another_tab: 'Ouvrir dans un autre onglet'
    }
  }
};
export default config;
