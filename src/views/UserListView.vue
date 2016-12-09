<template>
    <section class="main-container user-list-view">
        <div class="btn-groups">
            <a v-link="{ name: 'userdetail' }" class="btn btn-dark btn-right">添加用户</a>
        </div>
        <table class="table-list gap-top-fit">
            <thead>
                <tr>
                    <td>真实姓名</td>
                    <td>昵称</td>
                    <td>电话</td>
                    <td>操作</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="row in list">
                    <td><a v-link="{ name: 'userdetail', query:{id: row.id} }" >{{ row.name }}</a></td>
                    <td>{{ row.nickname }}</td>
                    <td>{{ row.phone }}</td>
                    <td class="table-act">
                       <a v-link="{ name: 'userdetail', query:{id: row.id} }" >查看详情</a>
                       <a @click="doDel(row)">删除</a>
                    </td>
                </tr>
            </tbody>
        </table>
        <pager :total="total" :page="page"></pager>
        <loading-status :loading="loading" :records="list.length"></loading-status>
    </section>
</template>
<script>

module.exports = {
    components: {
        LoadingStatus: require('components/LoadingStatus.vue'),
        Pager: require('components/Pager.vue')
    },
    data: function () {
        return {
            query: '',
            list: [],
            page: 1,
            total: 1,
            loading: 1
        };
    },
    ready: function () {
        this.refresh()
    },
    methods: {
        refresh: function () {
            var self = this;
            this.$datasource.get('user-list', {
                page: self.page,
                query: self.query
            }).then(function (data) {
                self.loading = 0
                self.list = data.list;
                self.page = data.page;
                self.total = data.total;
            });
        },
        doSearch: function () {
            this.page = 1
            this.refresh()
        },
        doDel: function (row) {
            if (!confirm('确定删除么！')) {
                return;
            }
            var self = this
            this.$datasource.post('user-del', {id: row.id})
                .then(function (data) {
                    self.list.splice(self.list.indexOf(row), 1)
                }, function (reason) {
                    loading.show(reason.statusInfo || '删除失败!', 2000, 'error')
                })
        }
    },
    events: {
        'pager-change': function (page) {
            this.page = page;
            this.refresh();
        }
    }
}
</script>
<style lang="stylus">
.user-list-view
    .table-list
        td
            >p
                margin-bottom: 0

</style>
