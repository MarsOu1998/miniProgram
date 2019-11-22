// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init()
const db = cloud.database()
// 云函数入口函数
//查询
exports.main = async (event, context) => {
  try {
    console.log("云函数中当前获取的工作数目："+event.count);
    //order
    if(event.count<=5){
      return await db.collection('job')
        .where({
          job: "1", // 查找需要返回的记录
        }).get({
          success: function (res) {
            return res;
          }
        });
    }
    else{
    return await db.collection('job')
      .where({
        job:"1", // 查找需要返回的记录
      })
      .skip(event.count-5) // 跳过结果集中的前 count 条，从第 count+1 条开始返回
      .limit(5) // 限制返回数量为 5 条
      .get({
        success:function(res){
          return res;
        }
      }
      );
    }
  } catch (e){
    console.error(e);
  }
}