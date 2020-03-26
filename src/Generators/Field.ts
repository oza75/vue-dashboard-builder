import { Components, RenderFunction, RenderFunctions } from "./type";
import { Rule } from './Rules';
import Rules from './Rules';

export default abstract class Field {
  protected column: string;
  protected title?: string;
  public components: Components = { edit: '', show: '', index: '' };
  protected _sortable: boolean = true;
  protected props: any = {};
  protected _canEdit: boolean = true;
  protected _rules: Array<[Rule, any?]> = [];
  protected render_functions: RenderFunctions = {
    render_in_table: [],
    render_edit: [],
    render_show: []
  };
  protected visibleIn: any = {
    index: true,
    show: true,
    edit: true
  };

  constructor (column: string, title?: string) {
    this.column = column;
    this.title = title || column;
  }

  view (type: string, value: any, item: any) {
    return this.render_functions[type].reduce((acc: any, f: RenderFunction) => {
      acc = f(acc, item);
      return acc;
    }, value);
  }

  renderInTable (f: RenderFunction): this {
    return this.yield("render_in_table", f);
  }

  renderShow (f: RenderFunction): this {
    return this.yield("render_show", f);
  }

  renderEdit (f: RenderFunction): this {
    return this.yield("render_edit", f);
  }

  yield (type: string, f: RenderFunction): this {
    this.render_functions[type].push(f);

    return this;
  }

  render (f: RenderFunction): this {
    this.renderInTable(f);
    this.renderShow(f);
    this.renderEdit(f);

    return this;
  }

  getColumn () {
    return this.column;
  }

  sortable (sortable: boolean = true): this {
    this._sortable = sortable;
    return this;
  }

  isSortable () {
    return this._sortable;
  }

  hideInIndex (): this {
    return this.hideIn('index');
  }

  hideInShow (): this {
    return this.hideIn('show');
  }

  hideInEdit (): this {
    return this.hideIn('edit');
  }

  hideIn (type: string): this {
    this.visibleIn[type] = false;
    return this;
  }

  onlyInIndex (): this {
    this.hideInEdit();
    this.hideInShow();

    return this;
  }

  onlyInShow (): this {
    this.hideInIndex();
    this.hideInEdit();

    return this;
  }

  onlyInEdit (): this {
    this.hideInShow();
    this.hideInIndex();

    return this;
  }

  isVisible (type: string): boolean {
    return this.visibleIn[type] || false;
  }

  getProps (): any {
    return this.props;
  }

  addProp (name: string, value: any): this {
    this.props[name] = value;
    return this;
  }

  disableEdition (): this {
    this._canEdit = false;
    return this;
  }

  activeEdition (): this {
    this._canEdit = true;
    return this;
  }

  editable (): boolean {
    return this._canEdit;
  }

  getTitle (): string {
    return this.title || this.column;
  }

  rules (rules: (Rule | (Rule | any)[] | string)[]): this {
    rules.forEach((rule: any) => {
      let params: any = null;
      if (typeof rule === "object") {
        params = rule[1];
        rule = rule[0];
      }

      if (typeof rule == 'string') {
        rule = Rules[rule] ? Rules[rule] : null;
      }

      if (rule) {
        let formatted = params !== null ? (typeof params === "object" ? params : [params]) : [];
        this._rules.push([rule as Rule, formatted]);
        if ((rule as Function).name) {
          this.addProp((rule as Function).name, params !== null ? params : true);
        }
      }
    });

    return this;
  }

  getRules (): Array<[Rule, any?]> {
    return this._rules;
  }
}
