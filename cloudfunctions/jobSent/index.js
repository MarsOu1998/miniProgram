// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
//查询
exports.main = async (event, context) => {
  try {
    //order
    return await db.collection('job').add({
      data: {
        account: event.account,//发布者账号
        id:event._id,//发布者id,便于通知商家报名信息
        title:event.title,//工作标题
        time: event.time,
        sex: event.sex,
        type:event.type,
        salary: event.salary,
        content: event.content,
        place: event.place,
        phone: event.phone,
        job:'1',
        nickname:event.nickname,//商家店铺名字
        creditScore:event.creditScore,//商家信用分
        shenqing:event.shenqing
      },
      success: function (res) {
        // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
        console.log(res)
      },
      fail: console.error
    });
  } catch (e) {
    console.error(e);
  }
}