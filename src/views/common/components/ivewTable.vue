<template>
  <div class="dataTable">
    <div id="headAndSearch">
      <h1>{{theHeader}}</h1>
      <div class="select" v-if="isShowCoinSelect">
        <Select v-model="modelo"  @on-change="changeCoin" style="width: 95px; margin-left: 5px; text-align: center;">
          <Option v-for="(item,index) in coinList" :value="item.value">{{item.abName}}</Option>
        </Select>
      </div>
      <div class="searches">
        <Input :placeholder="changesearch" v-model="searchValue">
            <Select @on-change="changeSearch" v-model="searchfome" slot="prepend" style="width: 80px; background-color: #2FCCEB; color: #fff;">
                <Option value="订单号">订单号</Option>
                <Option value="用户名">用户名</Option>
            </Select>
            <Select @on-change="changetype" v-model="searchtype" slot="prepend" style="width: 70px; background-color: #2FCCEB; color: #fff; margin-left: 10px;">
                <Option value="1">已完成</Option>
                <Option value="0">未完成</Option>
            </Select>
        </Input>
        </Select>
        <img src="../../../assets/search.png" alt="搜索" @click="search">
      </div>
    </div>
    <div class="ivuTable">
       <Table size="small" :columns="columns" :data="datas"></Table>
    </div>
    <div class="ivuPage">
      <Page :total="totalPage" :current="page" @on-change="changePage" show-elevator></Page>
    </div>
  </div>
</template>

<script>
  export default{
    data(){
      return {
        modelo: 0,
        searchfome: '订单号',
        searchtype: '1',
        searchValue: '',
        columns: [],
        datas: [],
        page: 1,
        limit: 10,
        totalPage: 1,
        choose: 1,
        typeChoose: 2,
        coinChoose: '',
        changesearch: '请输入订单号搜索',
        searchIsId: true,
        isShowCoinSelect: true,
        coinList: [
        {
          name: '唐人链',
          abName: 'TRC',
          value: 0
        },
        {
          name: '比特币',
          abName: 'BTC',
          value: 1
        },
        {
          name: 'Bitcoin Cash',
          abName: 'BCC',
          value: 2
        },
        {
          name: '以太币',
          abName: 'ETH',
          value: 3
        },
        {
          name: '柚子币',
          abName: 'EOS',
          value: 4
        }]
      }
    },
    props: ['theHeader'],
    mounted () {
      this.init();
    },
    methods: {
      init(){
        var that = this;
        switch(this.theHeader){
          case '交易管理':
          this.choose = 2;
          this.columns = this.constCom.manageTable.transactionManage;
          this.getDataApi = that.$ip + '/deal2' + this.coinChoose + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '买入管理':
          this.choose = 1;
          this.columns = this.constCom.manageTable.buyManage;
          this.getDataApi = that.$ip + '/hang_sell/0' + this.coinChoose + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '卖出管理':
          this.choose = 0;
          this.columns = this.constCom.manageTable.sellManage;
          this.getDataApi = that.$ip + '/hang_sell/0' + this.coinChoose + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '用户管理':
          this.choose = 2;
          this.columns = this.constCom.manageTable.userManage;
          this.getDataApi = that.$ip + '/deal1' + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
          default:
            break;
        }
        this.getData(this.getDataApi);
      },
       getData: function (theUrl) {
        switch(this.theHeader) {
          case '交易管理':
            this.getTradeData(theUrl);
            break;
          case '买入管理':
            this.getBuyData(theUrl);
            break;
          case '卖出管理':
            this.getSellData(theUrl);
            break;
          case '用户管理':
            this.getUserData(theUrl);
            break;
          default:
            break;
        }
      },
      changeCoin(num) {
        if (num >= 1) {
          this.coinChoose = num;
        } else {
          this.coinChoose = '';
        }
        console.log(this.coinChoose);
        this.init();
      },
      changeSearch(searchSort){
        if (searchSort != '订单号') {
          this.searchIsId = false;
        } else {
          this.searchIsId = true;
        }
        this.changesearch ='请输入' + searchSort + '搜索';
      },
      changetype(types){
        this.searchtype = types;
      },
      search(){
        if (this.searchValue == '') {
          this.$api.alert('warning', '请输入搜索内容！');
        } else {
          var that = this;
          // 按订单或用户名搜索
          that.searchApi = that.searchIsId? that.$ip + '/search' + this.coinChoose + '?ID=' + parseInt(this.searchValue) + '&choose=' + this.searchtype:that.$ip + '/deal2' + this.coinChoose + '?choose=3' + '&name=' + this.searchValue + '&page=0&limit=10';
          if (this.theHeader =='用户管理') {
            // 搜索用户信息
            that.searchApi = that.$ip + '/deal1?choose=1&name=' + this.searchValue + '&page=0&limit=10';
          };
          this.getData(this.searchApi);
        };
      },
      getTradeData(getDataUrl){
        var that = this;
        this.$ajax.get(getDataUrl)
        .then(function(res) {
          if (res.data.code == 200) {
            var theJson = {};
            console.log(res);
            function createData (perData) {
              theJson = {
                buyer: perData.buyer_name? perData.buyer_name:(perData.type==0?that.$refs.searchKey.value:perData.oppsitename),
                seller: perData.seller_name? perData.seller_name:(perData.type==1?that.$refs.searchKey.value:perData.oppsitename),
                amount: perData.need_amount,
                price: perData.the_unit_price,
                totalPrice: ((perData.need_amount * 10) * (perData.the_unit_price * 10) / 100).toFixed(2),
                type: perData.type==0? '买入': '卖出',
                complishTime: that.$api.formatTime(perData.time_success)
              }
              return theJson;
            }
            if (res.data.data) {
              that.datas = [];
              that.totalPage = res.data.totalpage || 1;
              if (Array.isArray(res.data.data.info)) {
                for (var key of res.data.data.info) {
                  that.datas.push(createData(key));
                }
              } else {
                that.datas.push(createData(res.data.data.info));
              };
              that.totalPage = that.limit*(res.data.totalpage-1);
            } else {
              that.$api.alert('error', res.data.msg);
            };
          } else {
            that.$api.alert('error', '信息获取失败！');
          };
        })
        .catch(function(error) {
          console.log(error)
          that.$Message.error('对方不想说话，并且向你抛出了一个异常');
        })
      },
      getBuyData: function (getDataUrl) {
        // 获取挂售买入信息
        console.log('getBuy');
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.info != undefined && res.data.data.info != '' && res.data.data.info != []) {
              that.totalPage = res.data.totalpage || 1;
              console.log(res);
              var theJson = {};
              for(var key of res.data.data.info){
                theJson = {
                  id: key.id || that.$refs.searchKey.value,
                  publisher: key.username,
                  amount: key.amount,
                  price: key.the_unit_price,
                  limitPrice: key.the_lower_transaction,
                  totalPrice: ((key.amount * 10) * (key.the_unit_price * 10) / 100).toFixed(2),
                  publishTime: that.$api.formatTime(key.time?key.time:key.time_hang)
                }
                that.datas.push(theJson);
              }
              that.checkPage();
            } else {
              that.$api.alert('error', '找不到该条交易！');
            };
          } else {
            that.$api.alert('error', '信息获取失败！');
          };
        })
        .catch(function (error) {
          that.$api.alert('error', '信息获取失败，请检查你的网络！');
        });
      },
      changePage(num){
        this.page = num;
        this.init()
      }
    }
  }
</script>

<style type="text/css" media="screen" scoped>
  #headAndSearch {
    width: 75vw;
    height: 37px;
    margin: 0 auto;
    margin-top: 30px;
    display: flex;
    align-items: center;
  }
  #headAndSearch h1 {
    font-size: 32px;
    padding: 0;
    float: left;
  }
  .searches{
    margin-left: auto;
    display: flex;
  }
  .searches img{
    margin-left: 10px;
    width: 30px;
    height: 30px;
  }
  .ivuTable {
    width: 75vw;
    height: auto;
    margin: 0 auto;
    padding-top: 10px;
    text-align: center;
  }
  .ivuTable .ivu-table{
    width: 100%;
  }
  .ivuPage{
    margin-top: 10px;
    float: right;
  }
  </style>