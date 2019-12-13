// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
 
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  if(event.count<=5){    
    return await db.collection('job').where({
      'title': db.RegExp({
        regexp: event.query,
        options: 'i'
      })
    }).get({
        success: function (res) {
          return res;
        }
      })
  }
  else{
    return await db.collection('job').where({
      'title': db.RegExp({
        regexp: event.query,
        options: 'i'
      })
    }).skip(event.page-0)
      .limit(5)
      .get({
        success: function (res) {
          return res;
        }
      })
  }
}