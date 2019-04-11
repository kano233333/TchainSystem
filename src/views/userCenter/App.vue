<template>
  <div class="user_center">
    <p class="type">账户信息</p>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["Tang"]}}
      </div>
      <p>{{userData["Tang"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["remaining"]}}
      </div>
      <p>{{userData["remaining"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["private_key"]}}
      </div>
      <p>{{userData["private_key"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["public_key"]}}
      </div>
      <p>{{userData["public_key"]}}</p>
    </div>
    <p class="type">
      个人信息
      <Button class="psd" type="primary" @click="modalShow = true">修改密码</Button>
      <Modal v-model="modalShow" title="修改密码" @on-ok="ok">
        <Input type="password" v-model="resetpsd" class="reset" placeholder="请输入新密码" />
      </Modal>
    </p>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["username"]}}
      </div>
      <p>{{userData["username"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["real_name"]}}
      </div>
      <p>{{userData["real_name"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["phone"]}}
      </div>
      <p>{{userData["phone"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["ID_card"]}}
      </div>
      <p>{{userData["ID_card"]}}</p>
    </div>
    <div class="content">
      <div class="content-upper">
        {{constComInfo["vipLevel"]}}
      </div>
      <p>{{userData["vipLevel"]}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "app",
    data(){
      return {
        userData:{},
        constComInfo:this.constCom.user.info,
        modalShow:false,
        resetpsd:''
      }
    },
    methods:{
      getUserData(){
        this.userData = JSON.parse(sessionStorage['userData']).data.data;
      },
      ok(){
        this.$ajax.post(this.$ip + '/code', {
          password:this.resetpsd
        }).then((data)=>{
          var _data = data.data;
          if(_data.code==200){
            this.$Message.info(_data.msg)
          }else{
            this.$Message.info('错误')
          }
        }).catch(()=>{
          this.$Message.info('失败');
        })
      }
    },
    created(){
      this.getUserData();
    },
  }
</script>

<style scoped>
  .user_center {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
    font-size:17px;
  }
  .user_center .type {
    font-size:25px;
    color:#666;
    border-left:3px solid cadetblue;
    padding-left:5px;
  }
  .content {
    min-width:35%;
    margin:20px 40px;
    display: inline-block;
    background-color: #fff;
    text-align: center;
    transition:0.8s all;
  }
  .content:hover,.psd:hover {
    box-shadow: 0 0 5px #91a6d6;
  }
  .content-upper {
    width:100%;
    height:50%;
    padding:3px 20px;
    /*border-radius:10px 10px 0 0;*/
    background-color: #2ab5d1;
    color:#fff;
  }
  .content>p {
    padding:3px 20px;
  }
  .psd {
    font-size:16px;
    background-color: #2ab5d1;
    margin-left:20px;
  }
  .reset {
    display: block;
    margin:0 auto;
    height:50px;
    font-size:20px;
    width:80%;
  }
</style>