<template>
    <div >
        <div class="right-nav">
            <div @click="jump('userinfo')" :class="['nav-item',flag==='userinfo'?'addbg':'']">个人信息</div>
            <div @click="jump('recordinfo')" :class="['nav-item',flag==='recordinfo'?'addbg':'']">兑换记录</div>
        </div>
         <div class="user-content">
            <component :is="componentId"></component>
        </div>
    </div>
    <!-- <recordinfo :is="componentId"></recordinfo>     -->   
</template>
<script>
import userinfo from "../components/userinfo"
import recordinfo from "../components/recordinfo"
export default {
    name:'usercenter',
    components:{
        userinfo,
        recordinfo
    },
    data(){
        return{
            routerName:'',
            componentId:userinfo,
            flag:"userinfo"
        }
    },
    methods:{
        
        jump(name){ 
            this.flag=name
            this.componentId = name
        },
        
    },
    
}
</script>
<style lang="scss">
.right-nav{
    height: 100px;
    // width: 1120px;
    align-items: center;
    box-shadow: 0 2px 6px #999;
    display: flex;
    .nav-item{
        font-weight:500;
        font-size: 24px;
        margin: 0 30px;
        padding-bottom: 6px;
    }
};
.user-content{
    width: 1120px;
    margin-top: 20px;
    display: flex;
}
.addbg{
    border-bottom: blueviolet 3px solid;
}
</style>