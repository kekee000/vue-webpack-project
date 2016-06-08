<template>
    <div class="index-view">
      <div class="login-tip">
        <h2></h2>
      </div>
    </div>
</template>
<script>
module.exports = {

}
</script>
<style lang="stylus">
.index-view
    .login-tip
        width: 610px
        margin: 15% auto 0
        color: #1bd896
        text-shadow: 1px 1px 1px #399467
        h2
            font-size: 45px
        p
            font-size: 25px
            margin-top: 30px
            margin-left: 120px
            &:before
                content: '——'
                letter-spacing: -6px
                margin-right: 4px

</style>
