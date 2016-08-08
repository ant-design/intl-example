module.exports = {
  middlewares: {
    summary: ['summary'],
    process: ['fetchLocal', 'metaToResult', 'gugu', 'reduce'],
    emit: ['save'],
  },
};
