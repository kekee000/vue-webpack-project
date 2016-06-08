<!--图片上传面板-->
<template>
<div class="pic-upload-panel">
    <div class="gap-top gap-bottom">
        {{title}}
        <span v-if="!disabled" class="btn-add gap-left">+</span>
    </div>
    <div class="preview-panel" @click="value && preview(value)">
        <div v-if="message" class="messgae">{{{ message }}}</div>
        <img v-if="value" :src="value">
    </div>
</div>
</template>
<script>
var datasource = require('../datasource')
module.exports = {
    props: ['disabled', 'title', 'value', 'params'],
    data: function () {
        this.title = this.title || '请上传照片'
        this.params = this.params || {}
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
        uploader.on( 'fileQueued', function(file) {
            self.message = '正在上传...'
        });

        uploader.on( 'uploadAccept', function(file, res) {
            if (res.status == 0) {
                self.value = res.data.url || res.data.file;
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
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.pic-upload-panel
    .btn-add
        padding: 0
        .webuploader-pick
            display: block
            background: none
            padding: 0 20px
            color: #ceced1

    .preview-panel
        position: relative
        height: 180px
        padding: 10px 0
        background: #f5f5f5
        text-align: center
        overflow: hidden
        &:hover
            background: darken(#f5f5f5, 5%)
            cursor: pointer
        img
            max-height: 160px
            max-width: 98%



    .messgae
        position: absolute
        top: 40px
        left: 50%
        transform: translateX(-50%)
        color: $-base-color
        text-align: center

</style>
