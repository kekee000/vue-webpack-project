/**
 * @file  数据源组件
 * @author mengke01(kekee000@gmail.com)
 */

/**
 * 发起一个ajax请求
 *
 * @param  {string} name   资源名称
 * @param  {Object} options 请求参数
 * @return {Promise}
 */
function request(name, options) {
    var me = this;
    // 这里做一下兼容, 如果没有设置url, 则从resources配置中取
    var res = name.indexOf('/') === 0
        ? { url: name }
        : this.resources[name];
    if (!options.url) {
        if (!res) {
            throw new Error('no resource by name:' + name);
        }
        options.url = res.url;
    }

    // 设置不处理data字段,用于FormData上传
    if (false !== options.processData) {
        options.data = $.extend(
            {},
            window.PARAM_DATA,
            res && res.params,
            options.data
        );
    }
    options.dataType = options.dataType || 'json';

    options.type = (options.type || 'get').toLowerCase();
    if (options.type === 'post') {
        options.t = Date.now ? Date.now() : new Date().getTime();
    }

    var deferred = $.Deferred();
    $.ajax(options).done(function (data) {
        me.onSuccess && me.onSuccess(data, options);

        if (options.dataType === 'json' || options.dataType === 'jsonp') {
            if (data) {
                if (data.status === 0) {
                    deferred.resolve(data.data);
                    return;
                }

                // 跳转，如果有`data.location`字段则自动跳转
                // 如果有`datasource.onRedirect`函数, 则调用datasource.onRedirect
                // 否则走`reject`流程
                if (data.status === 302) {
                    if (data.location) {
                        location.href = data.location;
                        return;
                    }

                    if (me.onRedirect){
                        e.onRedirect(data.data);
                        return;
                    }
                }
            }

            deferred.reject(data);
        }
        // 处理数据非json的情况
        else {
            deferred.resolve(data);
        }
    }).fail(function (reason) {
        me.onError && me.onError(reason, options);
        deferred.reject({
            status: -1,
            reason: reason
        });
    });
    return deferred;
}

/**
 * 发起一个ajax请求
 *
 * @param  {string} method  method post or get
 * @param  {string} name   资源名称
 * @param  {Object} params 请求参数
 * @return {Promise}
 */
function requestJson(method, name, params) {
    var options = {
        dataType: 'json',
        type: method,
        data: params
    };
    return request.call(this, name, options);
}

/**
 * 数据源操作类
 *
 * @constructor
 * @param {Object} options 参数选项
 * @param {Array} options.resources 资源数组列表
 * options.resources = [
 *     {
 *         name: 'res1',
 *         url: 'url1',
 *         params: {
 *             param1: '1'
 *         }
 *     }
 * ]
 * @param {string} options.logAct log的act字段，通过配置`logAct`字段，来设置发送的ajax动作
 * @param {Function=} onSuccess ajax成功后的回调
 * @param {Function=} onError ajax失败后的回调
 * @param {Function=} onRedirect ajax跳转的回调
 */
function Datasource(options) {
    this.resources = [];
    $.extend(this, options);
    this.init();
}


/**
 * 初始化函数
 */
Datasource.prototype.init = function () {
    // 将资源转换成hash，存储
    var resList = {};
    $(this.resources).each(function (index, item) {
        resList[item.name] = item;
    });
    this.resources = resList;
};

/**
 * 根据名字获取一个资源配置
 *
 * @param  {string} name 名称
 * @return {Object}      资源配置
 */
Datasource.prototype.getResource = function (name) {
    return this.resources[name];
};

/**
 * 根据名字获取一个资源配置的url
 *
 * @param  {string} name 名称
 * @return {Object}      资源配置
 */
Datasource.prototype.getUrl = function (name) {
    var res = this.resources[name];
    return res && res.url;
};

/**
 * 注销
 */
Datasource.prototype.dispose = function () {
    this.resources = null;
};


/**
 * 获取相关资源的json数据
 *
 * @param {string} name 资源号
 * @param {Object} params 相关参数
 * @param {Function} onsuccess 成功回调
 * @param {Function} onerror 错误回调
 * @return {Promise} jquery的Promise对象
 */
Datasource.prototype.get = function (name, params, onsuccess, onerror) {
    // 忽略第二个参数，后面的补齐
    if (typeof params === 'function') {
        onsuccess = params;
        onerror = onsuccess;
        params = null;
    }
    return requestJson.call(this, 'get', name, params).then(onsuccess, onerror);
};

/**
 * 发送相关资源的数据
 *
 * @param {string} name 数据类型
 * @param {?Object} params 参数HASH对象
 * @param {Function=} onsuccess 成功回调
 * @param {Function=} onerror 失败回调
 *
 * @return {Promise} jquery的Promise对象
 */
Datasource.prototype.post = function (name, params, onsuccess, onerror) {
    // 忽略第二个参数，后面的补齐
    if (typeof params === 'function') {
        onsuccess = params;
        onerror = onsuccess;
        params = null;
    }
    return requestJson.call(this, 'post', name, params).then(onsuccess, onerror);
};

/**
 * 发送相关资源的数据
 *
 * @param {string} name 数据类型
 * @param {?Object} options jquery的请求参数
 * @return {Promise} jquery的Promise对象
 */
Datasource.prototype.request = function (name, options) {
    options = options || {};
    var onsuccess = options.success;
    var onerror = options.error;
    delete options.success;
    delete options.error;
    return request.call(this, name, options).then(onsuccess, onerror);
};

module.exports = Datasource;
