<template>
<ul class="tab-component">
    <li v-for="item in list"
        :class="{cur: item.value == value}"
        @click="doSwitch(item)">{{ item.text }}</li>
</ul>
</template>
<script>
module.exports = {
    props: ['list', 'value'],
    methods: {
        doSwitch: function(item) {
            if (item.value === this.value) {
                return;
            }
            this.value = item.value;
            this.$dispatch('tab:change', {
                selected: item
            });
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.tab-component
    height: 49px
    line-height: 47px
    border-bottom: 2px solid $-base-color
    list-style: none
    li
        display: inline-block
        color: $-base-color
        padding: 0 30px
        color: #333
        cursor: pointer

        &.cur
            background: #fff
            border: 2px solid $-base-color
            padding: 0 28px
            border-bottom: none
            color: $-base-color

</style>
