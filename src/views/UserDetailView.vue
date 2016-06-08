<template>
    <div class="main-crumb">排序 &gt; 用户信息</div>
    <h2 class="main-title">用户信息</h2>
    <section class="main-container">
        <h2 class="gap-top-large gap-bottom-large">基本资料</h2>
        <user-add></user-add>
    </section>
</template>
<script>
module.exports = {
    data: function () {
        return {
            id: this.$route.query.id || ''
        };
    },
    components: {
        UserAdd: require('./user/Add.vue')
    },
    ready: function () {
    },
    route: {
        canReuse: false
    }
}
</script>
<style lang="stylus">

</style>
