import MetaInfoManager from '@application/managers/generic/MetaInfoManager';

export default class DetailManager {
  constructor() {
    this.metaInfoManager = new MetaInfoManager();
  }

  async getMetaInfoByTitle(title = '') {
    return await this.metaInfoManager.getMetaInfoByTitle(title).then(async result => {
      const basepath = result.basepath;
      console.log('fjakjfskjsafk', result);
      const elem = Object.keys(result.items)[0];
      if (elem == null) return '';
      const url = await (basepath + result.items[elem].url || '');
      const image = await (result.items[elem].thumbnail || '');
      const abstract = await (result.items[elem].abstract || '');
      return { url, image, abstract };
    });
  }
}
