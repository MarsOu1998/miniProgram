// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if (event.count <= 5) {   
  try {
    //order
    return await db.collection('job').where({
      //下面这3行，为筛选条件
      id: event.id,
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
  else{
    try {
      //order
      return await db.collection('job').where({
        //下面这3行，为筛选条件
        id: event.id,
      }).skip(event.page-0).
      limit(5).get({
        success: function (res) {
          console.log(res);
          return res;
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
}
