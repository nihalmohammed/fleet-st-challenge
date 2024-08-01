const repositories = require('../src/repositories/routes');

module.exports = (app) => {
  app.use('/repositories', repositories);
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
