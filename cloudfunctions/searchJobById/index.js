// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
    try {
      //order
      return await db.collection('job').where({
        //下面这3行，为筛选条件
        _id: event._id,
      }).get({
        success: function (res) {
          console.log(res);
          return res;
        }
      });
    } catch (e) {
      console.error(e);
    }
}