<template>
  <div class="main">
    <div class="air-column">
      <h2>剩机人</h2>
      <el-form class="member-info">
        <div class="member-info-item" v-for="(item,index) in users" :key="index">
          <el-form-item label="乘机人类型">
            <el-input placeholder="姓名" class="input-with-select" v-model="item.username">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="成人" value="1"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <el-form-item label="证件类型">
            <el-input placeholder="证件号码" class="input-with-select" v-model="item.id">
              <el-select slot="prepend" value="1" placeholder="请选择">
                <el-option label="身份证" value="1" :checked="true"></el-option>
              </el-select>
            </el-input>
          </el-form-item>

          <span class="delete-user" @click="handleDeleteUser(index)">-</span>
        </div>
      </el-form>

      <el-button class="add-member" type="primary" @click="handleAddUsers">添加乘机人</el-button>
    </div>

    <div class="air-column">
      <h2>保险</h2>
      <div>
        <div class="insurance-item" v-for="(item,index) in data.insurances" :key="index">
          <el-checkbox
            :label="`${item.type}:￥${item.price}/份×1 最高赔付${item.compensation}万`"
            border
            @change="handchangge(item.id)"
          ></el-checkbox>
        </div>
      </div>
    </div>

    <div class="air-column">
      <h2>联系人</h2>
      <div class="contact">
        <el-form label-width="60px">
          <el-form-item label="姓名">
            <el-input v-model="contactName"></el-input>
          </el-form-item>

          <el-form-item label="手机">
            <el-input v-model="contactPhone" placeholder="请输入内容">
              <template slot="append">
                <el-button @click="handleSendCaptcha" :disabled="disable">{{conunt}}</el-button>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="验证码">
            <el-input v-model="captcha"></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" class="submit" @click="handleSubmit">提交订单</el-button>
        <span>{{totalprice}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
     props:['data'],
    data () {
        return {
              users:[{
               username:'',
               id:''
           }],
           insurances:[], //保险id
           contactName:'', //联系人名字
           contactPhone:'', //联系人电话
           captcha:'', //手机验证码
           invoice:false, //是否需要发票
           seat_xid:'', //座位id
           air:'',   //航班id
            conunt:'发送验证码',
            disable:false,
            times:false                
        }        
    },
    methods: {
        // 添加乘机人
        handleAddUsers(){
            this.users.push({ username:'',
               id:''})                               
        },      
        // 移除乘机人
        handleDeleteUser(index){
            this.users.splice(index,1)           
        },       
        // 发送手机验证码
        handleSendCaptcha(){

// 验证码倒计时
var time=5
this.times=setInterval(() => {
    
if(time==0){
  this.$axios({
                url:'/captchas',
                method:'POST',
                data:{
                    tel:this.contactPhone
                }                 
                }).then(res=>{
                    console.log(res) 
                // this.captcha=res.data.code
                this.$message('000000')
            })          
    this.conunt='发送验证码',
    this.disable=false
     clearInterval(this.times)
       
    return;
}else if(this.contactPhone.length===11){
    this.conunt='重新发送'+ time
    this.disable=true
    time--
    return; 
}
  
}, 1000)

 


          
        },
       
        
// 保险处理
handchangge(id){
let bxid=this.insurances.indexOf(id)
if(bxid>-1){
    this.insurances.splice(bxid,1)
}else{
    this.insurances.push(id)
}
},


        // 提交订单
        handleSubmit(){   
let data={
           users:this.users,
           insurances:this.insurances, //保险id
           contactName:this.contactName, //联系人名字
           contactPhone:this.contactPhone, //联系人电话
           captcha:this.captcha, //手机验证码
           invoice:false, //是否需要发票
           seat_xid:this.$route.query.seat_xid, //座位id
           air:this.$route.query.id   //航班id
        } 
        this.$axios({
            url:'/airorders',
            method:'POST',
            headers:{
                Authorization:'Bearer '+ this.$store.state.user.userinfo.token              
            },
            data
        }).then(res=>{
            console.log(res);
            this.$router.push({
              // path:'/air/pay',
              path:`/air/pay?id=${res.data.data.id}`,
              // query:{
              //   id:res.data.data.id             
              // }
            })
            
        })
          //  console.log(this.$store.state.user.userinfo.token);              
},
           

        },
        // 计算价格
computed: {
totalprice(){
  let price =0
  if(!this.data.seat_infos.org_settle_price) return; 
  // 机票价格
  price += this.data.seat_infos.par_price;
  // 保险费用
  price += this.insurances.length*30 ;
  // 燃油费
  price += this.data.airport_tax_audlet;
  // 购买多个人的价格
  price *= this.users.length;

this.$store.commit('air/allprice',price);
  return ''
}
  
},
       
    }

</script>

<style scoped lang="less">
    .air-column{
        border-bottom:1px #ddd dashed;
        padding-bottom: 20px;   
        margin-bottom: 20px;
    }

    .air-column h2{
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: normal;
    }

    /deep/ .el-select .el-input {
        width: 130px;
    }

    .input-with-select{
        width:590px;
    }

    .input-with-select /deep/  .el-input-group__prepend {
        background-color: #fff;
    }
    .member-info /deep/ .el-form-item{
        margin-bottom:0;
    }

    .member-info-item{
        border-bottom:1px #eee dashed;
        padding-bottom: 20px;
        position: relative;

        &:first-child{
            .delete-user{
                display: none;
            }
        }
    }

    .add-member{
        margin-top:20px;
    }

    .delete-user{
        display: block;
        background:#ddd;
        width:16px;
        height:16px;
        font-size:14px;
        text-align: center;
        line-height: 16px;
        color:#fff;
        cursor: pointer;
        border-radius: 50px;
        position:absolute;
        right:-30px;
        top:50%;
    }

    .insurance{
        > div{
            margin-top:10px;
        }
    }

    .insurance-item{
        margin-bottom: 20px;
    }

    .contact{
        /deep/ .el-input{
            width:50%;
        }
    }

    .submit{
        margin: 50px auto;
        display: block;
        width:250px;
        height:50px;
    }
</style>
