global.globalConfig = {
  app: {
    serverUrl: 'http://localhost:3000', // 【重要】后端服务地址，必须修改为正确url，否则上传图片和文件不能正确返回url
    port: 3000 // 后端服务端口
  },
  db: {
    // 系统登陆的默认账号名密码
    defaultUser: {
      username: 'root',
      password: '123@abcd'
    }
  },
  token: {
    privateKey: 'marker-map', // jwt的私钥
    expiresIn: '60 * 60 * 24 * 30' // jwt的过去时间，默认为一个月
  }
};
