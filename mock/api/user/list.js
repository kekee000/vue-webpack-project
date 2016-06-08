var data = {
    page: 1, // 当前页
    total: 10, // 总页数
    list: [
        {
            id: '1', // 编号
            name: '张无忌', // 名称
            nickname: '张教主',
            phone: '12345678901'
        },
        {
            id: '2', // 编号
            name: '张三丰', // 名称
            nickname: '张教主',
            phone: '12345678901'
        }
    ]
}

module.exports =  function (req) {
    data.page = +req.query.page || 1

    return {
        status: 0,
        data: data
    }
}
