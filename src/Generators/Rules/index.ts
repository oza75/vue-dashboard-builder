export interface Rule {
  (value: string | number | object | Array<any>, params?: any, el?: HTMLElement): boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const required: Rule = function (value, params?: any, el?: HTMLElement | undefined): boolean {
  return !!value;
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const min: Rule = function (value: any, params: number, element?: HTMLElement) {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    return value.length >= params;
  }
  return parsed >= params;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const max: Rule = function (value: any, params: number, element?: HTMLElement) {
  const parsed = parseFloat(value);
  if (isNaN(parsed)) {
    return value.length <= params;
  }
  return parsed <= params;
};
const rules: any = { required, min, max };

export default rules;
