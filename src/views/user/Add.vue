<template>
<validator name="validation" :classes="{ invalid: 'has-error' }">
    <form novalidate class="form-view" @submit.prevent="doSubmit">
        <div class="row">
          <div class="col-md-4">
            <div v-validate-class class="form-group form-group-input">
                <p>真实姓名</p>
                <input v-model="fields.name"
                    :disabled="disabled"
                    class="form-control"
                    initial="off"
                    v-validate:name="['requires']">
                    <tooltip :message="'姓名为2-20个字符'"></tooltip>
            </div>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <div v-validate-class class="form-group form-group-input">
                <p>身份证号</p>
                <input v-model="fields.idCard"
                    :disabled="disabled"
                    class="form-control"
                    initial="off"
                    v-validate:idCard="['required', 'idcard']">
                    <tooltip :message="'请填写身份证号'"></tooltip>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div v-validate-class class="form-group form-group-input">
                <p>性别</p>
                <select v-model="fields.sex" :disabled="disabled" class="form-control small-width">
                    <option>男</option><option>女</option>
                </select>
            </div>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <div v-validate-class class="form-group form-group-input">
                <p>生日</p>
                <input v-model="fields.birthday"
                    :disabled="disabled"
                    class="form-control date-picker"
                    initial="off"
                    v-validate:birthday="['required', 'date']">
                    <tooltip :message="'请填写生日'"></tooltip>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <div v-validate-class class="form-group form-group-input">
                <p>电话</p>
                <input v-model="fields.phone"
                    :disabled="disabled"
                    class="form-control"
                    initial="off"
                    v-validate:phone="['required', 'phone']">
                    <tooltip :message="'请填写电话'"></tooltip>
            </div>
            <div v-validate-class class="form-group form-group-input">
                <p>加盟时间</p>
                <input v-model="fields.joinTime"
                    :disabled="disabled"
                    class="form-control datetime-picker"
                    initial="off"
                    v-validate:joinTime="['required', 'time']">
                    <tooltip :message="'请填写加盟时间'"></tooltip>
            </div>
            <div v-validate-class class="form-group form-group-input">
                <p>所在城市</p>
                <input v-model="fields.city"
                    :disabled="disabled"
                    class="form-control"
                    initial="off"
                    v-validate:city="['required']">
                    <tooltip :message="'请填写城市'"></tooltip>
            </div>
          </div>
          <div class="col-md-4 col-md-offset-1">
            <div v-validate-class class="form-group form-group-input">
                <pic-upload-panel
                    :title="'持证拍摄照片'"
                    :disabled="disabled"
                    :params="{type:'userPhoto',id: fields.id}"
                    :value.sync="fields.photo"></pic-upload-panel>
                <input v-model="fields.photo"
                    type="hidden"
                    initial="off"
                    v-validate:photo="['required']">
                    <tooltip :message="'请上传持证照片'"></tooltip>
            </div>
          </div>
        </div>

        <div class="row">
            <div class="col-md-9 btn-groups">
                <button v-if="!disabled" type="submit" :disabled="!$validation.valid"
                    class="btn btn-dark btn-right">{{ action }}用户</button>
            </div>
        </div>
    </form>
</validator>
<div v-if="!fields.id" style="height: 160px"></div>
</template>
<script>
var datasource = require('../../datasource')
var loading = require('../../loading')

module.exports = {
    components: {
        Tooltip: require('../../components/Tooltip.vue'),
        PicUploadPanel: require('../../components/PicUploadPanel.vue')
    },
    data: function () {
        var id = this.$route.query.id;
        return {
            action: '',
            disabled: !this.$root.isAuth('user:add'),
            fields: {
                id: id,
                name: '',
                idCard: '',
                sex: '男',
                birthday: '',
                phone: '',
                joinTime: '',
                city: '',
                photo: ''
            },
        }
    },
    ready: function () {
        this.action = this.fields.id ? '修改' : '添加'
        if (this.fields.id) {
            this.load(this.fields.id)
        }
        $('.date-picker', this.$el.nextElementSibling)
            .datetimepicker({
                format: 'yyyy-mm-dd',
                language: 'zh-CN',
                todayHighlight: true,
                autoclose: true,
                minView: 2
            })
        $('.datetime-picker', this.$el.nextElementSibling)
            .datetimepicker({
                format: 'yyyy-mm-dd hh:ii',
                language: 'zh-CN',
                todayHighlight: true,
                autoclose: true,
                minView: 1
            })
    },
    methods: {
        fill: function (source, target) {
            Object.keys(source).forEach(function (key) {
                target[key] = source[key]
            })
            return target
        },
        load: function (id) {
            var self = this
            datasource.get('user-get', {id: id})
                .then(function (data) {
                    self.fill(data, self.fields)
                }, function () {
                    loading.show('加载用户信息错误!', 2000, 'error')
                })
        },
        doSubmit: function () {
            this.$validate();
            if (this.$validation.valid) {
                var self = this
                var data = self.fill(self.fields, {})

                datasource.post('user-' + (this.fields.id ? 'modify' : 'add'), data)
                    .then(function (data) {
                        loading.show('保存用户信息成功!', 2000)
                        self.$router.go({
                            name: 'userlist',
                            query: {
                                page: 1
                            }
                        })
                    }, function () {
                        loading.show('保存用户信息错误!', 2000, 'error')
                    })
            }
        }
    }
}
</script>
<style lang="stylus">

</style>
