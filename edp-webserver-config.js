require('jsmart')

// 端口
exports.port = 8080;

// 网站根目录
var env = process.env.NODE_ENV
var documentRoot = process.cwd()
var feRoot = 'http://127.0.0.1:8081'

// 预发布
if (env == 'preview') {
    var documentRoot = process.cwd() + '/output'
    var feRoot = '.'
}

exports.documentRoot = documentRoot
exports.directoryIndexes = true;

/**
 * 模拟 smarty 模板替换
 */
function replace(content, context) {
    var role = context.request.pathname.match(/\/(admin|user|visitor)/)
    var data = require(documentRoot + '/mock/entry')(context.request, context.response);
    data.feRoot = feRoot
    data.user.role = role ? role[1] : 'admin'

    var render = new jSmart(content);
    render.registerPlugin('modifier', 'json_encode', function (data) {
        return JSON.stringify(data)
    })
    return render.fetch(data);
}

exports.getLocations = function () {
    return [
        {
            location: /\/(?:admin|user|visitor)?(?:$|\?)/,
            handler: [
                function (context) {
                    var content = require('fs').readFileSync(documentRoot + '/index.tpl', 'utf8')
                    context.content = replace(content, context)
                }
            ]
        },
        {
            location: '/login',
            handler: [
                function (context) {
                    var content = require('fs').readFileSync(documentRoot + '/login.tpl', 'utf8')
                    context.content = replace(content, context)
                }
            ]
        },
        // 接收`font.baidu.com`推送的同步字体数据，并保存到相应的目录
        // @see https://github.com/ecomfe/fonteditor/wiki/%E4%BD%BF%E7%94%A8edp-webserver%E5%90%8C%E6%AD%A5%E5%AD%97%E4%BD%93%E9%A1%B9%E7%9B%AE%E5%88%B0%E6%9C%AC%E5%9C%B0
        {
            location: /\.font(?:$|\?)/,
            handler: [(function () {
                if (typeof fontsync === 'function') {
                    return fontsync({
                        // fontName: 'fonteditor', // 接收字体的名字
                        // fontType: 'ttf,woff', // 接收字体的类型
                        // fontPath: 'src/common/css/fonts' // 字体存放目录
                    });
                }
                return file();
            })()]
        },
        // 不带后缀的路径路由到mock router
        {
            location: /\/api\/[\w-\/]+\/(?:add|del|modify)\w*(?:$|\?)/,
            handler: [
                function (context) {
                    context.request.pathname = '/api/success'
                },
                mockHandler()
            ]
        },
        {
            location: /\/api\/[\w-\/]+(?:$|\?)/,
            handler: [
                mockHandler()
            ]
        },

        {
            location: /^.*$/,
            handler: [
                file(),
                proxyNoneExists()
            ]
        }
    ];
};

exports.injectResource = function (res) {
    for (var key in res) {
        global[key] = res[key];
    }
};



/**
 * 重定向地址到mock地址
 */
function mockHandler() {
    var fs = require('fs')
    var path = require('path')
    var cwd = process.cwd()
    return function (context) {
        var pathname = context.request.pathname;
        var modulePath = path.join(cwd, '/mock', pathname);

        if (fs.existsSync(modulePath + '.js')) {
            var data = require(modulePath)(context.request, context.response);
            context.content = JSON.stringify(data);
            delete require.cache[require.resolve(modulePath)];
        }
        else {
            context.content = fs.readFileSync(modulePath, 'utf-8');
        }
    };
}
