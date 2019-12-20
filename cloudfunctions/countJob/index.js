// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
//查询
exports.main = async (event, context) => {
  try {
    //order
    return await db.collection('job').where({
      job: '1' // 同级当前工作数目
    }).count({
      success: function (res) {
        return res;
      },
      fail:function(res){
        console.log("统计工作云函数失败");
      }
    });
  } catch (e) {
    console.error(e);
  }
}