<template>
    <div class="recordInfo">
        <div class="record-item" v-for="(item,index) in form" :key="'rec'+index">
            <div class="item-name">{{item.name}}</div>
            <div>{{item.createdAt | formatTime}}</div>
        </div>
    </div>
</template>
<script>
import Moment from 'moment'
export default {   
    name:'recordinfo',
    data(){
        return{
            form:[],
        }
    },
    created() {
        this.getRecordInfo()
    },
    methods: {
        async getRecordInfo(){
            let id = localStorage.getItem('userid')
            const data = await this.yGet('/shop/exchangedRecord',
            {
                params:{id}
            })
            console.log('data===>',data);
            this.form = data
            console.log("form===>",this.form);
        },
        
    },
    filters:{
        formatTime (value) {
            return Moment(value).format('YYYY-MM-DD HH:mm:ss')
        }
    }
}
</script>
<style lang="scss">
    .recordInfo{
        width: 100%;
        padding: 10px 30px;
        .record-item{
            box-sizing: border-box;
            width: 100%;
            height: 100px;
            padding: 30px 10px;
            border-bottom:1px solid #999;
            display: flex;
            justify-content: space-between;
            color:#999;
            .item-name{
                width: 600px;
            }
        }
    }
</style>
