const path = require('path');
const Router = require('koa-router');
const multer = require('@koa/multer');
const router = new Router();
const mkdirsSync = require('../utils/mkdirsSync');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const datePath = getDatePath();
    const filePath = path.join(__dirname, '../../static/upload', datePath);
    console.log(filePath);
    mkdirsSync(filePath);
    cb(null, filePath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = new Date().valueOf();
    const randomStr = String(Math.floor(Math.random() * 99999));
    cb(null, uniqueSuffix + '-' + randomStr + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

router.post('/upload', upload.single('file'), ctx => {
  const datePath = getDatePath();
  const filePath = path.join('/static/upload/', datePath, ctx.file.filename);
  ctx.body = {
    path: globalConfig.app.serverUrl + filePath
  };
});

function getDatePath() {
  const date = new Date();
  const datePath = path.join(
    String(date.getFullYear()),
    String(date.getMonth() + 1),
    String(date.getDate())
  );
  return datePath;
}

module.exports = router;
