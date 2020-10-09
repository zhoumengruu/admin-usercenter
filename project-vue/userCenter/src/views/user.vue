<template>
    <div class="user">
        <div class="user-left">
            <div class="avatar">
                <img src="../assets/woman-svg.svg" alt="" >
            </div>
            <span>{{form.nickname}}</span>
            <div class="left-item" @click="jumpUser('usercenter')" :style="{backgroundColor:routerName=='usercenter'?'blueviolet':''}">个人中心</div>
            <div class="left-item" @click="jumpRecord('shop')" :style="{backgroundColor:routerName=='shop'?'blueviolet':''}">积分商城</div>
            <div class="left-item" @click="back">退出</div>
        </div>
        <div class="user-right">
                <router-view></router-view>             
        </div>
    </div>
</template>
<script>

export default {
    name:'user',
    data(){
        return{
            routerName:'usercenter',
            form:{}
        }
    },
    created() {
        this.getUserInfo()
    },
    methods:{
        async getUserInfo(){
            let id = localStorage.getItem("userid")
            // console.log('id===>',id);
            const data = await this.yGet("/user/userinfo",
            {
                params:{id}
            })
            if(data){
                console.log("user data",data)
                this.form = data
                // console.log("获取昵称",this.form);
            }
        },
        jumpUser(name){
            this.routerName = name
            this.$router.push({
                name:'usercenter'
            })

        },
        jumpRecord(name){
            this.routerName = name
            this.$router.push({
                name:'shop'
            })
        },
        back(){
            localStorage.removeItem("userid")
            this.$router.replace({
                name:"login"
            })
        }
        
    }
}
</script>
<style lang="scss">
.user{
    .user-left{
        width: 300px;
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        background-color: #333;
        display: flex;
        flex-direction: column;
        align-items: center;
        .avatar{
            margin: 100px 0 20px 0;
            img{
                width: 120px;
                height: 120px;
            };           
        };
        span{
            color: #fff;
            margin-bottom: 100px;
        };
        .left-item{
            width: 100%;
            height: 60px;
            text-align: center;
            line-height: 60px;
            color: #ffffff;
            font-size: 18px;
        }
    };
    .user-right{
        width: 1120px;
        height: 1000px;
        margin-left: 300px;     
    }
}
.left-item-bg{
    background-color: blueviolet;
}
    
</style>