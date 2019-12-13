var app=getApp();
var job=[];
var empty;
var user=[];
var baoming=[];//更改用户报名的信息
var luqu=[];//存放录取用户的工作id
var shenqing=[];//存放当前工作中申请的用户id
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
      job=app.globalData.job;
      if(job['shenqing']==0){
        empty=true;
      }
      else{
        empty=false;
      }
      console.log("empty:"+empty)
      this.setData({
        empty
      })
      console.log("此工作申请者id:");
      console.log(job['shenqing']);
    //for (var i = 0; i < job['shenqing'].length;i++){
      console.log(job['shenqing'][0]);
      wx.cloud.callFunction({
        name:'selectUserById',
        data:{
          _id: job['shenqing'][0]
        },
        success:function(res){
          console.log(res.result.data[0]);
          user.push(res.result.data[0]);
          baoming = res.result.data[0]['baoming']
          luqu = res.result.data[0]['luqu'];
          console.log("当前录取的人有:")
          console.log(luqu);
          that.setData({
            user
          })
        }
      })
  //  }
     
     
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
  agree:function(){
    console.log(baoming)
    console.log(job['_id'])
    for(var i=0;i<baoming.length;i++){
      if (baoming[i] == job['_id']){
        baoming.splice(i,1);
        luqu.push(job['_id']);
        break;
      }
    }
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id: user[0]['_id'],
        baoming:baoming,
        luqu:luqu
      },
      success:function(res){
        console.log("用户录取成功");
        shenqing=job['shenqing'];
        console.log("此工作目前申请情况");
        console.log(shenqing);
        for(var i=0;i<shenqing.length;i++){
          if (shenqing[i] == user[0]['_id'])
          {
            shenqing.splice(i,1);
            break;
          }
        }
        console.log("申请数组已删除当前用户id");
        console.log(shenqing)
        console.log("当前工作id为" + job['_id']);
        wx.cloud.callFunction({
          name:'updateBusInfo',
          data:{
            _id:job['_id'],
            shenqing:shenqing
          },
          success:function(res){
            console.log("以从当前工作的申请者中删除该用户，因已录取");
          }
        })
      }
    })
  }
})