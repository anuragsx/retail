import { ElectronAppPage } from './app.po';

describe('electron-app App', () => {
  let page: ElectronAppPage;

  beforeEach(() => {
    page = new ElectronAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
