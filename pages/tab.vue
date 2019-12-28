<template>
  <div class="top">
    <button
      v-for="(item,index) in post"
      :key="index"
      @click="btn(index)"
      :class="{active:num===index}"
    >{{item}}</button>
    <div>
      <ul>
        <li v-for="(item,index) in cate" :key="index" v-show="num===index">{{item}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
    data () {
        return {
            post:['新闻','体育','资讯'],
            cate:['新闻1','体育2','资讯3'],
            
            num:0
        }
    },
    methods:{
        btn(index){
            this.num=index
        }
    }
}
</script>

<style scoped>
.active{
    background-color: red;
}
.top{
    text-align: center;
}
</style>