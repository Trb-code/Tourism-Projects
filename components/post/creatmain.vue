<template>
  <div class="main">
    <h4>发表新攻略</h4>
    <span style="font-size:13px;padding-bottom:10px">分享你的个人游记，让更多人看到哦！</span>
    <!-- 标题框 -->
    <el-input type="textarea" :rows="1" placeholder="请输入标题" v-model="textarea"></el-input>
    <!-- 富文本框 -->
    <VueEditor :config="config" />
  </div>
</template>
<script>

export default {
   
    data () {
        return {
            textarea:'',}
    }}
</script>

<style  scoped lang='less'>

.el-textarea{
    margin: 10px 0
}
h4{
    font-size: 20px
}
</style>