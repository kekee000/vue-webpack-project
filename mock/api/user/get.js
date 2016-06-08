
var data = {
    id: '100',// 用户编号
    name: '张无忌', // 名称
    idCard: '320302198304959029', // 身份证
    sex: '男', // 性别
    birthday: '1987-1-1', // 生日
    phone: '15399940483', // 电话
    joinTime: '2016-2-3', // 加盟时间
    city: '所在城市', // 所在城市
    photo: 'http://placeholder.duapp.com/100/500/soft', // 持证照片
}

module.exports =  function (req) {
    return {
        status: 0,
        data: data
    }
}
