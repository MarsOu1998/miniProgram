var app=getApp();
var empty;
var luqu;//获取当前用户已被录取的工作id
var job=[];//用于前端页面显示当前用户已被录取的工作
var daogang;//获取当前用户已到岗的工作
var daogangJob;
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
    empty=false;
    job=[];//防止每次刷新页面都把重复的工作放入数组
    daogangJob=[];
      luqu=app.globalData.accountInfo['luqu'];
      daogang = app.globalData.accountInfo['daogang'];
      console.log("当前用户被录取的工作有:");
      console.log(luqu);
      if(luqu.length==0){
        empty=true;
      }
      that.setData({
        empty
      })
    console.log("当前用户到岗的工作有:");
    console.log(daogang);
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
            job.push(res.result.data[0]);
            that.setData({
              job,empty
            })
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

  },
  arrive:function(event){
    var that=this;
    daogangJob=[];
    var id=event.currentTarget.dataset.id;
    console.log("当前点击页面上的第"+id+"条");
    console.log("当前job的id为:" + job[id]['_id']);
    console.log("当前工作已到岗的人有：");
    console.log(job[id]['daogang']);
    //daogangJob = job[id]['daogang'];
    daogangJob.push(app.globalData.accountInfo['_id']);
    wx.cloud.callFunction({
      name:'updateBusInfo',
      data:{
        _id: job[id]['_id'],
        daogang: daogangJob
      }
    })



    for(var i=0;i<luqu.length;i++){
      if(luqu[i]==job[id]['_id']){
        console.log("当前luqu的id为:" + luqu[i]);
        daogang.push(luqu[i]);//把当前录取的工作放入到岗字段
        luqu.splice(i,1);
        job.splice(id,1);
        break;
      }
    }
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id:app.globalData.accountInfo['_id'],
        luqu:luqu,
        daogang:daogang
      },
      success:function(res){
        console.log("当前工作id已从用户数据库的录取字段删除，已存入到岗字段，因为用户已到岗。");
        that.setData({
          job
        })
      }
    })
  }
})