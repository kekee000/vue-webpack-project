/**
 * @file  用户登录信息
 * @author mengke01(kekee000@gmail.com)
 *
 * 用户登录信息：
 * {
 *      userName: 'kekee000',
        role: 'admin' //管理员：admin
 * }
 */

module.exports = {
    isLogin: function () {
        return !!window.PAGE_DATA.user
    },
    get: function () {
        return window.PAGE_DATA.user || {
            userName: '游客',
            role: 'visitor'
        }
    },
    isAuth: function (action) {
        var role = this.get().role;
        // 管理员权限
        if (role === 'admin') {
            return true
        }

        // 用户权限
        if (role === 'user') {
            return action == 'profile' || action.indexOf('profile:') == 0
        }
    }
};
