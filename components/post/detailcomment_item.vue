<template>
  <div class="commentlist" @mouseenter="enter" @mouseleave="enters">
    <mycomment v-if="facomment.parent" :facomment="facomment.parent" @replay="sendsomment" />
    <div class="commenthead">
      <div class="left">
        <span>{{facomment.account.nickname}}</span>
        <span>{{facomment.updated_at|datatime}}</span>
      </div>
      <div>{{facomment.account.id}}</div>
    </div>
    <div class="commentcontent">{{facomment.content}}</div>
    <span class="huifu" v-if="isflase" @click="sendsomment(facomment)">回复</span>
  </div>
</template>
<script>
import {datatime} from "../../components/filter/filter.js"
export default {
  // 注册当前组件
  name:'mycomment',
  props: ['facomment'],
  
 filters:{
    datatime
  },
    data () {
        return {
            isflase:false
        }
    },

methods: {
    enter(){
        this.isflase=true
      
        
    },
    enters(){
       this.isflase=false
    },
    sendsomment(facomment){
      this.$emit('replay',facomment)
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