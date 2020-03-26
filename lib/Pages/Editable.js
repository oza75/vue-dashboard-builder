import { __decorate } from "tslib";
import { Component, Provide, Vue } from 'vue-property-decorator';
import EditComponent from '../Components/Edit.vue';
let Editable = class Editable extends Vue {
    constructor() {
        super(...arguments);
        this.entity = null;
        this.datum = null;
        this.formData = {};
        this.errors = [];
    }
    get hasErrors() {
        return Object.keys(this.errors).length > 0;
    }
    addError(component) {
        if (this.errors.find(item => item._uid === component._uid))
            return;
        this.errors.push(component);
    }
    removeError(component) {
        // @ts-ignore
        let index = this.errors.find(item => item._uid === component._uid);
        if (index)
            this.errors.splice(index, 1);
    }
    get fields() {
        return this.entity.fields().filter((f) => f.isVisible('edit'));
    }
    get allRelations() {
        return this.entity.relations();
    }
    get singleValueRelations() {
        return this.allRelations.filter(r => r.hasSingleValue());
    }
    get relations() {
        return this.allRelations.filter(r => !r.hasSingleValue());
    }
    get allFields() {
        let items = this.fields;
        this.singleValueRelations.forEach(r => {
            if (r.getPosition() <= 0)
                items.unshift(r);
            else if (r.getPosition() >= this.fields.length)
                items.push(r);
            else
                items.splice(r.getPosition(), 0, r);
        });
        return items;
    }
    input(key, value) {
        this.$set(this.formData, key, value);
    }
    routeChanged(route) {
        let entity = this.$admin.entities.find(entity => entity.name === route.params.name);
        if (!entity) {
            this.$router.push(this.$admin.resolveUrl('/'));
        }
        this.entity = entity;
        this.datum = null;
    }
};
__decorate([
    Provide()
], Editable.prototype, "formData", void 0);
Editable = __decorate([
    Component({ components: { EditComponent } })
], Editable);
export default Editable;
