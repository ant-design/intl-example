import * as fs from 'fs';
import {sync as globSync} from 'glob';
import {sync as mkdirpSync} from 'mkdirp';

const MESSAGES_PATTERN = './i18n-messages/**/*.json';
const LANG_PATTERN = './locale/*.js';
const LANG_DIR = './locale/';

// Aggregates the default messages that were extracted from the example app's
// React components via the React Intl Babel plugin. An error will be thrown if
// there are messages in different components that use the same `id`. The result
// is a flat collection of `id: message` pairs for the app's default locale.
const defaultMessages = globSync(MESSAGES_PATTERN)
    .map((filename) => fs.readFileSync(filename, 'utf8'))
    .map((file) => JSON.parse(file))
    .reduce((collection, descriptors) => {
      descriptors.forEach(({id, defaultMessage}) => {
        if (collection.hasOwnProperty(id)) {
          throw new Error(`Duplicate message id: ${id}`);
        }

        collection[id] = defaultMessage;
      });

      return collection;
    }, {});

// 获取目前系统中的语言包
const originLangs = {
  zh: {},
  en: {},
};
globSync(LANG_PATTERN)
  .map((filename) => {
    originLangs[filename.split('/').pop().split('.').shift()] = require('../' + filename);
  });

// 更新语言包
// 以编译出来的 key 为准，以默认语言为中文语言包
const defaultMessagesArr = Object.keys(defaultMessages).map((id) => [id, defaultMessages[id]]);
const newLangs = {};
newLangs.zh = defaultMessages;
newLangs.en = defaultMessagesArr.reduce((collection, [id]) => {
  collection[id] = originLangs.en[id] || '';
  return collection;
}, {});

mkdirpSync(LANG_DIR);

fs.writeFileSync(LANG_DIR + 'en.js',
`module.exports = ` +
JSON.stringify(newLangs.en, null, 2)
);

fs.writeFileSync(LANG_DIR + 'zh.js',
`// 该文件由脚本自动生成，请勿修改\n
module.exports = ` +
JSON.stringify(newLangs.zh, null, 2)
);
