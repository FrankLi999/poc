import { MyDynamicFormsPage } from './app.po';

describe('my-dynamic-forms App', () => {
  let page: MyDynamicFormsPage;

  beforeEach(() => {
    page = new MyDynamicFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
