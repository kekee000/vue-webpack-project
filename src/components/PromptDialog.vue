<template>
<section class="modal-prompt">
    <modal-dialog :title="options.title" :show.sync="show">
        <div class="form-group gap-left gap-right gap-bottom-small">
            <div class="prompt-text gap-bottom">{{{ options.text }}}</div>
            <textarea
                v-model="content" class="form-control"
                :placeholder="options.placeholder">
            </textarea>
        </div>
    </modal-dialog>
</section>
</template>
<script>
module.exports = {
    props: ['options', 'show'],
    components: {
        ModalDialog: require('./ModalDialog.vue')
    },

    data: function () {
        this.options = this.options || {}
        this.options.text = this.options.text || '确认'
        this.options.text = this.options.text || '请输入原因'
        this.options.placeholder = this.options.placeholder || ''
        return {
            content: this.options.content || ''
        }
    },
    events: {
        'dialog:close': function () {
            this.$dispatch('prompt:close', {
                content: this.content
            })
        },
        'dialog:confirm': function () {
            this.$dispatch('prompt:confirm', {
                content: this.content
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.modal-prompt
    .modal-dialog
        width: 386px
    .modal-footer
        text-align: left
        .btn
            width: 45%
            &[role="confirm"]
                float: right

    .prompt-text
        color: #8b8d93

</style>
