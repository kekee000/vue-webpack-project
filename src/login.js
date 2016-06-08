/**
 * @file  登录
 * @author mengke01(kekee000@gmail.com)
 */

// vue and router
var Vue = require('vue')
var datasource = require('./datasource')

var app = new Vue({
  el: '#app',
  data: function() {
    return {
      role: 'user',
      userName: '',
      password: '',
      rememberPassword: false,
      loginInfo: '',
      validator: {
        userName: {
          match: /^\w{2,20}$/,
          valid: 1
        },
        password: {
          match: /^[^\s]{2,20}$/,
          valid: 1
        }
      }
    }
  },
  ready: function () {
    $(document.body).addClass('ready')
  },
  methods: {
      validate: function () {
          var validator = this.validator
          var valid = true
          var self = this
          Object.keys(validator).forEach(function (field) {
            if (!validator[field].match.test(self[field])) {
              valid = false
              validator[field].valid = 0
            }
            else {
              validator[field].valid = 1
            }
          })
          return valid;
      },
      doSubmit: function () {

          if (!this.validate()) {
            return;
          }
          var self = this
          datasource.post('login', {
              userName: self.userName,
              password: self.password,
              role: self.role,
              rememberPassword: self.rememberPassword ? 1 : ''
          }).then(function (data) {
              self.loginInfo = ''
              location.href = '/'
          }, function (reason) {
              self.loginInfo = reason.statusInfo || '用户名或密码错误!'
          });
      }
  }
});
