<template>
  <!-- 旅游攻略 左边栏 -->
  <div>
    <div class="postaside">
      <div class="leftcity">
        <ul>
          <li
            v-for="(item,index) in cictydata"
            :key="index"
            @mouseenter="handenter(index)"
            :class="{active:active===index}"
          >
            {{item.type}}
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>

        <!-- 列表-->
        <div class="datalist" v-if="actives" @mouseleave="handleave">
          <ul>
            <li v-for="(item,index) in cictydata[indexData].children " :key="index">
              <span style="hover{text-decoration: none}">{{index+1}}</span>
              &nbsp;
              <nuxt-link :to="`/post?city=${item.city}`">
                <span>{{item.city}}</span>
                <span>{{item.desc}}</span>
              </nuxt-link>
            </li>
          </ul>
        </div>
      </div>
      <span class="citcy">推荐城市</span>
      <img src="http://157.122.54.189:9093/images/pic_sea.jpeg" alt />
    </div>
  </div>
</template>

<script>
export default {
  
    data () {
        return {
            // 总数据
            cictydata:[],         
            active:false,
            actives:false,
            indexData:0,
        }
    },methods: {
       
        // 鼠标移入
        handenter(index){
            this.active=index
            // console.log(index);
            this.indexData=index
            this.actives=true            
        },
        // 鼠标移出
        handleave(){
  this.active=false
    this.actives=false
        }
    },

    mounted(){
        // 左边列表数据
        this.$axios({
            url:'/posts/cities'
        }).then(res=>{
            // console.log(res);
      this.cictydata = res.data.data
      res.data.data             
        })
    }

}
</script>

<style scoped lang='less'>
.postaside{
  width: 260px;
}

.datalist{ 
    width: 350px;
    
    position: relative;
    top: -186px;
    // left: 527px;
    left: 261px;
    // margin-top: 22px;
    background-color: #fff;
   
    >ul{  
          
         border: 1px solid #dddddd;
         border-left: #ffff
    }
    li{
        padding-top: 13px;
        span:nth-child(1){
          // display: block;
          color: #ffa500;
          font-size: 18px;
        padding-left: 6px;
        padding-right:  6px;
        font-style: italic;
cursor: pointer;
&:hover{
  text-decoration: underline;
}
        };
nuxt-link{
          >span {
           color: #ffa500;
          font-size: 16px;           
 padding-left: 14px;
        padding-right:  6px;
       font-size: 22px;
       font-style: italic;
        }
         
          &:hover{
             text-decoration: underline;
          }
         
}
    }
}
.active{
    border-right: #fff !important;
    color: #ffa500;
     
}
.leftcity{
    
          height: 200px;
                     
>ul{     
         width: 260px;      
         border-bottom:  1px solid #dddddd !important;  
        margin-bottom: 20px;       
        margin-top: 22px;
        //  border: 0.5px solid #dddddd;
           border-left: 1px solid #dddddd;
           border-top: 1px solid #dddddd;
           
      
         
 
    >li{ 
      //  border-bottom:  1px solid #dddddd !important;          
      padding-right: 10px;
      padding-left: 10px;
         justify-content: space-between;
          display: flex;
          align-items: center;       
        height: 40px;
        line-height: 20px;
        // border: 1px solid #dddddd;             
        border-bottom: 1px solid #dddddd;
        border-right: 1px solid #dddddd;
       
       
    }
}}
img{
    border-top: 1px solid #ddd;
padding-top: 10px;
    margin-top: 10px;
    width: 260px;
    height: 174px;
}
</style>