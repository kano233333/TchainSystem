<template>
  <div class="login">
    <div id="top">
      <img class="logo" src="../../assets/portrait.png">
      <p>唐人星交易平台</p>
    </div>
    <div id="loginDiv" v-show="isLogin">
      <div id="headDiv">
        <h3>登录</h3>
      </div>
      <div id="loginInput">
        <div class="inputDiv">
          <Input type="text" v-model="username" value="" placeholder="请输入账号">
            <Icon type="ios-contact" slot="prefix" />
          </Input>
        </div>
        <div class="inputDiv">
          <Input type="password" v-model="psd" value="" placeholder="请输入密码">
            <Icon type="ios-key" slot="prefix" />
          </Input>
        </div>
        <input type="button" class="login_btn" name="" value="立即登录" @click="login">
        <input type="button" class="login_btn" name="" value="注册" @click="shift">
      </div>
    </div>

    <div id="loginDiv" v-show="!isLogin">
      <div id="headDiv">
        <h3>注册</h3>
      </div>
      <div id="loginInput">
        <div class="inputDiv">
          <Input type="text" v-model="numb" value="" placeholder="请输入手机号">
          <Icon type="ios-call" slot="prefix" />
          </Input>
        </div>
        <div class="inputDiv" v-show="yzmDiv">
          <Input type="text" v-model="yzm" value="" placeholder="请输入验证码">
          <Icon type="ios-barcode" slot="prefix" />
          </Input>
        </div>
        <input v-if="!yzmDiv && !userInfoDiv" type="button" class="login_btn" value="发送验证码" @click="sendCode" />
        <input v-if="yzmDiv" type="button" class="login_btn" value="验证" @click="verificatCode " />

        <div v-if="userInfoDiv">
          <div class="inputDiv">
            <Input type="text" v-model="username2" value="" placeholder="请输入账号">
              <Icon type="ios-contact" slot="prefix" />
            </Input>
          </div>
          <div class="inputDiv">
            <Input type="password" v-model="psd2" value="" placeholder="请输入密码">
              <Icon type="ios-key" slot="prefix" />
            </Input>
          </div>
          <div class="inputDiv">
            <Input v-model="idCard" value="" placeholder="请输入身份证">
            <Icon type="ios-card" slot="prefix" />
            </Input>
          </div>
          <div class="inputDiv">
            <Input v-model="realname" value="" placeholder="请输入真实姓名">
            <Icon type="ios-contact" slot="prefix" />
            </Input>
          </div>
          <input type="button" class="login_btn" name="" value="立即注册" @click="register">
          <input type="button" class="login_btn" name="" value="登录" @click="shift">
        </div>
      </div>

    </div>
    <div id="bottom">
        <div class="waveTop"></div>
        <div class="waveMid"></div>
        <div class="waveBot"></div>
    </div>
  </div>
</template>
<style type="text/css" media="screen" scoped>
  @keyframes moveWave {
    0% {
      transform: translateX(0) translateZ(0) scaleY(1);
    }
    50% {
      transform: translateX(-25%) translateZ(0) scaleY(0.45);
    }
    100% {
      transform: translateX(-50%) translateZ(0) scaleY(1);
    }
  }
  .login {
    position: absolute;
    width: 100%;
    min-height: 100%;
    background-image: linear-gradient(to top, #80B5E8 20%, #BDE3FE 80%);
    background-image: -webkit-linear-gradient(bottom, #80B5E8 20%, #BDE3FE 80%); /* Safari 5.1 to 6.0 */
    background-image: -o-linear-gradient(top, #80B5E8 20%, #BDE3FE 80%); /* Opera 11.1 to 12.0 */
    background-image: -moz-linear-gradient(top, #80B5E8 20%, #BDE3FE 80%); /* Firefox 3.6 to 15 */
  }
  #loginDiv {
    width: 400px;
    margin: 100px auto 100px auto;
    background: #fff;
    border-radius: 10px;
    position: relative;
    z-index: 99;
    animation: 0.8s show_scale forwards;
  }
  #headDiv {
    width: 100%;
    height: 100px;
    background: #1288FB;
    text-align: center;
    color: #fff;
    -moz-border-radius-topleft: 5px;
    -moz-border-radius-topright: 5px;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
  }
  #headDiv h3 {
    padding-top: 30px;
    font-size: 25px;
  }
  #headDiv p {
    font-size: 14px;
  }
  #loginInput {
    width: 250px;
    margin: 0 auto;
    padding:20px 0;
  }
  .inputDiv {
    width: 270px;
    height: 25px;
    margin-top: 20px;
  }
  .inputDiv  input {
    display: inline-block;
    width:80%;
  }
  #loginInput input {
    width: 230px;
    height: 25px;
    border: 0;
    border-bottom: 1px solid #ccc;
  }
  #loginInput .login_btn {
    width: 150px;
    height: 35px;
    display: block;
    margin: 30px auto;
    background: #5AA5F9;
    color: #fff;
    border: 0;
    border-radius: 20px;
    cursor: pointer;
    outline: none;
  }
  #loginInput .login_btn:hover {
    background: #1288FB;
    box-shadow: 0 4px 5px #AAD9FF;
  }
  #bottom {
    width: 100%;
    height: 30vh;
    position: absolute;
    bottom: 0;
    overflow: hidden;
  }
  .waveTop {
    width: 200%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: moveWave 8.5s linear infinite;
    background: url('../../assets/top.png');
    background-position: 0 bottom;
    background-repeat: repeat no-repeat;
    background-size: 50% 15vh;
    transform-origin: center bottom;
    animation-delay: 1s;
  }
  .waveMid {
    width: 200%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: moveWave 12s linear infinite;
    background: url('../../assets/mid.png');
    background-size: 50% 16vh;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }
  .waveBot {
    width: 200%;
    height: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    animation: moveWave 20s linear infinite;
    background: url('../../assets/bot.png');
    background-size: 50% 15vh;
    background-repeat: repeat no-repeat;
    background-position: 0 bottom;
    transform-origin: center bottom;
  }
  #top {
    position:fixed;
    top:0;
    left:0;
    background-color: #fff;
    padding:3px 15px;
    box-shadow: 0 2px 5px cadetblue;
    width:100vw;
    z-index:0;
  }
  #top>p {
    display: inline-block;
    font-size:22px;
    position:relative;
    top:-15px;
  }
  .logo {
    width:50px;
    height:50px;
  }
</style>
<script>
  export default {
    data() {
      return {
        username: '',
        psd: '',
        isLogin:true,
        username2:'',
        psd2:'',
        numb:'',
        yzmDiv:false,
        userInfoDiv:false,
        idCard:'',
        realname:'',
        yzm:''
      }
    },
    components: {},
    methods: {
      login: function () {
        if(this.username==''){
          this.$Message.info('请输入用户名')
          return;
        }
        if(this.psd==''){
          this.$Message.info('请输入密码')
          return;
        }
        var user = {
          username: this.username,
          password: this.psd
        };
        var that = this;
        this.$ajax.post(that.$ip + '/login', user)
        .then(function (res) {
          res.data.code==200?that.getUserInfo():that.$Message.info('登录失败');
        })
        .catch(function (error) {
          that.$Message.info('登录失败：'+error);
        });
      },
      getUserInfo: function () {
        var that = this;
        this.$ajax(that.$ip + '/show_me')
        .then(function (res) {
          res.data.code==200?that.saveUserData(res):that.$Message.info('获取信息失败！');
        })
        .catch(function (error) {
          that.$Message.info('获取信息失败：'+error);
        });
      },
      saveUserData: function (data) {
        if (data) {
          var permission = data.data.data.permission;
          sessionStorage.setItem('userData', JSON.stringify(data));
          switch(permission){
            case 1:
              this.$router.push('/userTransaction');
              break;
            case 2:
              this.$router.push('/transactionManage');
              break;
          }
        };
      },
      shift(){
        this.isLogin = !this.isLogin;
      },
      register(){
        if(this.numb==''){
          this.$Message.info('请输入手机号')
          return;
        }
        if(this.username2==''){
          this.$Message.info('请输入用户名')
          return;
        }
        if(this.psd2==''){
          this.$Message.info('请输入密码')
          return;
        }
        var user = {
          username: this.username2,
          password: this.psd2,
          phone_number:this.numb,
          real_name:this.realname,
          id_card:this.idCard
        };
        var that = this;
        this.$ajax.post(that.$ip + '/person', user)
          .then(function (res) {
            if(res.data.code==200){
              that.$Message.info('注册成功请登录');
              that.isLogin = true;
            }
          })
          .catch(function (error) {
            that.$Message.info('登录失败：'+error);
          });
      },
      sendCode:function(){
        var _this = this
        this.$ajax.get(this.$ip + '/veri?number='+this.numb).then(function(res){
          _this.yzmDiv = true
          let data = res.data.split("}");
          _this.code = data[data.length-1];
        })
      },
      verificatCode:function(){
        if(this.yzm == this.code){
          this.userInfoDiv = true;
          this.yzmDiv = false;
        }else{
          this.$Message.info('验证码有误');
        }
      }
    }
  }
</script>