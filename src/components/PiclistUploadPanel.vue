<!--图片上传面板-->
<template>
<div class="piclist-upload-panel">
    <div class="gap-top gap-bottom">
        {{title}}
        <span v-if="!disabled && maxCount!=value.length" class="btn-add gap-left">+</span>
    </div>
    <div class="preview-panel">
        <div class="messgae">{{{ message }}}</div>
        <div v-for="val in value" track-by="$index" class="preview-item">
            <i class="remove glyphicon glyphicon-remove" @click="delPic(val)"></i>
            <img v-if="val" :src="val" @click="preview(val)">
        </div>
    </div>

</div>
</template>
<script>
var datasource = require('../datasource')
module.exports = {
    props: ['disabled', 'title', 'value', 'maxCount', 'params'],
    data: function () {
        this.title = this.title || '请上传照片'
        this.params = this.params || {}
        this.maxCount = this.maxCount || 6
        return {
            message: ''
        }
    },
    ready: function () {
        var self = this
        var uploadUrl = datasource.getUrl('upload')
        uploadUrl = uploadUrl + '?' + $.param(this.params)
        // 初始化Web Uploader
        var uploader = WebUploader.create({
            // 选完文件后，是否自动上传。
            auto: true,
            // swf文件路径
            swf: window.PAGE_DATA.feRoot
                + '/dep/webuploader/dist/Uploader.swf',
            // 文件接收服务端。
            server: uploadUrl,
            // 选择文件的按钮。可选。
            pick: $(this.$el).find('.btn-add')[0],
            // 只允许选择图片文件。
            accept: {
                title: 'Images',
                extensions: 'gif,jpg,jpeg,bmp,png',
                mimeTypes: 'image/*'
            }
        });
        uploader.on('fileQueued', function(file) {
            self.message = '正在上传...'
        });

        uploader.on('uploadAccept', function(file, res) {
            if (res.status == 0) {
                self.value.push(res.data.url || res.data.file);
                self.message='';
            }
            else {
                self.message = res.statusInfo || '上传出错，请重新上传'
            }
        });

        uploader.on( 'uploadError', function(file) {
            self.message = '上传出错，请重新上传'
        });
        uploader.on( 'uploadComplete', function(file) {
            this.removeFile(file)
        });
        this.uploader = uploader;
    },
    beforeDestroy: function () {
        this.uploader && this.uploader.destroy()
        this.uploader = null
    },
    methods: {
        preview: function (url) {
            window.open(url)
        },
        delPic: function (url) {
            var self = this
            datasource.post('upload-del', {
                file: url,
                url: url
            }).then(function () {
                self.value.splice(self.value.indexOf(url), 1)
            },function () {
                self.value.splice(self.value.indexOf(url), 1)
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.piclist-upload-panel
    .btn-add
        padding: 0
        .webuploader-pick
            display: block
            background: none
            padding: 0 20px
            color: #ceced1

    .preview-panel
        background: #f5f5f5
        text-align: center
        overflow: hidden
        position: relative
        height: 180px
        .preview-item
            height: 180px
            padding: 10px
            overflow: hidden
            position: relative
            float: left
            &:hover
                background: darken(#f5f5f5, 5%)
                cursor: pointer
                .remove
                    display: block
            img
                max-height: 160px
                max-width: 98%

        .remove
            display: none
            color: $-base-color
            cursor: pointer
            position: absolute
            top: 5px
            right: 5px
            &:hover
                color: darken($-base-color, 20%)
    .messgae
        position: absolute
        top: 40px
        left: 50%
        transform: translateX(-50%)
        color: $-base-color
        text-align: center

</style>
