<template>
  <h3>{{title|reverse}}</h3>
  <p>{{errorMessage}}</p>
  <tooltip v-ref:tooltip></tooltip>
</template>

<script>
var datasource = require('../datasource')
module.exports = {
  components: {
     Tooltip: require('./components/Tooltip.vue'),
  },
  data: function() {
      return {
          message: 'test message'
      }
  },
  computed: {
    errorMessage: function () {
      return '<em>' + this.message + '<em>'
    }
  }
  ready: function () {
    // do ready
  },
  destroy: function () {
  },
  methods: {
    refresh: function (page) {
    }
  },
  events: {
      'tooltip:show': function () {
          // TODO
      },
      'change': 'refresh'
  },
  route: {
    canReuse: false
  }
}
</script>

<style lang="stylus">
@import '../css/def.styl'
</style>
