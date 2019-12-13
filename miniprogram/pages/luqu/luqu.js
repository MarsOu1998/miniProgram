var app=getApp();
var luqu;//获取当前用户已被录取的工作id
var job=[];//用于前端页面显示当前用户已被录取的工作
// pages/luqu/luqu.js
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
    var that=this;
    app.globalData.job1=null;
    app.globalData.job2 = null;
    app.globalData.job3 = null;
    app.globalData.job4 = null;
    app.globalData.job5 = null;
    console.log("当前app.globalData.job1～5:");
    console.log(app.globalData.job1)
    console.log(app.globalData.job2)
    console.log(app.globalData.job3)
    console.log(app.globalData.job4)
    console.log(app.globalData.job5)

      luqu=app.globalData.accountInfo['luqu'];
      console.log("当前用户被录取的工作有:");
      console.log(luqu);
      //逐个从数组中取出工作id，获取其内容并显示在页面上
      if(luqu.length<=5){
      for(var i=0;i<luqu.length;i++){
        wx.cloud.callFunction({
          name:'searchJobById',
          data:{
            _id:luqu[i],
          }, 
          success:function(res){
            console.log("当前第"+i+"次获取工作内容为:");
            console.log(res.result.data[0]);
            if (app.globalData.job1==null){
            app.globalData.job1 = res.result.data[0];
              job.push(app.globalData.job1)
            }
            else if (app.globalData.job2 == null){
              app.globalData.job2 = res.result.data[0];
              job.push(app.globalData.job2)
            }
            else if (app.globalData.job3 == null){
              app.globalData.job3 = res.result.data[0];
              job.push(app.globalData.job3)
            }
            else if (app.globalData.job4 == null){
              app.globalData.job4 = res.result.data[0];
              job.push(app.globalData.job4)
            }
            else if (app.globalData.job5 == null){
              app.globalData.job5 = res.result.data[0];
              job.push(app.globalData.job5)
            }
            that.setData({
              job
            })
            console.log("当前app.globalData.job1～5:");
            console.log(app.globalData.job1)
            console.log(app.globalData.job2)
            console.log(app.globalData.job3)
            console.log(app.globalData.job4)
            console.log(app.globalData.job5)
          }
        
        })}
      }
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

  }
})