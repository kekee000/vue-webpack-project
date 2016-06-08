<template>
    <div class="user-select-component"></div>
</template>
<script>

module.exports = {
    props: ['users', 'value', 'url', 'maxSelectCount', 'tags'],
    replace: true,
    ready: function() {
        this.refresh(this.users || []);
    },
    methods: {
        refresh: function(selectedList) {
            var self = this;
            self.$set('value', selectedList.map(function(item) {
                return item.id;
            }).join());

            var component = $('.user-select-component').html(
                '<select class="user-select" multiple="multiple"></select>');
            component.find('.user-select').select2({
                tags: self.tags || false,
                placeholder: '请输入成员名',
                language: 'zh-CN',
                debug: true,
                data: selectedList.map(function(item) {
                    item.text = item.name;
                    item.value = item.id;
                    item.selected = true;
                    return item;
                }),
                ajax: {
                    url: self.url,
                    dataType: 'json',
                    delay: 250,
                    cache: true,
                    processResults: function(res) {
                        return {
                            results: (res.data || []).map(function(item) {
                                item.text = item.name
                                    + (item.nickname ? '(' + item.nickname + ')' : '');
                                item.value = item.id;
                                return item;
                            })
                        };
                    }
                },
                minimumInputLength: this.minimumInputLength || 2,
                maximumSelectionLength: this.maxSelectCount || 10
            })
            .on('change', function() {
                var val = $(this).val() || [];
                self.$set('value', val.join());
            });
        },
        getValue: function () {
            return this.$get('value');
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.user-select-component
    min-width: 160px
    display: inline-block
    select
      width: 100%
    input
        border: none
        padding-left: 15px
        width: 222px
        &:focus
            outline: none
    .select2-container--focus .select2-selection--multiple
        border-color: $-base-color

</style>
