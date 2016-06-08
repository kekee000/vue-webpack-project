<template>
<div class="modal model-component fade" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" @click="show=false"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">{{ title }}</h4>
      </div>
      <div class="modal-body">
          <slot></slot>
      </div>
      <slot name="footer">
          <div class="modal-footer">
            <button v-if="opts.showClose" type="button" role="close" class="btn btn-default"
                @click="close">{{ opts.closeText }}</button>
            <button type="button" role="confirm" class="btn btn-dark"
                @click="confirm">{{ opts.confirmText }}</button>
          </div>
      </slot>
    </div>
  </div>
</div>
</template>
<script>

module.exports = {
    props: ['title', 'show', 'options'],
    data: function () {
        var options = this.options || {};

        return {
            opts: {
                closeText: options.closeText || '关闭',
                confirmText: options.confirmText || '确定',
                showClose: false !== options.showClose
            }
        }
    },
    replace: true,
    ready: function () {
        this.$watch('show', function () {
            if (this.show === true) {
                this.$el.style.display = 'block'
                var self = this
                $(document.body).addClass('modal-open')
                setTimeout(function () {
                    $(self.$el).addClass('in')
                }, 1)
            }
            else {
                var self = this
                $(self.$el).removeClass('in')
                setTimeout(function () {
                    self.$el.style.display = 'none'
                    $(document.body).removeClass('modal-open')
                }, 300)
            }
        })
    },
    methods: {
        close: function () {
            this.show = false;
            this.$dispatch('dialog:close');
        },
        confirm: function () {
            this.$dispatch('dialog:confirm');
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.model-component
    .modal-content
        overflow: hidden
    .modal-header
        background-color: darken($-base-color, 10%)
        color: #fff
        text-align: center
</style>
