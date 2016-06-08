<template>
<div class="tooltip right tooltip-form-control">
  <div class="tooltip-arrow"></div>
  <div class="tooltip-inner">
    <p>{{message}}</p>
  </div>
</div>
</template>

<script>
  module.exports = {
    props: ['message']
  }
</script>
<style lang="stylus">

.tooltip.tooltip-form-control
    bottom: 0
    opacity: 0
    display: none
    left: 100%
    white-space: nowrap
    p
        margin-bottom: 0
        line-height: 30px
    .tooltip-inner
        background: #a94442
    .tooltip-arrow
        border-right-color: #a94442

.form-group,
.form-inline
    position: relative
    &.has-error
        .tooltip-form-control
            opacity: 1
            display: block
            filter: none
</style>
