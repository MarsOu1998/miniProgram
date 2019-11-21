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
      // data 字段表示需新增的 JSON 数据
      data: {
       account:event.account,
       title:event.title,
       time: event.time,
       sex: event.sex,
        salary: event.salary,
        content: event.content,
        place: event.place,
        phone: event.phone
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