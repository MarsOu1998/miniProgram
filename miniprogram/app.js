  //app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'part-time-job-yw301',
        traceUser: true,
      })
    }

    this.globalData = {
      accountInfo:"",
      //从登录页面或注册页面输入的账号，便于进入首页后从数据库中查找账号信息
      userNameGlobal:"",
      //存放首页中显示的5个最新工作
      job:"",
      job1:"",
      job2: "",
      job3: "",
      job4: "",
      job5: "",
      jobSearh:"",//存放查找工作关键字
      page:0,//分页,
      users:"",//存放用户组
    }
  }
})
