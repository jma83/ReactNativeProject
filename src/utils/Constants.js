const dbConfig = {
  name: 'rickpedia.db',
  version: '1.0',
  description: '',
  size: 1
};

const regexContentName = '(.*)+(.*\\()';
const regexUrlContentId = '[^/]*$';

export { dbConfig, regexContentName, regexUrlContentId };
