const Koa = require('koa');
// 配置文件
require('./config');
const installMid = require('./middlewares/install');
const installRoutes = require('./routes/install');
const installModels = require('./models/install');

runApp();

async function runApp() {
  const app = new Koa();
  installMid(app); // 安装中间件
  installRoutes(app); // 安装路由
  await installModels(); // 安装数据模型
  const config = globalConfig;
  app.listen(config.app.port, () => {
    console.log(`listen on : ${config.app.port}`);
  });
}
