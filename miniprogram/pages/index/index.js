//index.js
const app = getApp()
const db = wx.cloud.database();
const admin = db.collection('user');//数据库里面集合名字
var total;//当前工作数量
var result;//存放返回的5个工作内容
var title;
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
        app.globalData.accountInfo=res.result.data[0];
        console.log("当前用户的账号信息已存入全局变量,信息如下:");
        console.log(app.globalData.accountInfo);
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
            result=res.result.data;
            console.log(result);
            this.setData({
              result:result.reverse()
            })
            app.globalData.job1 = res.result.data[0];
            app.globalData.job2 = res.result.data[1];
            app.globalData.job3 = res.result.data[2];
            app.globalData.job4 = res.result.data[3];
            app.globalData.job5 = res.result.data[4];
            //console.log("全局工作变量"+app.globalData.job1['title']);
            
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
  0:function(){
    app.globalData.job = app.globalData.job1;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  1: function () {
    app.globalData.job = app.globalData.job2;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  2: function () {
    app.globalData.job = app.globalData.job3;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  3: function () {
    app.globalData.job = app.globalData.job4;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },
  4: function () {
    app.globalData.job = app.globalData.job5;
    wx.navigateTo({
      url: '/pages/work1/work1',
    })
  },


})