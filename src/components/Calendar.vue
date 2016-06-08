<template>
<section class="calendar-panel">
    <div class="month-list">
        <div class="calendar-actions"><slot name="actions"></slot></div>
        <span @click="goPrev" class="glyphicon glyphicon-circle-arrow-left"></span>
        <span class="gap-left-large gap-right-large">{{now}}</span>
        <span @click="goNext" class="glyphicon glyphicon-circle-arrow-right"></span>
    </div>
    <hr>
    <table class="date-calendar">
        <thead>
            <tr>
                <td>日</td><td>一</td><td>二</td><td>三</td><td>四</td><td>五</td><td>六</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in days">
                <td v-for="day in row">
                    <div class="date-item {{day.day ? '' : 'date-item-empty'}} {{day.selected ? 'cur' : ''}}"
                        title="{{day.event && day.event.name}}"
                        :style="{background: day.event && day.event.color}"
                        @click="doSelect(day)">
                        <div class="day">{{day.day || '&nbsp;'}}</div>
                        <div v-if="day.event" class="tip">{{day.event.tip}}</div>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</section>
</template>
<script>

// 解析形如 `yyyy-M[M]-d[d] H[H]:m[m]:s[s]` 的日期
// IE6,7,8 直接解析会出现问题，需要单独设置下
var parseTime = (function () {
    var parsed = Date.parse('1970-01-01 00:00:00');
    return parsed ? function (time) {
        return new Date(Date.parse(time));
    }
    : function (time) {
        if (time instanceof Date) {
            return new Date(time);
        }

        var parts = time.split(' ');
        var date = new Date();
        var part = parts[0].split('-');

        date.setUTCFullYear(+part[0], +part[1] - 1, +part[2] - 1);

        if (parts[1]) {
            part = parts[1].split(':');
            date.setHours(+(part[0] || 0), +(part[1] || 0), +(part[2] || 0), 0);
        }
        else {
            date.setHours(0, 0, 0, 0);
        }

        return date;
    };
})();

function getDays(date) {
    var date1 = new Date(date)
    var year = date.getFullYear()
    var month = date.getMonth()
    date1.setMonth(month + 1)
    date1.setDate(0)
    var days = date1.getDate()
    var start = date.getDay()
    var end = Math.ceil((start + days) / 7) * 7 - (start + days)
    var ret = []
    for (var i = 0; i < start; i++) {
        ret.push({})
    }
    for (var i = 1; i <= days; i++) {
        ret.push({
            day: i,
            date: year + '-' + (month + 1) + i,
            key: year * 10000 + (month + 1) * 100 + i,
            selected: 0
        })
    }
    for (var i = 0; i < end; i++) {
        ret.push({})
    }
    return ret
}

function getDayCalendar(date, eventsHash) {
    var days = getDays(date)
    var ret = []
    var length = days.length
    var i = 0
    while(i < length) {
        ret.push(days.slice(i, i + 7).map(function (item) {
            if (item.key && eventsHash[item.key]) {
                item.event = eventsHash[item.key]
            }
            return item
        }))
        i+=7
    }
    return ret
}


module.exports = {
    props: ['events', 'date'],
    data: function () {
        return {
            now: '',
            days: []
        }
    },
    ready: function () {
        this.$watch('date', $.proxy(function() {
            var eventsHash = {}
            if (this.events) {
                this.events.forEach(function (item) {
                    var date = parseTime(item.date)
                    var key = date.getFullYear() * 10000
                        + (date.getMonth() + 1) * 100
                        + date.getDate()
                    eventsHash[key] = item
                })
            }
            this.eventsHash = eventsHash
            this.offset = 0
            var date = parseTime(this.date)
            this.now = date.getFullYear() + '年' + (date.getMonth() + 1) + '月';
            this.days = getDayCalendar(date, eventsHash)
        }, this))
    },
    methods: {
        goNext: function () {
            var date = parseTime(this.date)
            date.setMonth(date.getMonth() + 1)
            this.date = date
            this.$dispatch('calendar:select', {days:[]})
        },
        goPrev: function () {
            var date = parseTime(this.date)
            date.setMonth(date.getMonth() - 1)
            this.date = date
            this.$dispatch('calendar:select', {days:[]})
        },
        doSelect: function (day) {
            if (day.key) {
                day.selected = !day.selected
            }
            var list = []
            this.days.forEach(function (row) {
                row.forEach(function (day) {
                    if (day.selected) {
                        list.push(day)
                    }
                })
            })
            this.$dispatch('calendar:select', {
                days: list
            })
        }
    }
}
</script>
<style lang="stylus">
@import '../css/def.styl'
.calendar-panel
    font-size: 20px
    max-width: 740px
    .month-list
        color: $-base-color
        user-select: none
        .glyphicon
            cursor: pointer
            &:hover
                color: darken($-base-color, 10%)
    .calendar-actions
        float: right
    .date-calendar
        width: 100%
        text-align: center
        thead
            color: $-base-color
            line-height: 50px
        tbody
            td
                padding: 9px
                vertical-align: top
            .date-item
                background: #c6c7ca
                border-radius: 4px
                border: 1px solid #ceced1
                height: 96px
                padding-top: 4px
                cursor: pointer
                &.cur
                    color: $-base-color
                    background: darken($-base-color, 20%)!important
                .day
                    background: #fff
                    border-radius: 6px 6px 12px 12px
                    font-size: 32px
                    line-height: 68px
                .tip
                    color: #fff
                    line-height: 24px
                    font-size: 16px
            .date-item-empty
                background: #eee
                border-color: #ddd
                cursor: not-allowed
                .day
                    background: none
</style>
