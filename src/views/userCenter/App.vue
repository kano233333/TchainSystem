<template>
  <div class="user_center">
    <div class="user_info">
      <sicon name="yue" scale="5"></sicon>
      <div class="content" v-for="(item,key) in userData">
        {{constComInfo[key]}}：{{item}}
      </div>
    </div>
  </div>
</template>

<script>
  const aaa = {
    "ID_card": '500000002222222',
    "Tang": '222',
    "phone": '182828282844',
    "private_key": 'dgjfdjkgj3g23g',
    "public_key": 'kskdlkg3325',
    "real_name": '哈哈哈',
    "regiestTime": '2019-2-4',
    "remaining": '-124',
    "username": 'xxx',
    "vipLevel": '3'
  };

  export default {
    name: "app",
    data(){
      return {
        userData:{},
        constComInfo:this.constCom.user.info
      }
    },
    methods:{
      getUserData(){
        this.userData = aaa
      }
    },
    created(){
      this.getUserData();
    }
  }
</script>

<style scoped>
  .user_center {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
    font-size:17px;
  }
</style>