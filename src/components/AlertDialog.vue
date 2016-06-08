<template>
<section class="modal-alert">
    <modal-dialog :title="options.title" :show.sync="show" :options="options">
        <p>{{options.content}}</p>
    </modal-dialog>
</section>
</template>
<script>
module.exports = {
    props: ['options', 'show'],
    components: {
        ModalDialog: require('./ModalDialog.vue')
    },

    events: {
        'dialog:confirm': function () {
            this.show = false
            this.$dispatch('alert:confirm', {
                content: this.options.content
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.modal-alert
    .modal-dialog
        width: 386px
    .modal-footer
        text-align: left
        .btn
            width: 45%
            &[role="confirm"]
                float: right

</style>
