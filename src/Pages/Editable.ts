import { Component, Provide, Vue, Watch } from 'vue-property-decorator';
import { Route } from 'vue-router';
import EditComponent from '../Components/Edit.vue';

@Component({ components: { EditComponent } })
class Editable extends Vue {
  entity: any = null;
  datum: any = null;
  @Provide() formData: any = {};
  errors: any[] = [];

  get hasErrors () {
    return Object.keys(this.errors).length > 0;
  }

  addError (component: any) {
    if (this.errors.find(item => item._uid === component._uid)) return;
    this.errors.push(component);
  }

  removeError (component: any) {
    // @ts-ignore
    let index = this.errors.find(item => item._uid === component._uid);
    if (index) this.errors.splice(index, 1);
  }

  get fields (): Array<any> {
    return this.entity.fields().filter((f: any) => f.isVisible('edit'));
  }

  get allRelations (): Array<any> {
    return this.entity.relations();
  }

  get singleValueRelations (): Array<any> {
    return this.allRelations.filter(r => r.hasSingleValue());
  }

  get relations (): Array<any> {
    return this.allRelations.filter(r => !r.hasSingleValue());
  }

  get allFields (): Array<any> {
    let items = this.fields;
    this.singleValueRelations.forEach(r => {
      if (r.getPosition() <= 0) items.unshift(r);
      else if (r.getPosition() >= this.fields.length) items.push(r);
      else items.splice(r.getPosition(), 0, r);
    });

    return items;
  }

  input (key: string, value: string) {
    this.$set(this.formData, key, value);
  }

  routeChanged (route: Route) {
    let entity = this.$admin.entities.find(entity => entity.name === route.params.name);
    if (!entity) {
      this.$router.push(this.$admin.resolveUrl('/'));
    }
    this.entity = entity;
    this.datum = null;
  }
}

export default Editable;
