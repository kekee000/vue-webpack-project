<template>
    <div v-show="total > 1" class="page-bar">
        <ul>
            <li v-if="showFirst"><a v-on:click="btnClick(page-1)">上一页</a></li>
            <li v-for="index in indexs"  v-bind:class="{ 'active': page == index}">
                <a v-on:click="btnClick(index)">{{ index }}</a>
            </li>
            <li v-if="showLast"><a v-on:click="btnClick(page+1)">下一页</a></li>
            <li>
                <a>共<i>{{total}}</i>页</a>
            </li>
        </ul>
    </div>
</template>

<script>
module.exports = {
    props: ['total', 'page'],
    computed: {
        indexs: function(){
            var left = 1
            var right = this.total
            var arr = []
            if (this.total >= 11) {
                if (this.page > 5 && this.page < this.total - 4) {
                        left = this.page - 5
                        right = this.page + 4
                }
                else {
                    if (this.page <= 5) {
                        left = 1
                        right = 10
                    }
                    else {
                        right = this.total
                        left = this.total -9
                    }
                }
            }
            while (left <= right) {
                arr.push(left)
                left++
            }
            return arr
        },
        showLast: function(){
            if(this.page == this.total){
                return false
            }
            return true
        },
        showFirst: function(){
            if(this.page == 1){
                return false
            }
           return true
        }
    },
    methods: {
        btnClick: function(data) {//页码点击事件
            this.page = data
            this.$dispatch('pager-change', data)
        }
    }
}
</script>

<style lang="stylus">
@import '../css/def.styl'
.page-bar li:first-child > a
    margin-left: 0px

.page-bar
    padding-top: 20px

    ul,li
        margin: 0px
        padding: 0px
        text-align: right
        font-size: 0

    li
        list-style: none
        display: inline-block

    a
        border: 1px solid #ddd
        text-decoration: none
        position: relative
        display: block
        padding: 6px 12px
        margin-left: -1px
        font-size: 13px
        line-height: 1.42857143
        color: #666
        cursor: pointer
        &:hover
            background-color: #eee
    .active
        a
            color: #fff
            cursor: default
            background-color: $-base-color
            border-color: $-base-color

    i
        font-style:normal
        color: #d44950
        margin: 0px 4px
        font-size: 12px

</style>
