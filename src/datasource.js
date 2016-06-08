/**
 * @file  数据源
 * @author mengke01(kekee000@gmail.com)
 */
var DataSource = require('./lib/DataSource')

module.exports = new DataSource({
    resources: [
        {
            'name': 'login',
            'url': '/api/login'
        },
        {
            'name': 'upload',
            'url': '/api/upload'
        },
        {
            'name': 'upload-del',
            'url': '/api/upload/del'
        },

        // 用户
        {
            'name': 'user-list',
            'url': '/api/user/list'
        },
        {
            'name': 'user-get',
            'url': '/api/user/get'
        },
        {
            'name': 'user-modify',
            'url': '/api/user/modify'
        },
        {
            'name': 'user-del',
            'url': '/api/user/del'
        },
        {
            'name': 'user-suggest',
            'url': '/api/user/suggest'
        }
    ]
})
