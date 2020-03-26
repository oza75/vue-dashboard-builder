// import FakeEntity from '../FakeEntity';
// import FakeField from '../FakeField';
//
// const factory = () => new FakeEntity();
// const fakeBaseUrl: string = 'https://fake.test';
// describe('Entity', () => {
//   it('has correct index query url', () => {
//     expect(factory().buildIndexUrl(fakeBaseUrl)).toBe(fakeBaseUrl + '/fake-url');
//   });
//   it('has correct show query url', () => {
//     expect(factory().buildShowUrl(fakeBaseUrl, '1')).toBe(fakeBaseUrl + '/fake-url/1');
//   });
//   it('has correct update query url', () => {
//     expect(factory().buildUpdateUrl(fakeBaseUrl, '1')).toBe(fakeBaseUrl + '/fake-url/1');
//   });
//   it('has correct create query url', () => {
//     expect(factory().buildCreateUrl(fakeBaseUrl)).toBe(fakeBaseUrl + '/fake-url');
//   });
//   it('has correct attach query url', () => {
//     expect(factory().buildAttachUrl(fakeBaseUrl)).toBe(fakeBaseUrl + '/fake-url/attach');
//   });
//   it('has correct detach query url', () => {
//     expect(factory().buildDetachUrl(fakeBaseUrl)).toBe(fakeBaseUrl + '/fake-url/detach');
//   });
//   it('has correct delete query url', () => {
//     expect(factory().buildDeleteUrl(fakeBaseUrl, '1')).toBe(fakeBaseUrl + '/fake-url/1');
//   });
//   it('has correct primary key', () => {
//     expect(factory().setPrimaryKey('id').getKey()).toBe('id');
//   });
//   it('take first field as  primary key if no primary key was specified', () => {
//     expect(factory().getKey()).toBe('test');
//   });
//   it('is searchable by default', () => {
//     expect(factory().isSearchable()).toBeTruthy();
//   });
//   it('can disable searchable', () => {
//     expect(factory().disableSearchable().isSearchable()).toBeFalsy();
//   });
//   it('has correct field', () => {
//     expect(factory().fields().length).toBe(1);
//     expect(factory().fields()[0]).toBeInstanceOf(FakeField);
//     expect(factory().fields()[0].getColumn()).toBe('test');
//   });
// });
