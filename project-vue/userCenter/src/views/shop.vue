<template>
    <div>
        <div class="header">商城</div>
        <div class="user-content">
            <div class="shop-top">
                <h1>当前积分</h1>
                <h1>{{form.integration}}</h1>
            </div>
            <h4>商品列表</h4>
            <div class="pro-list">
                <div class="pro-item" v-for="(item,index) in itemList" :key= "'11'+ index">                                         
                        <img :src="item.image" alt="" class="itemImg">
                        <div class="item-name">{{item.name}}</div>
                        <div class="pro-buttom"> 
                            <img src="../assets/lALPGpqNb346hSYeHg_30_30.png_720x720g.jpg" alt="">
                            <span class="text">{{item.price}}积分</span>
                            <div class="rec-btn">
                                <el-button @click="exchangePro(item)" >兑换</el-button>
                            </div>
                        </div>                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'recordinfo',
    data(){
        return{
            itemList:[],
            form:{}
        }
    },
    created(){
        this.getUserInfo(),     
        this.getShopList()
    },
    methods:{
        async getUserInfo(){
            let id = localStorage.getItem("userid")
            // console.log('id===>',id);
            const data = await this.yGet("/user/userinfo",
            {
                params:{id}
            })
            // console.log('data===>',data);
            if(data){
                // console.log("user data",data)
                this.form = data
            }
        },
        async getShopList(){
            const data = await this.yGet("/shop/shopList")
            this.itemList = data
            // console.log("商品item",this.itemList);
        },
        async exchangePro(item){
            // console.log("商品的id",item);
            let params = {
                id:item._id
            }
            // console.log("params===>",params);
            const data = await this.yPut('/shop/exchange',params)
            // console.log('兑换商品',data);
            if(data){
                
                this.$message({
                type: 'success',
                message: '兑换成功!'
                });
                this.getUserInfo()
            }
        },
         
    }
}
</script>
<style lang="scss">
    .header{
        box-sizing: border-box;
        height: 50px;
        padding: 15px;
        box-shadow: 0 2px 4px #999;
    }
    .user-content{
        box-sizing: border-box;
        width: 1120px;
        margin-top: 20px;
        display: flex;
        padding: 0 50px;
        display: flex;
        flex-direction: column;
        .shop-top{
            // width: 1120px;
            height: 160px;
            background-image: url(../assets/jifen-background.png);
            h1{
                text-align: center;
                color: white;
            }
        };
        .pro-list{           
            display: flex;
            flex-wrap: wrap;
            .pro-item{
                width: 250px;
                // height: 300px;
                margin: 30px;
                border-radius: 10px;
                padding: 10px;
                box-shadow: 0px 2px 4px #333;
                box-sizing: border-box;

                .itemImg{
                    width: 230px;
                    height: 230px;
                    // border: 1px solid #000;
                };
                .item-name{
                    height: 50px;
                    overflow: hidden;
                }
                .pro-buttom{
                    width: 230px;
                    height: 50px;
                    display: flex;
                    // border: 1px solid #000;
                    img{
                        margin-top: 10px;
                        width: 20px;
                        height: 20px;
                    };
                    .text{
                        margin-left:10px;
                        color: blueviolet;
                        font-size: 14px;
                        line-height: 40px;
                    };
                    .rec-btn{
                        position: relative;
                        left: 80px;
                       
                    }
                }
            }
        }   
    };
    
</style>