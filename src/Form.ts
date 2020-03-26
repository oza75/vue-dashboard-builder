import { DASHBOARD_IMAGE_KEY_PREFIX } from './utils';

class Form {
  data: any = {};

  constructor (data: any) {
    this.data = data;
  }

  append (key: string, value: any): void {
    this.data[key] = value;
  }

  delete (key: string): void {
    delete this.data[key];
  }

  get (key: string): any {
    return this.data[key];
  }

  keys (): Array<string> {
    return Object.keys(this.data);
  }

  entries (): [string, unknown][] {
    return Object.entries(this.data);
  }

  toFormData (): FormData {
    let f: FormData = new FormData();
    let rgx: RegExp = new RegExp(DASHBOARD_IMAGE_KEY_PREFIX + '(.*)');
    Object.keys(this.data).forEach(k => {
      let tag = k.match(rgx);
      if (tag) {
        let key: string = tag[1];
        this.data[key] = this.data[k];
        delete this.data[k];
      }
    });

    Object.keys(this.data).forEach(k => {
      this.addToFormData(f, k, this.data[k]);
    });
    return f;
  }

  toObject () {
    let f: FormData = this.toFormData();
    let obj: any = {};
    f.forEach((value, key) => {
      obj[key] = value;
    });
    return obj;
  }

  private addToFormData (f: FormData, key: string, value: any) {
    if (typeof value === 'object' && value !== null && value !== undefined) {
      if (value instanceof File) {
        f.append(key, value);
      } else {
        Object.keys(value).forEach(k => {
          if (value.hasOwnProperty(k)) {
            this.addToFormData(f, `${key}[${k}]`, value[k]);
          }
        });
      }
    } else {
      f.append(key, value);
    }
  }
}

export default Form;
