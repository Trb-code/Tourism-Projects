<template>
  <div class="commentlist">
    <div class="commenthead">
      <div class="left">
        <span>{{facomment.account.nickname}}</span>
        <span>20190924</span>
      </div>
      <div>{{facomment.account.id}}</div>
    </div>
    <div class="commentcontent">{{facomment.content}}</div>
  </div>
</template>

<script>

export default {
props: ['facomment']
}
</script>
<style scoped lang='less'>
.commentlist{
    margin: 10px;
    background-color:#f9f9f9;
  .commentcontent{
    padding-left: 40px;
  }
  margin-top: 18px;
  border: 2px solid #eee;
  .commenthead{
    padding: 10px;
    display: flex;
    justify-content: space-between
  }
}
</style>