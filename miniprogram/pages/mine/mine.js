var date=require('../../utils/util.js');

// pages/mine/mine.js
const app=getApp();
var nickname;//昵称
var sign;//签名
var tel;//电话
var touxiang;//头像
var fileId;
var idname;//fileID
var zero="0";
var one="1";
var time=null;//当前时间
const db = wx.cloud.database();
const admin = db.collection('user');//数据库里面集合名字
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {

  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {



    time=date.formatTime(new Date());
    console.log("现在的时间是:"+time);


    console.log(app.globalData.userNameGlobal);
    console.log("nicknam"+app.globalData.nickName);
    console.log("当前头像地址:" + app.globalData.imageId);
    this.setData({
      nickname : app.globalData.nickName,
      sign: app.globalData.sign,
      tel: app.globalData.tel,
      touxiang:app.globalData.touxiang,
      fileId: app.globalData.imageId
    }),
      console.log("idname:" + app.globalData.id123);
    
  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  },

  changeImage:function(){
    var that=this;
    wx,wx.showActionSheet({
      itemList: ['从相册中选择'],
      itemColor: '#00000',
      success: function(res) {
        that.seleceImage('album')
      },
      fail: function(res) {},
      complete: function(res) {},
    })
  }
,
  seleceImage:function(event){
    var that=this;
    var  imgsPaths=that.data.imgs;
    wx.chooseImage({
      sourceType:[event],
      success: function(res) {
        console.log(res)
        console.log(res.tempFilePaths[0])
        that.upImage(res.tempFilePaths[0])
      },  
    })
  },

  upImage:function(imgurl){
    var that=this;
    admin.get({
      success: (res) => {
        let user = res.data;
        for (let i = 0; i < user.length; i++) {
          if (app.globalData.userNameGlobal === user[i].account) {
              // 登录成功后把信息存入全局变量
            app.globalData.flag = user[i].flag;
            console.log("flag:" + app.globalData.flag);
            if (app.globalData.flag==zero){
              wx.cloud.uploadFile({
                cloudPath: 'touxiang/' + app.globalData.id123+time,
                filePath: imgurl,
                success(res) {
                  console.log('头像上传成功')
                  console.log("当前用户_ID" + app.globalData.id123)
                  console.log(res),
                    app.globalData.imageId = res.fileID,

                    //调用云函数更新头像地址
                    wx.cloud.callFunction({
                      name: 'updateInfo',
                      data: {
                        _id: app.globalData.id123,
                        touxiang1: app.globalData.imageId,
                        flag:one
                      },
                      success: res => {
                        console.log('更新数据成功')
                        fileID: app.globalData.imageId
                      },
                      fail: res => {
                        console.log('更新数据失败')
                      }
                    })

                },
                fail(res) {
                  console.log("上传失败")
                }
              })
            }
            else if (app.globalData.flag == one) {
              wx.cloud.uploadFile({
                cloudPath: 'touxiang/'+app.globalData.id123+time,
                filePath: imgurl,
                success(res) {
                  console.log('头像上传成功')
                  console.log("当前用户_ID" + app.globalData.id123)
                  console.log(res),
                    app.globalData.imageId = res.fileID,

                    //调用云函数更新头像地址
                    wx.cloud.callFunction({
                      name: 'updateInfo',
                      data: {
                        _id: app.globalData.id123,
                        touxiang1: app.globalData.imageId,
                        flag: zero
                      },
                      success: res => {
                        console.log('更新数据成功')
                        fileID: app.globalData.imageId
                      },
                      fail: res => {
                        console.log('更新数据失败')
                      }
                    })

                },
                fail(res) {
                  console.log("上传失败")
                }
              })
            }
            
            
          }
        }
      }
    })

    if (app.globalData.flag==="0"){
      console.log("flag等于0")
      
    }

    
  }
,
  information:function(){
    wx.navigateTo({
      url: '/pages/information/information',
    })
  },
  logout:function(){
    
    wx.showToast({
      title: '退出登录',
      icon:'success',
      duration:1000,
      success:function(){
        setTimeout(
          function(){
            wx.redirectTo({
              url: '/pages/login/login'
            })
          },1000
        )
      }
    })
    
    
  }
})