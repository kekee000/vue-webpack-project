/**
 * @file  入口
 * @author mengke01(kekee000@gmail.com)
 */

// vue and router
var Vue = require('vue')
var VueRouter = require('vue-router')
var datasource = require('./datasource')
var user = require('./user')
var loading = require('./loading')

var VueValidator = require('vue-validator')
Vue.use(VueValidator)
Vue.use(VueRouter)

// datasource
Vue.prototype.$datasource = require('./datasource');

// 注册验证组件
require('./lib/framework/validators').use(Vue)

var app = Vue.extend({
  data: function() {
    return {
      user: user.get(),
      sidebar: ''
    };
  },
  ready: function () {
    $(document.body).addClass('ready')
  },
  methods: {
    /**
     * 是否有权限操作
     * @param  {string}  action  操作
     * @return {boolean}
     */
    isAuth: function (action) {
      return user.isAuth(action)
    }
  },
  components: {
    SideBar: require('./views/widget/SideBar.vue')
  }
});

// 创建一个路由器实例
var router = new VueRouter()
router.map(require('./router'))

// 设置路径相关信息
router.beforeEach(function (transition) {
  document.body.scrollTop = 0;
  var m = transition.to.name.match(/^(user|profile)/);
  router.app.sidebar = m ? m[1] : '';

  transition.next()
})

router.start(app, '#app')
