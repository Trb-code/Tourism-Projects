<template>
  <div class="filters">
    <el-row type="flex" class="filters-top" justify="space-between" align="middle">
      <el-col :span="8">
        单程：
        {{data.info.departCity}} - {{data.info.destCity}}
        /
        {{data.info.departDate}}
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airport" placeholder="起飞机场">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.airport"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="flightTimes" placeholder="起飞时间">
          <el-option
            :label="`${item.from}:00-${item.to}:00`"
            :value="`${item.form}, ${item.to}`"
            v-for="(item,index) in data.options.flightTimes"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="company" placeholder="航空公司">
          <el-option
            :label="item"
            :value="item"
            v-for="(item,index) in data.options.company"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
      <el-col :span="4">
        <el-select size="mini" v-model="airSize" placeholder="机型">
          <el-option
            :label="item.label"
            :value="item.value"
            v-for="(item,index) in flightSize"
            :key="index"
          ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <div class="filter-cancel">
      筛选：
      <el-button type="primary" round plain size="mini" @click="handleFiltersCancel">撤销</el-button>
    </div>
    <span>{{filterData}}</span>
  </div>
</template>

<script>
export default {
  props:['data'],
    data(){
        return {
            airport: "",        // 机场
            flightTimes: "",    // 出发时间
            company: "",        // 航空公司
            airSize: "",        // 机型大小
             // 飞机的大小
            flightSize: [
                { label: "大", value: "L" },
                { label: "中", value: "M" },
                { label: "小", value: "S" }
            ]
        }
          
    },
   
    // 实现多选
    computed: {
   filterData(){
            const arr = this.data.flights.filter(item => {
                // 默认每条数据都是符合条件
                let valid = true;

                if(this.airport && item.org_airport_name !== this.airport){
                    valid = false;
                }

                // 起飞时间
                if(this.flightTimes){
                    const [from, to] = this.flightTimes.split(",");
                    // 出发时间的小时
                    const start = +item.dep_time.split(":")[0];
                   if(start < from || start >= to){
                       valid = false;
                   }
                }

                if(this.company && item.airline_name !== this.company){
                    valid = false;
                }

                if(this.airSize && item.plane_size !== this.airSize){
                    valid = false;
                }

                return valid;
            })

            this.$emit("setarr", arr);

            // 为了页面渲染空的字符串
            return "";
        }
    },
    
    
    methods: {
       

         // 选择航空公司时候触发
  //       handleCompany(value){
  //         console.log(this.data);

  // let arr = this.data.flights.filter(function(v){
  //       return value===v.airline_name

  //     })
  //     this.$emit('setarr',arr)
  //     console.log(arr);              
  //       },
         // 选择机型时候触发
        // handleAirSize(value){
           
        // },
        
        // 撤销条件时候触发
        handleFiltersCancel(){
            
        },
    }
}
</script>

<style scoped lang="less">
    .filters{
        margin-bottom:20px;
    }

    .filters-top{
        > div{
            /deep/ .el-select{
                margin-left:10px;
            }
        }
    }

    .filter-cancel{
        margin-top:10px;
    }
</style>