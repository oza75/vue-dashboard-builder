// import FakeField from '../FakeField';
// import Field from '../../Field';
//
// const factory = () => {
//   return new FakeField('fake', 'Fake Title')
// };
//
// const checkVisibility = (f: Field, index: boolean, show: boolean, edit: boolean) => {
//   expect(f.isVisible('index')).toBe(index);
//   expect(f.isVisible('show')).toBe(show);
//   expect(f.isVisible('edit')).toBe(edit);
// };
//
// describe('Field', () => {
//   it('has correct title', () => {
//     expect(factory().getTitle()).toBe('Fake Title')
//   });
//
//   it('take column name as title if no title was specified', () => {
//     let f = new FakeField('fake');
//     expect(f.getTitle()).toBe('fake');
//   });
//
//   it('has correct column', () => {
//     expect(factory().getColumn()).toBe('fake');
//   });
//
//   it('is sortable', () => {
//     let f = factory().sortable();
//     expect(f.isSortable()).toBe(true);
//   });
//   it('is hidden in index', () => {
//     let f = factory().hideInIndex();
//     checkVisibility(f, false, true, true);
//   });
//   it('is hidden in show', () => {
//     let f = factory().hideInShow();
//     checkVisibility(f, true, false, true);
//   });
//   it('is hidden in edit', () => {
//     let f = factory().hideInEdit();
//     checkVisibility(f, true, true, false);
//   });
//   it('is only visible in index', () => {
//     let f = factory().onlyInIndex();
//     checkVisibility(f, true, false, false);
//   });
//   it('is only visible in show', () => {
//     let f = factory().onlyInShow();
//     checkVisibility(f, false, true, false);
//   });
//   it('is only visible in edit', () => {
//     let f = factory().onlyInEdit();
//     checkVisibility(f, false, false, true);
//   });
//   it('can add correctly a prop', () => {
//     let f = factory().addProp('test', 'test');
//     expect(Object.keys(f.getProps()).length).toBe(1);
//     expect(Object.keys(f.getProps()).includes('test')).toBeTruthy();
//     expect(f.getProps()['test']).toBe('test');
//   });
//   it('can add renderInTable function', () => {
//     let f = factory().renderInTable(value => value * 2);
//     expect(f.view('render_in_table', 2, {})).toBe(4);
//   });
//   it('can add renderShow function', () => {
//     let f = factory().renderShow(value => value * 2);
//     expect(f.view('render_show', 2, {})).toBe(4);
//   });
//   it('can add renderEdit function', () => {
//     let f = factory().renderEdit(value => value * 2);
//     expect(f.view('render_edit', 2, {})).toBe(4);
//   });
//   it('can disable edition', () => {
//     let f = factory().disableEdition();
//     expect(f.editable()).toBeFalsy();
//   });
//   it('can reactivate edition', () => {
//     let f = factory().disableEdition();
//     f.activeEdition();
//     expect(f.editable()).toBeTruthy();
//   })
// });
