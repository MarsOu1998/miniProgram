var app=getApp();
var job;//从全局变量中获取当前工作信息
var accountInfo;//从全局变量中获取当前账号信息
var shoucang = {};//获取当前数据库中已收藏的工作id
var baoming = {};//获取当前数据库中已报名的工作id
var shenqing = {};//获取当前数据库中已申请的工作id
var like=false;//用于通知前端页面进行收藏图片切换
var enroll=false;
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
        // for (var i = 0; i < app.globalData.accountInfo['baoming'].length; i++) {
        //   if (app.globalData.accountInfo['baoming'][i] == app.globalData.job['_id']) {
        //     enroll = true;
        //     console.log("当前工作已报名");
        //     break;
        //   }
        // }
        // this.setData({
        //   enroll
        // })




    like=false;
    enroll=false;
    //console.log("当前like的值："+like);
    this.setData({
      job: app.globalData.job,
      accountInfo: app.globalData.accountInfo,
    })
    //检测当前数据库中是否已经收藏过此工作，通知前端页面切换图片
    shoucang = app.globalData.accountInfo['shoucang'];
    baoming = app.globalData.accountInfo['baoming'];
    //从当前工作中取出所有报名了此工作的用户的ID
    shenqing = app.globalData.job['shenqing'];
    //console.log("当前收藏数组的长度为:"+shoucang.length);
    for(var i=0;i<shoucang.length;i++){
      if(app.globalData.job['_id']==shoucang[i]){
        console.log("此工作已被收藏过");
        like=true;
        this.setData({
          like
      })
      }
    }
    
    for (var i = 0; i < baoming.length; i++) {
      if (app.globalData.job['_id'] == baoming[i]) {
        console.log("此工作已被报名过");
        enroll = true;
        this.setData({
          enroll
        })
      }
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
  shoucang:function(){

    console.log("当前like的值:"+like)
    var that=this;
    if(like==true){
    //判断当前工作是否已被收藏过,若是，则取消收藏
    for(var i=0;i<shoucang.length;i++){
      if (app.globalData.job['_id'] == shoucang[i]){
        shoucang.splice(i,1);//从数组的指定位置中删除元素,删除一个
        console.log("已从数组中删除取消收藏工作");
        console.log("当前收藏如下：");
        console.log(shoucang);
        wx.cloud.callFunction({
          name:'updateInfo',
          data:{
            _id: app.globalData.accountInfo['_id'],
            shoucang: shoucang
          },
          success:function(res){
            wx.showToast({
              title: '取消收藏',
            })
            like=false;
            that.setData({ like}) 
          }

        })
      }
    }
  }
  else{
    //先获取当前用户已收藏的工作id,把当前工作的_id以数组的形式存入用户的账号中
    shoucang=app.globalData.accountInfo['shoucang'];
    console.log("当前用户收藏的工作有:");
    console.log(shoucang);
    console.log("当前工作id："+app.globalData.job['_id']);
    
    shoucang.push(app.globalData.job['_id']);
    console.log("当前工作添入数组后：");
    console.log(shoucang);
    wx.cloud.callFunction({
      name:'updateInfo',
      data:{
        _id:app.globalData.accountInfo['_id'],
        shoucang:shoucang
      },
      success:res=>{
        console.log(res)
        wx.showToast({
          title: '收藏成功',
        })
        like=true;
        that.setData({
          like
        })
      }
      
    })
  }
},
baoming:function(){
  console.log("当前enroll的值:" + enroll)
  var that = this;
  if (enroll == true) {
    //判断当前工作是否已被报名过,若是，则取消报名
    for (var i = 0; i < baoming.length; i++) {
      if (app.globalData.job['_id'] == baoming[i]) {
        baoming.splice(i,1);//从数组的指定位置中删除元素,只删除一个
        console.log("以从数组中删除取消报名工作");
        console.log("当前报名如下：");
        console.log(baoming);
        wx.cloud.callFunction({
          name: 'updateInfo',
          data: {
            _id: app.globalData.accountInfo['_id'],
            shenqing:shenqing,
            baoming: baoming
          },
          success: function (res) {
            wx.showToast({
              title: '取消报名',
            })
            enroll = false;
            that.setData({ enroll })
          }

        })
      }
    }
    //找到当前数组中报名此工作的用户id，删去。
    for(var i=0;i<shenqing.length;i++){
      if(app.globalData.accountInfo['_id']==shenqing[i]){
        shenqing.splice(i,1);
        console.log('取消报名后，当前报名的ID为:');
        console.log(shenqing);
        wx.cloud.callFunction({
          name:'updateJobById',
          data:{
            _id:app.globalData.job['_id'],
            shenqing:shenqing
          },
          success:function(res){
            console.log("已从Job数据库中删去当前用户的ID")
          }
        })
      }
    }
  }
  else {
    //先获取当前用户已报名的工作id,把当前工作的_id以数组的形式存入用户的账号中
    baoming = app.globalData.accountInfo['baoming'];
    console.log("当前用户报名的工作有:");
    console.log(baoming);
    console.log("当前工作id：" + app.globalData.job['_id']);

    baoming.push(app.globalData.job['_id']);
    console.log("当前报名工作添入数组后：");
    console.log(baoming);
    wx.cloud.callFunction({
      name: 'updateInfo',
      data: {
        _id: app.globalData.accountInfo['_id'],
        baoming: baoming
      },
      success: res => {
        console.log(res)
        wx.showToast({
          title: '报名成功',
        })
        enroll = true;
        that.setData({
          enroll
        })
      }

    })
    //通知Job数据库把新的用户ID填入
    shenqing.push(app.globalData.accountInfo['_id']);
    console.log('报名后，当前报名的ID为:');
    console.log(shenqing);
    wx.cloud.callFunction({
      name:'updateJobById',
      data:{
        _id:app.globalData.job['_id'],
        shenqing:shenqing
      },
      success:function(){
        console.log("当前用户Id已存入Job数据库中");
      }
    })
  }
}
})