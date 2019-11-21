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
     
      userNameGlobal:"用户名加载中....",
      nickName:"用户昵称加载中....",
      sign:"用户签名加载中....",
      tel:"用户手机号加载中....",
      touxiang:"",
      id123:"", //数据库自动分配的_id
      bflag:""//是否为商家
    }
  }
})
