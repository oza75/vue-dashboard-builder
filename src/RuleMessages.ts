export const ruleMessages = {
  en: {
    required: 'This field is required',
    min: {
      'numeric': 'The value of this field must be greater than :0 .',
      'string': 'The value of this field must be greater than :0 characters.',
      'array': 'The value of this field must have more than :0 items.'
    },
    max: {
      'numeric': 'The value of this field must be less than :0 .',
      'string': 'The value of this field must be less than :0 characters.',
      'array': 'The value of this field must not have more than :0 items.'
    }
  },
  fr: {
    required: 'Ce champ est réquis',
    min: {
      'numeric': 'La valeur de ce champ doit être supérieure à :0 .',
      'string': 'Le texte  doit contenir plus de :0 caractères.',
      'array': 'Le tableau doit contenir plus de :0 éléments.'
    },
    max: {
      'numeric': 'La valeur de ce champ doit être inférieure à :0 .',
      'string': 'Le texte  ne peut contenir plus de :0 caractères.',
      'array': 'Le tableau ne peut contenir plus de :0 éléments.'
    }
  }
};

class Messages {
  private messages: any;
  private locale: string = 'en';

  constructor (messages: any) {
    this.messages = messages;
    this.locale = navigator.language;
  }

  add (locale: string, key: string, value: string) {
    this.messages[locale] = this.messages[locale] || {};
    this.messages[locale][key] = value;
  }

  getMessage (key: string, params: { [key: string]: any } = {}, type?: string) {
    let value: string = this.messages[this.locale][key] || this.messages['en'][key];
    if (!value) return false;
    if (typeof value === 'object') {
      value = type ? value[type] : value[Object.keys(value)[0]];
    }
    Object.keys(params).forEach(function (key) {
      const rgx: RegExp = new RegExp(`:${key}`);
      value = value.replace(rgx, params[key]);
    });

    return value;
  }
}

const RuleMessages = new Messages(ruleMessages);

export default RuleMessages;
