var app=getApp();
var title;
var type;
var time;
var sex;
var salary;
var content;
var place;
var phone;
var nickname;//存放输入的店名

// pages/fabu/fabu.js
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
  //获取工作标题
  biaoti:function(event){
    title=event.detail.value;
  },
  //获取结算类型
  leixing:function(event){
    type=event.detail.value;
    switch(type){
      case "rijie":type="日结"    
      
      }
  },
  //获取招聘期限
  qixian:function(event){
    time=event.detail.value;
  },
  //获取性别要求
  yaoqiu:function(event){
    sex=event.detail.value;
  },
  //获取工资
  gongzi:function(event){
    salary=event.detail.value;
  },
  //获取工作内容
  neirong:function(event){
    content=event.detail.value;
  },
  //获取工作地点
  didian:function(event){
    place=event.detail.value;
  },
  //获取联系方式
  lianxi:function(event){
    phone=event.detail.value;
  },
  dianming:function(event){
    nickname=event.detail.value;
  },
  //发布工作
  fabu:function(){
    wx.cloud.callFunction({
      name:'jobSent',
      data:{
        account:app.globalData.accountInfo['account'],
        title:title,
        type:type,
        time:time,
        sex:sex,
        salary:salary,
        content:content,
        place:place,
        phone:phone,
        nickname: nickname,
        creditScore:app.globalData.accountInfo['creditScore']
      },
      success:res=>{
        console.log("工作发布成功");
        wx.redirectTo({
          url: '/pages/qiehuan/qiehuan',
        })
      },
      fail:res=>{
        console.log("工作发布失败");
        console.error;
      }
    })
  }

})