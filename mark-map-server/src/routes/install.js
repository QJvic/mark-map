const walkFolderSync = require('../utils/walkFolderSync');

module.exports = function (app) {
  walkFolderSync(__dirname, file => {
    if (file.endsWith('.route.js')) {
      const route = require(file);
      route.routes && app.use(route.routes());
    }
  });
};
