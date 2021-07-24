export default class ContentManager {
  constructor() {
    this.pages = -1;
  }

  setPages(pages = 0) {
    this.pages = pages;
  }

  getPages() {
    return this.pages;
  }
}
