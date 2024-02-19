const {UserLog} = require('../mysql/database'); // Đảm bảo rằng bạn đã require mô hình UserLog từ tệp cấu hình của mình


async function savePostData(postData) {
  try {
    const userLogEntry = await UserLog.create({
      userid: postData.userid,
      placeId: postData.placeId,
      name: postData.name,
      avatar: postData.avatar,
      content: postData.content,
      isServer: postData.isServer,
      data: postData.data // Lưu trực tiếp đối tượng JSON vào trường dữ liệu
    });
    return true
  } catch (error) {
    console.error('Lỗi khi lưu dữ liệu:', error);
  }
}
module.exports={
    savePostData,
}
