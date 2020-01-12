<template>
  <div class="drafts">
    <div v-for="(item,index) in $store.state.post.draft" :key="index">
      草稿箱(
      <span>{{$store.state.post.draft.length}}</span>&nbsp;)
      <div>
        <div class="resume" @click="drafts(item)">
          {{item.textarea}}
          <i class="el-icon-edit"></i>
        </div>
        <div>2019-02-20</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
methods: {
  drafts(item){
    this.$emit('cl',item)

  }
}

}
</script>

<style scoped lang="less">
.drafts{
    width: 200px;
    margin-top: 20px;
    margin-left: 60px;
    border: 1px solid #cccccc
}
.resume{
    cursor: pointer;
    &:hover{
        color: #f4c47e
    }
}

</style>