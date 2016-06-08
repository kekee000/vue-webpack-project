/**
 * @file  注册验证组件
 * @author mengke01(kekee000@gmail.com)
 */

var validators = {
    'requires': function (val) {
      return val.length >= 2 && val.length < 80;
    },
    'phone': function (val) {
      return val.length && val.match(/^[\d]{6,20}$/);
    },
    'number': function (val) {
      return val.match(/^\d+$/);
    },
    'idcard': function (val) {
      return val.match(/^\d{15,18}x?$/i);
    },
    'date': function (val) {
      return val.match(/^\d{4}-\d{1,2}-\d{1,2}$/i);
    },
    'time': function (val) {
      return val.match(/^\d{4}-\d{1,2}-\d{1,2}(?:\s+\d{1,2}:\d{1,2})?$/i);
    }
}


exports.use = function (Vue) {
    Object.keys(validators).forEach(function (key) {
        Vue.validator(key, validators[key])
    })
}
