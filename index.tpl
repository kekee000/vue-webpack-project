<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>{$appName}管理平台</title>
    <link href="{$feRoot}/dep/bootstrap/css/bootstrap.min.css" rel="stylesheet">

    <link href="{$feRoot}/dep/bootstrap-combobox/bootstrap-combobox.css" rel="stylesheet">
    <link href="{$feRoot}/dep/bootstrap-datetimepicker/css/bootstrap-datetimepicker.min.css" rel="stylesheet">
    <link href="{$feRoot}/dep/select2/css/select2.min.css" rel="stylesheet">
    <link href="{$feRoot}/dep/webuploader/dist/webuploader.css" rel="stylesheet">

    <link href="{$feRoot}/asset/entry-css.css" rel="stylesheet">
</head>
<body id="app">
  <nav class="navbar navbar-inverse" role="navigation">
    <div class="navbar-header">
      <a class="navbar-brand" href="/">{$appName}管理平台 <span></span></a>
    </div>

    <div v-if="user.role=='visitor'" class="navbar-links navbar-right nav-login">
      <a href="/login">登录</a>
      <a href="/reg">注册</a>
    </div>
    <div v-if="user.role!='visitor'" class="navbar-links navbar-right nav-login">
      <span style="color: #fff">
        <b>{{ user.userName }}</b> ({{user.role}})
      </span>
      <a href="/loginout">注销</a>
    </div>
  </nav>
  <side-bar :cur="sidebar"></side-bar>
  <div class="viewport">
     <router-view></router-view>
  </div>
  <div id="loading" class="loading"><span></span></div>
  <script>
    window.PAGE_DATA = {
      feRoot: '{$feRoot}',
      user: {$user}
    };
  </script>
  <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
  <script src="{$feRoot}/dep/bootstrap/js/bootstrap.min.js"></script>

  <script src="{$feRoot}/dep/bootstrap-combobox/bootstrap-combobox.js"></script>
  <script src="{$feRoot}/dep/bootstrap-datetimepicker/js/bootstrap-datetimepicker.min.js"></script>
  <script src="{$feRoot}/dep/bootstrap-datetimepicker/js/locales/bootstrap-datetimepicker.zh-CN.js"></script>

  <script src="{$feRoot}/dep/select2/js/select2.min.js"></script>
  <script src="{$feRoot}/dep/select2/js/i18n/zh-CN.js"></script>

  <script src="{$feRoot}/dep/webuploader/dist/webuploader.min.js"></script>

  <script src="{$feRoot}/asset/entry-js.js"></script>
</body>
</html>
