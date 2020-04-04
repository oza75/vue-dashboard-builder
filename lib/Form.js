import { DASHBOARD_IMAGE_KEY_PREFIX } from './utils';
class Form {
    constructor(data) {
        this.data = {};
        this.data = data;
    }
    append(key, value) {
        this.data[key] = value;
    }
    delete(key) {
        delete this.data[key];
    }
    get(key) {
        return this.data[key];
    }
    keys() {
        return Object.keys(this.data);
    }
    entries() {
        return Object.entries(this.data);
    }
    toFormData() {
        const f = new FormData();
        const rgx = new RegExp(DASHBOARD_IMAGE_KEY_PREFIX + '(.*)');
        Object.keys(this.data).forEach(k => {
            const tag = k.match(rgx);
            if (tag) {
                const key = tag[1];
                this.data[key] = this.data[k];
                delete this.data[k];
            }
        });
        Object.keys(this.data).forEach(k => {
            this.addToFormData(f, k, this.data[k]);
        });
        return f;
    }
    toObject() {
        const f = this.toFormData();
        const obj = {};
        f.forEach((value, key) => {
            obj[key] = value;
        });
        return obj;
    }
    addToFormData(f, key, value) {
        if (typeof value === 'object' && value !== null && value !== undefined) {
            if (value instanceof File) {
                f.append(key, value);
            }
            else {
                Object.keys(value).forEach(k => {
                    if (value.hasOwnProperty(k)) {
                        this.addToFormData(f, `${key}[${k}]`, value[k]);
                    }
                });
            }
        }
        else {
            f.append(key, value);
        }
    }
}
export default Form;
