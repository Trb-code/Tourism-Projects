<template>
  <div class="container">
    <div class="main">
      <div class="pay-title">
        支付总金额
        <span class="pay-price">￥ {{paydata.price}}</span>
      </div>
      <div class="pay-main">
        <h4>微信支付</h4>
        <el-row type="flex" justify="space-between" align="middle" class="pay-qrcode">
          <div class="qrcode">
            <!-- 二维码 -->
            <canvas id="qrcode-stage"></canvas>
            <p>请使用微信扫一扫</p>
            <p>扫描二维码支付</p>
          </div>
          <div class="pay-example">
            <img src="http://157.122.54.189:9093/images/wx-sweep2.jpg" alt />
          </div>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcode";
export default {
    data () {
        return {
            paydata:{
           payInfo:{},
          times:false
            }
        }
    },
    // 查询付款状态
    methods: {
      checkpay(){
  this.times= setInterval(() => {
  this.$axios({
  url:'/airorders/checkpay',
  method:'post',
  data:{
    id:this.paydata.id,
    nonce_str:this.paydata.payInfo.nonce_str,
    out_trade_no:this.paydata.payInfo.order_no
  },
  headers:{
    Authorization:'Bearer '+ this.$store.state.user.userinfo.token 
  }

      }).then(res=>{
        console.log(res);
        if(res.data.statusTxt!=='订单未支付'){
this.$alert('支付成功','温馨提示')
          clearInterval(this.times)
        }
      })
}, 3000);
      }
      
    },


    mounted(){

        setTimeout(v => {

 this.$axios({
            url:`/airorders/${this.$route.query.id}`,
             headers:{
                Authorization:'Bearer '+ this.$store.state.user.userinfo.token              
            }
        }).then(res=>{
            console.log(res);
            this.paydata=res.data

        const canvas=document.querySelector('canvas')
         QRCode.toCanvas(canvas, res.data.payInfo.code_url, {width:250} , function (error) {
            if (error) console.error(error)
            console.log('QRCode success!');
          })         
        })            
        }, 1);
        this.checkpay()
    },
    // 销毁定时器    
    destroyed(){
        // 组件卸载时候清除定时器
        clearInterval(this.timer);
    }    
    
    
}
</script>

<style scoped lang="less">
.container{
    background:#f5f5f5;
    padding: 30px 0;

    .main{
        width:1000px;
        margin:0 auto;

        .pay-title{
            text-align: right;
            span{
                font-size:28px;
                color:orangered;
            }
        }

        .pay-main{
            background:#fff;
            margin-top:10px;
            border-top: 5px orange solid;
            padding:30px;

            h4{
                font-size: 28px;
                font-weight: normal;
                margin-bottom: 10px;
            }

            .pay-qrcode{
                padding:0 80px;
            }

            .qrcode{
                border:1px #ddd solid;
                padding:15px;
                height: fit-content;

                #qrcode-stage{
                    width:200px;
                    height:200px;
                    margin-bottom: 10px;
                }

                p{
                    line-height: 2;
                    text-align: center;
                }
            }
        }
    }
}
</style>