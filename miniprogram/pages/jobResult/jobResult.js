var app=getApp();
var result;//存储数据库中返回的结果
var resultShow;//负责在前端页面上面显示结果集
var count=0;//统计获取到的工作数量
var page=0;
var indexPage;//首页
var nextPage;//下一页
var lastPage;//上一页
// pages/jobResult/jobResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    page:0
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
    var that=this;
    wx.cloud.callFunction({
      name: 'searchJob',
      data: {
        query:app.globalData.jobSearch,
        count:0
      },
      success: function (res) {
        console.log("当前工作关键词为:"+app.globalData.jobSearch);
        console.log("工作搜索结果如下:");
        result=res.result.data;
        console.log(result);
        count=result.length;
        console.log("工作搜索结果数量:"+count);
        if(count>5){
          nextPage = true;
          that.setData({
            nextPage
          })
        }
        wx.cloud.callFunction({
          name:'searchJob',
          data:{
            query:app.globalData.jobSearch,
            count:count,
            page:page
          },
          success:function(res){
            console.log("二次调用云函数查找工作:");
            result = res.result.data;
            console.log(result);
            console.log("第二次工作搜索结果数量:" + result.length);
            //把当前结果存入全局变量，便于页面切换也不会丢失结果
            app.globalData.job1 = result[0];
            app.globalData.job2 = result[1];
            app.globalData.job3 = result[2];
            app.globalData.job4 = result[3];
            app.globalData.job5 = result[4];               that.setData({
              result
            })
            
          }          
        })
        

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
  0: function () {
    app.globalData.job=app.globalData.job1;
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
  nextPage:function(){
    page+=5;
  }
})
