#Vue单页面项目后台

## 开发

前端：vue + vue-loader + webpack
mock：edp-webserver

git 地址：https://github.com/kekee000/vue-webpack-project

初始化

    npm install -g webpack
    npm install

调试

    npm run dev
    open http://127.0.0.1:8081
    // 管理员
    open http://127.0.0.1:8081/admin
    // 用户
    open http://127.0.0.1:8081/user
    // 游客
    open http://127.0.0.1:8081/visitor

编译

    npm run build

预览编译结果

    npm run  preview
    open http://127.0.0.1:8080

## 接口文档
使用 ajax json 作为前后通信方式，返回数据格式为 ejson 格式，前后端按照ejson接口开发
ejson规范参考：[ejson](https://github.com/ecomfe/spec/blob/master/e-json.md)

接口数据在 mock/api 下，每个文件为一个 mock 接口，例如：班级列表页接口如下：

url: api/user/list
data:

    var data = {
        page: 1, // 当前页
        total: 10, // 总页数
        list: [
            {
                id: '1', // 编号
                name: '张无忌', // 名称
                nickname: '张教主', // 昵称
                phone: '123456789012', // 电话
            }
        ]
    }
