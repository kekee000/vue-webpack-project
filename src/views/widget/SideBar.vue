<template>
  <section v-if="role!='visitor'" class="sidebar">
    <a v-if="role=='admin'"
      class="{{ cur == 'user' ? 'cur' : ''}}" v-link="{ name: 'userlist' }">成员管理</a>
    <a class="{{ cur == 'profile' ? 'cur' : ''}}" v-link="{ name: 'profile' }">个人信息</a>
  </section>
</template>

<script>
module.exports = {
  props: ['cur'],
  data: function () {
    return {
      role: this.$root.user.role
    }
  }
}
</script>

<style lang="stylus">
@import '../../css/def.styl'
.sidebar
  position: fixed
  top: $-nav-height
  left: 0
  bottom: 0
  width: $-side-width
  background: #fff
  a
    display: block
    line-height: 62px
    font-size: 16px
    color: #8b8d93
    box-sizing: border-box
    text-align: center
    &:hover
      color: $-base-color
      text-decoration: none
    &.cur
      color: $-base-color
      text-decoration: none
      border-left: 4px solid $-base-color
      background: $-bg-color
      text-indent: -4px

</style>
