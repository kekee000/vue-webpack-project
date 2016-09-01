<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{%$appName%}管理平台登录</title>
    <link href="{%$feRoot%}/dep/bootstrap/css/bootstrap.min.css" rel="stylesheet">
    <link href="{%$feRoot%}/asset/login-css.css?{version}" rel="stylesheet">
</head>
<body id="app">
  <div class="login-container">
    <div class="main-container">
      <div class="login-tip">
        <h2>{%$appName%}管理平台</h2>
      </div>
      <div class="login-panel">
        <ul class='tab'>
          <li @click="role='user'" class="{{ role == 'user' ? 'cur' : ''}}">用户</li>
          <li @click="role='admin'" class="{{ role == 'admin' ? 'cur' : ''}}">管理员</li>
        </ul>
        <form @submit.prevent="doSubmit" class="form-search">
            <div class="form-group {{ validator.userName.valid ? '' : 'has-error'}}">
                <i class="glyphicon glyphicon-user"></i>
                <input v-model="userName" class="form-control">
            </div>
            <div class="form-group group-password {{ validator.password.valid ? '' : 'has-error'}}">
                <i class="glyphicon glyphicon-lock"></i>
                <input type="password" v-model="password" class="form-control">
            </div>
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="rememberPassword">记住密码
              </label>
              <a href="" class="forgot-password">忘记密码</a>
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-submit">登录</button>
            </div>
            <p v-show="loginInfo" class="login-error">{{ loginInfo }}</p>
        </form>
      </div>
    </div>
  </div>
  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="{%$feRoot%}/dep/bootstrap/js/bootstrap.min.js"></script>
  <script src="{%$feRoot%}/asset/login-js.js?{version}"></script>
</body>
</html>
