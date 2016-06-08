/**
 * @file  路由配置
 * @author mengke01(kekee000@gmail.com)
 */

module.exports = {
  '/': {
    name: 'index',
    component: require('./views/IndexView.vue')
  },

  // 班级
  '/userlist': {
    name: 'userlist',
    component: require('./views/UserListView.vue')
  },
  '/userdetail': {
    name: 'userdetail',
    component: require('./views/UserdetailView.vue')
  },
  '/profile': {
    name: 'profile',
    component: require('./views/UserdetailView.vue')
  },
}
