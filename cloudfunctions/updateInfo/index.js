// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  try {
    return await db.collection("user").doc(event._id).update({
      data: {
        nickname: event.nickname,
        sign:event.sign,
        telphone:event.tel,
        touxiang:event.touxiang1,
        flag:event.flag
      }
    })
  } catch (e) {
    console.error(e)
  }
}