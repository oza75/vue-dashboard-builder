export declare const ruleMessages: {
    en: {
        required: string;
        min: {
            'numeric': string;
            'string': string;
            'array': string;
        };
        max: {
            'numeric': string;
            'string': string;
            'array': string;
        };
    };
    fr: {
        required: string;
        min: {
            'numeric': string;
            'string': string;
            'array': string;
        };
        max: {
            'numeric': string;
            'string': string;
            'array': string;
        };
    };
};
declare class Messages {
    private messages;
    private locale;
    constructor(messages: any);
    add(locale: string, key: string, value: string): void;
    getMessage(key: string, params?: {
        [key: string]: any;
    }, type?: string): string | false;
}
declare const RuleMessages: Messages;
export default RuleMessages;
