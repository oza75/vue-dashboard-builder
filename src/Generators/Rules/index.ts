export interface Rule {
  (value: string | number | object | Array<any>, params?: any, el?: HTMLElement): boolean
}

export const required: Rule = function (value, params?: any, el?: HTMLElement | undefined): boolean {
  return !!value;
};
export const min: Rule = function (value: any, params: number, element?: HTMLElement) {
  let parsed = parseFloat(value);
  if (isNaN(parsed)) {
    return value.length >= params;
  }
  return parsed >= params;
};
export const max: Rule = function (value: any, params: number, element?: HTMLElement) {
  let parsed = parseFloat(value);
  if (isNaN(parsed)) {
    return value.length <= params;
  }
  return parsed <= params;
};
const rules: any = { required, min, max };

export default rules;
