<template>
    <div v-if="loading" class="table-list-loading">
       {{loadingText}}
    </div>
    <div v-if="!loading && !records" class="table-list-norecord">
        {{noRecordText}}
    </div>
</template>
<script>
module.exports = {
    props: ['loading', 'records', 'loadingText', 'noRecordText'],
    data: function () {
        this.loadingText = this.loadingText || '正在加载...'
        this.noRecordText = this.noRecordText || '暂无相关记录'
        return {}
    }
}
</script>
<style lang="stylus">
.table-list-norecord,
.table-list-loading
    line-height: 100px
    color: #ccc
    text-align: center

</style>
