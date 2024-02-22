const { UserData } = require('../mysql/database'); // Đảm bảo rằng bạn đã require mô hình UserLog từ tệp cấu hình của mình


// async function savePostData(postData) {
//   try {
//     const userLogEntry = await UserLog.create({
//       userid: postData.userid,
//       placeId: postData.placeId,
//       name: postData.name,
//       avatar: postData.avatar,
//       content: postData.content,
//       isServer: postData.isServer,
//       data: postData.data, // Lưu trực tiếp đối tượng JSON vào trường dữ liệu
//       code: postData.code
//     });
//     return true
//   } catch (error) {
//     console.error('Lỗi khi lưu dữ liệu:', error);
//   }
// }

async function update(userid, data) {
  try {
    const existing = await UserData.findByPk(userid)
    if (existing) {
      await existing.update({ data: data })
      return "CREATE"
    } else {
      
      await UserData.create({ userid: userid, data: data })
      return "UPDATE"
    }
  } catch (e) {
    console.log(e)
  }
}
module.exports = {
  update,
}
