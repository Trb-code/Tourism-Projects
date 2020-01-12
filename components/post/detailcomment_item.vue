<template>
  <div class="commentlist" @mouseenter="enter" @mouseleave="enters">
    <div class="commenthead">
      <div class="left">
        <span>{{facomment.account.nickname}}</span>
        <span>{{facomment.updated_at|datatime}}</span>
      </div>
      <div>{{facomment.account.id}}</div>
    </div>
    <div class="commentcontent">{{facomment.content}}</div>
    <span class="huifu" v-if="isflase">回复</span>
  </div>
</template>

<script>
import {datatime} from "../../components/filter/filter.js"
export default {
 filters:{
    datatime
  },
    data () {
        return {
            isflase:false
        }
    },
props: ['facomment'],
methods: {
    enter(){
        this.isflase=true
    },
    enters(){
       this.isflase=false
    }
}
}
</script>
<style scoped lang='less'>
.huifu{
  cursor: pointer;
  position: relative;
  top: -19px;
  left: 680px;
  font-size: 12px;
  color: #007acc;
 
 
}
.commentlist{
  // position:absolute ;
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