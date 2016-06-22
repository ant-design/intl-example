module.exports = function (config) {
  return Object.assign({}, config, {
    middleware: {
      pre: ['summary'],
      process: ['youdao?langs[]=en,langs[]=cn,default=cn', 'reduce?local=locales'],
      emit: ['save?dest=locales'],
    },
  });
};
