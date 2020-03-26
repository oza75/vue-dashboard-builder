import { AxiosError, AxiosInstance } from 'axios';
import { Confirm } from '../Components/Confirm/Confirm';
import { RawLocation } from 'vue-router';
import AlertContainer from '../Components/Alert/AlertContainer';
import dayjs from 'dayjs';
export interface Config {
    appName?: string;
    prefix: string;
    baseUrl?: string;
    resolveIcon: (icon: string) => string;
    responseResolver: ResponseResolver;
    icons: {
        edit: string;
        show: string;
        remove: string;
        play: string;
        loading: string;
        sort: string;
        sortUp: string;
        sortDown: string;
        [key: string]: string;
    };
    loginForm?: {
        title?: string;
        buttonText?: string;
        url: string;
        fields: Array<{
            label: string;
            name: string;
            type?: string;
        }>;
        retrieveAccessToken: (res: any) => string;
    };
    accessToken: string;
    isLogged?: () => boolean;
    getAuthorizationHeader: () => string | undefined;
    updateMethod?: string;
    [key: string]: any;
}
export interface SidebarLink {
    title: string;
    name: string;
    icon: string;
}
export interface ResponseResolver {
    data: (res: any) => any;
    meta: (res: any) => any;
}
export interface Admin {
    entities: Array<any>;
    config: Config;
    axios: AxiosInstance;
    resolveUrl: (location: RawLocation) => string;
    responseResolver: (entity: any) => ResponseResolver;
    isLogged: () => boolean;
    handleError: (reason: AxiosError) => any;
    confirm: Confirm;
    alert: AlertContainer;
    dayjs: (date?: dayjs.ConfigType, option?: dayjs.OptionType, locale?: string) => dayjs.Dayjs;
    translate: (key: string, params?: any) => string | null;
    logout: () => void;
    helpers: {
        singular: (value: string) => string;
        pluralize: (value: string) => string;
        stripHtml: (value: string) => string;
        [key: string]: Function;
    };
}
export interface ImageObject {
    src: string;
    alt: string;
    classes?: string;
    lazy: boolean;
    attributes?: {
        circle: boolean;
    };
    [key: string]: any;
}
