//index.js
const app = getApp()
const db = wx.cloud.database();
const admin = db.collection('user');//数据库里面集合名字
var total;//当前工作数量
// 用来动态存放数据库中最后五个工作内容
var job1 = [];
var job2 = [];
var job3 = [];
var job4 = [];
var job5 = [];
Page({
  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 进入首页后获取用户昵称和个性签名
    wx.cloud.callFunction({
      name:'login1',
      data:{
        username: app.globalData.userNameGlobal
      },
      success:res=>{
        app.globalData.nickName = res.result.data[0].nickname;
        app.globalData.sign = res.result.data[0].sign;
        app.globalData.tel = res.result.data[0].telphone;
        app.globalData.id123 = res.result.data[0]._id;
        app.globalData.imageId = res.result.data[0].touxiang;
        app.globalData.bflag=res.result.data[0].shangjia;
      },
      fail:res=>{
        console.log("进入主页后数据查询失败");
        console.error;
      }

    }),
    wx.cloud.callFunction({
      name:'countJob',
      success:res=>{
        total = res.result.total;
        console.log("当前工作数量:" + total);
        wx.cloud.callFunction({
          name: 'getJob',
          data: {
            count: total
          },
          success: res => {
            console.log("当前工作数量:" + total);
            console.log("获取最后五条工作记录如下:");
            //console.log(res.result);
            job1=res.result.data[0];
            console.log(job1);
          },
          fail: res => {
            console.log("工作内容获取失败");
          }
        })
      },
      fail:res=>{
        console.log("计算工作数量失败");
      }
    })
    

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  },
  //跳转到工作页面
  work1:function(){
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  }
})