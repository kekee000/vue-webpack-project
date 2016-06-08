<!-- 带选择提示的 select 组件 -->

<template>
    <div class="suggest-select-component"></div>
</template>
<script>

module.exports = {
    props: ['text', 'value', 'options'],
    data: function () {
        if (!this.options) {
            this.options = {};
        }

        if (!this.options.placeholder) {
            this.options.placeholder = '请输入名称'
        }

        // 设置处理数据函数
        if (!this.options.dataResolver) {
            this.options.dataResolver = function (data) {
                return (data || []).map(function(item) {
                    item.text = item.name
                        + (item.nickname ? '(' + item.nickname + ')' : '');
                    item.value = item.id;
                    return item;
                })
            }
        }
        return {}
    },
    replace: true,
    ready: function() {
        this.refresh();
        this.$watch('value', function () {
            this.refresh()
        })
    },
    methods: {
        refresh: function() {
            var self = this;
            var options = self.value
                ? '<option value="'
                    + self.value
                    + '" selected="selected">'
                    + self.text
                    + '</option>'
                : ''
            var component = $(this.$el).html(
                  '<select class="suggest-select">'
                +  options
                + '</select>'
            );

            component.find('.suggest-select').select2({
                placeholder: self.options.placeholder,
                language: 'zh-CN',
                ajax: {
                    url: self.options.url,
                    dataType: 'json',
                    delay: 250,
                    cache: true,
                    data: function (params) {
                      return {
                        query: params.term,
                        page: params.page
                      };
                    },
                    processResults: function(res) {
                        return {
                            results: self.options.dataResolver(res.data)
                        };
                    }
                },
                minimumInputLength: this.minimumInputLength || 1
            })
            .on('change', function() {
                var val = $(this).val() || '';
                // 这里需要等 select2 组件改变值之后设置 value
                setTimeout(function () {
                    var select = component.find('select')[0];
                    var text = select.options[select.selectedIndex].text;
                    self.$set('text', text);
                    self.$set('value', val);
                }, 10)

            });
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.suggest-select-component
    min-width: 200px
    display: inline-block
    select
        width: 100%
    .select2-container--focus
        .select2-selection--single
            border-color: $-base-color

</style>
