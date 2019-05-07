 <template>
  <div class="dataTable">
    <div id="headAndSearch">
      <h1>{{theHeader}}</h1>
      <div class="select" v-show="isShowCoinSelect">
        <Select v-model="modelo"  @on-change="changeCoin" style="width: 95px; margin-left: 5px; text-align: center;">
          <Option v-for="(item,index) in coinList" :value="item.value" :key="index">{{item.abName}}</Option>
        </Select>
      </div>
      <div class="select" v-show="!isShowCoinSelect">
        <Select v-model="modelType"  @on-change="changeType" style="width: 95px; margin-left: 5px; text-align: center;">
          <Option v-for="(item,index) in TypeList" :value="item.value" :key="index">{{item.abName}}</Option>
        </Select>
      </div>
      <div class="searches">
        <Input :placeholder="changesearch" v-model="searchValue" v-show="istradeSearch">
            <Select @on-change="changeSearch" v-model="searchfome" slot="prepend" style="width: 80px; background-color: #2FCCEB; color: #fff;">
                <Option value="订单号">订单号</Option>
                <Option value="用户名">用户名</Option>
            </Select>
            <Select @on-change="changetype" v-model="searchtype" slot="prepend" style="width: 70px; background-color: #2FCCEB; color: #fff; margin-left: 10px;">
                <Option value="1">已完成</Option>
                <Option value="0">未完成</Option>
            </Select>
        </Input>
        <Input placeholder="请输入用户名" v-if="istradeAnother" v-model="searchValue"></Input>
        <img src="../../../assets/search.png" alt="搜索" @click="search" v-if="isSuresearch">
      </div>
      <div class="AddHangSell" v-if="isAddhangsell">
        <Button type="primary" @click="modal1 = true">添加挂售信息</Button>
        <Modal v-model="modal1"  title="请发布您的挂售信息" :loading="addloading" @on-cancel="AddClear" :footer-hide="true" width="320">
            <Form :model="formItem" :label-width="50">
              <FormItem label="数量">
                  <Input v-model="formItem.amount" placeholder="请输入数量"></Input>
              </FormItem>
              <FormItem label="单价">
                  <Input v-model="formItem.unitPrice" placeholder="请输入单价"></Input>
              </FormItem>
              <FormItem label="限额">
                  <Input v-model="formItem.limitPrice" placeholder=请输入限额></Input>
              </FormItem>
              <FormItem label="挂售类型" :label-width="70">
                  <RadioGroup v-model="radioChoic" style="margin-left: 25px;">
                      <Radio label="1">卖出</Radio>
                      <Radio label="0">买入</Radio>
                  </RadioGroup>
              </FormItem>
              <FormItem style="margin-left: 120px;">
                  <Button type="text" @click="addcancel">取消</Button>
                  <Button type="primary" @click="addOK">确定</Button>
              </FormItem>
            </Form>
        </Modal>
      </div>
    </div>
    <div class="ivuTable">
       <Table size="small" :columns="columns" :data="datas"></Table>

       <Modal v-model="modal2" title="请输入交易数量" width="320" @on-ok="amountOK">
         <Input v-model="writeamount" placeholder="请输入交易数量"/>
       </Modal>
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
        modelType: 2,
        modal1:false,
        modal2:false,
        writeamount: '',
        writeRow: '',
        writeIndex: '',
        addloading: true,
        searchfome: '订单号',
        searchtype: '1',
        searchValue: '',
        radioChoic: '1',
        columns: [],
        datas: [],
        page: 1,
        limit: 10,
        totalPage: 1,
        choose: 1,
        typeChoose: 2,
        coinChoose: '',
        listType: '2',
        changesearch: '请输入订单号搜索',
        searchIsId: true,
        isShowCoinSelect: true,
        istradeSearch: false,
        istradeAnother: false,
        isSuresearch: false,
        isAddhangsell: false,
        isSellBuy: '',
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
        }],
        TypeList: [
        {
          abName: '卖出交易',
          value: 0
        },
        {
          abName: '买入交易',
          value: 1
        },
        {
          abName: '所有交易',
          value: 2
        },
        {
          abName: '最新时间',
          value: 3
        },
        {
          abName: '价格从高到低',
          value: 4
        },{
          abName: '价格从低到高',
          value: 5
        }],
        formItem: {
            amount: '',
            unitPrice: '',
            limitPrice: ''
        },
        DOMD:{
          title: '操作',
          key: 'dom',
          width: 60,
          align: 'center',
          render: (h, params) => {
            return h('div', [
                h('Icon', {
                    props: {
                        type: 'md-close-circle',
                        size: 22,
                        color: '#2b85e4'
                    },
                    on: {
                        click: () => {
                            this.deleteData(params.index)
                        }
                    }
                })
            ]);
          }
        },
        DOMC:{
          title: '操作',
          key: 'dom',
          render: (h, params) => {
            return h('div', [
                h('Button', {
                    props: {
                        type: 'error',
                        size: 'small'
                    },
                    on: {
                        click: () => {
                            this.CancelAdd(params.index)
                        }
                    }
                }, '取消')
            ]);
          }
        },
        DOMS:{
          title: '操作',
          key: 'dom',
          render: (h, params) => {
            const row = params.row.dom;
            const color = row === 0 ? 'primary' : 'error';
            const text = row === 0? '购买' : '售卖';
            return h('div', [
                h('Button', {
                    props: {
                        type: color,
                        size: 'small',
                    },
                    on: {
                        click: () => {
                          this.WriteAmount(row,params.index)
                        }
                    }
                },text)
            ]);
          }
        }
      }
    },
    props: ['theHeader'],
    mounted () {
      this.init();
    },
    methods: {
      init(){
        //初始化数据
        var that = this;
        switch(this.theHeader){
          case '交易管理':
          this.choose = 2;
          this.istradeSearch = true;
          this.isSuresearch = true;
          this.getDataApi = that.$ip + '/deal2' + this.coinChoose + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '买入管理':
          this.choose = 1;
          this.getDataApi = that.$ip + '/hang_sell/0' + this.coinChoose + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '卖出管理':
          this.choose = 0;
          this.getDataApi = that.$ip + '/hang_sell/0' + this.coinChoose + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '用户管理':
          this.choose = 2;
          this.istradeAnother = true;
          this.isSuresearch = true;
          this.getDataApi = that.$ip + '/deal1' + '?choose=' + this.choose + '&page=' + (this.page * this.limit) + '&limit=' + this.limit;
            break;
            case '交易信息':
          this.isShowCoinSelect = false;
          this.getDataApi = that.$ip + '/hang_sell/0'  + '?choose=' + this.listType + '&page=' + (this.page -1) + '&limit=' + this.limit;
            break;
            case '挂售信息':
          this.choose = 2;
          this.isAddhangsell = true;
          this.columns = this.constCom.manageTable.userManage;
          this.getDataApi = that.$ip + '/show_me2' + '?choose=' + this.choose + '&page=' + (this.page-1) + '&limit=' + this.limit;
            break;
            case '买入信息':
          this.choose = 2;
          this.columns = this.constCom.manageTable.userManage;
          this.getDataApi = that.$ip + '/transcation/1' + '?page=' + (this.page) + '&limit=' + this.limit;
            break;
            case '卖出信息':
          this.choose = 2;
          this.columns = this.constCom.manageTable.userManage;
          this.getDataApi = that.$ip + '/transcation/0' + '?page=0' + '&limit=' + this.limit;
            break;
          default:
            break;
        }
        this.getData(this.getDataApi);
      },
       getData: function (theUrl) {
        //获取数据
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
          case '交易信息':
            this.usergetTradeData(theUrl);
            break;
            case '挂售信息':
            this.usergetHang(theUrl);
            break;
          case '买入信息':
            this.usergetBuyData(theUrl);
            break;
          case '卖出信息':
            this.usergetSellData(theUrl);
            break;
          default:
            break;
        }
      },
      changeCoin(num) {
        //选择挂售货币
        if (num >= 1) {
          this.coinChoose = num;
        } else {
          this.coinChoose = '';
        }
        console.log(this.coinChoose);
        this.init();
      },
      changeType(num) {
        //选择交易信息排列顺序
        this.listType = num;
        console.log(this.listType);
        this.init();
      },
      changeSearch(searchSort){
        //选择查询方式
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
      checkType(){
        //挂售表单的输入检查
        if(this.formItem.amount == ''){
          this.$Message.info('请输入数量');
        } else {
          if (isNaN(parseFloat(this.formItem.amount))) {
            this.$Message.info('Please input a number!');
            this.formItem.amount = '';
          } else {
            this.formItem.amount = parseFloat(this.formItem.amount);
          }
        }
        if(this.formItem.unitPrice == ''){
          this.$Message.info('请输入单价')
        } else {
          if (isNaN(parseFloat(this.formItem.unitPrice))) {
            this.$Message.info('Please input a number!');
            this.formItem.unitPrice = '';
          } else {
            this.formItem.unitPrice = parseFloat(this.formItem.unitPrice);
          }
        }
        if(this.formItem.limitPrice == ''){
          this.$Message.info('请输入限额')
        } else {
          if (isNaN(parseFloat(this.formItem.limitPrice))) {
            this.$Message.info('Please input a number!');
            this.formItem.limitPrice = '';
          } else {
            this.formItem.limitPrice = parseFloat(this.formItem.limitPrice);
          }
        }
       if ((this.formItem.amount != '') && (this.formItem.unitPrice != '') && (this.formItem.limitPrice != '')) {
        return true;
       }else{
        return false;
       }
      },
      addOK(){
        //成功添加挂售信息
        if ( this.checkType() ) {
          var addHangData = {
            type: this.radioChoic+'',
            amount: this.formItem.amount+'',
            the_unit_price: this.formItem.unitPrice+'',
            the_lower_transaction: this.formItem.limitPrice+''
          };
          var that = this;
          this.$ajax.post( that.$ip + '/hang_sell/1', addHangData)
          .then(function (res) {
            if(res.data.code==200){
              if (res.data.data != '') {
                that.datas.push(res.data.data);
              }
            } else {
              that.$Message.success('已提交撮合 请等待挂售');
            }
          })
          .catch(function (error) {
            that.$Message.error('添加失败：');
          });
          setTimeout(() => {
              this.modal1 = false;
          }, 1000);
        }
      },
      AddClear(){
        //清除表单
        this.formItem.amount = '';
        this.formItem.unitPrice = '';
        this.formItem.limitPrice = '';
        this.formItem.radio = '1';
      },
      addcancel(){
        //取消正在添加挂售信息的操作
        this.AddClear();
        this.modal1 = false;
      },
      CancelAdd(index){
        var that = this;
        if(this.theHeader == '挂售信息' && confirm('确认取消挂售信息？')) {
          this.$ajax(that.$ip + '/cancel?ID=' + this.datas[index].ID)
          .then(function (res) {
            res.data.code == 200? that.$Message.success('取消成功！'):that.$Message.warning('error', '取消失败！');
            that.getData(that.getDataApi);
          })
          .catch(function (error) {
            that.$Message.error('error', '取消失败！' + error);
          });
        }
      },
      WriteAmount(row,index){
        this.modal2 = true;
        this.writeRow = row;
        this.writeIndex = index;
      },
      amountOK(){
        if (this.writeRow == 0) {
            //购买
            this.BuyerShop(this.writeIndex)
          } else {
            //售卖
            this.Sellersell(this.writeIndex)
          }
      },
      BuyerShop(index){
        var that = this;
        var databuy = {
          ID: this.datas[index].id + '',
          amount: this.writeamount + '',
          ID: this.datas[index].ID+'',
          amount: this.datas[index].amount+''
        };
        this.$ajax.post(that.$ip + '/hang_sell/6',databuy)
        .then(function (res) {
          console.log('buyer' + res)
          res.data.code == 200? that.$Message.success('购买成功！'):that.$Message.warning('购买失败！');
          that.getData(that.getDataApi);
        })
        .catch(function (error) {
          that.$Message.error('购买失败！' + error);
        });
      },
      Sellersell(index) {
        var that = this;
        var datasell = {
          ID: this.datas[index].id + '',
          amount: this.writeamount + ''
        };
        console.log(this.datas)
        this.$ajax.post(that.$ip + '/hang_sell/7',datasell)
        .then(function (res) {
          console.log(res)
          res.data.code == 200? that.$Message.success('出售成功！'):that.$Message.warning('出售失败！');
          that.getData(that.getDataApi);
        })
        .catch(function (error) {
          that.$Message.error('出售失败！' + error);
        });
      },
      search(){
        if (this.searchValue == '') {
          this.$Message.warning('请输入搜索内容！');
        } else {
          var that = this;
          // 按订单或用户名搜索
          switch(this.theHeader) {
            case '交易管理':
              that.searchApi = that.searchIsId? that.$ip + '/search' + this.coinChoose + '?ID=' + parseInt(this.searchValue) + '&choose=' + this.searchtype:that.$ip + '/deal2' + this.coinChoose + '?choose=3' + '&name=' + this.searchValue + '&page=0&limit=10';
              break;
            case '用户管理':
              that.searchApi = that.$ip + '/deal1?choose=1&name=' + this.searchValue + '&page=0&limit=10';
              break;
            default:
              break;
          };
          this.getData(this.searchApi);
        };
      },
      deleteData: function (index) {
        // 删除用户
        var that = this;
        if(this.theHeader == '用户管理' && confirm('确认冻结用户' + this.datas[index].username + '的账号吗？')) {
          this.$ajax(that.$ip + '/deal1?choose=3&name=' + this.datas[index].username + '&page=' + (this.page * this.limit) + '&limit=' + this.limit)
          .then(function (res) {
            res.data.code == 200? that.$Message.success('冻结成功！'):that.$Message.warning('冻结失败！');
            that.getData(that.getDataApi);
          })
          .catch(function (error) {
            that.$Message.error('冻结失败！' + error);
          });
        }
      },
      getTradeData(getDataUrl){
        //获取交易管理
        this.columns = this.constCom.manageTable.transactionManage;
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
              that.totalPage = that.limit*(res.data.totalpage - 1 || 1);
              if (Array.isArray(res.data.data.info)) {
                for (var key of res.data.data.info) {
                  console.log(key)
                  that.datas.push(createData(key));
                }
              } else {
                that.datas.push(createData(res.data.data.info));
              };
            } else {
              that.$Message.warning(res.data.msg);
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function(error) {
          console.log(error)
          that.$Message.error('对方不想说话，并且向你抛出了一个异常');
        })
      },
      getBuyData(getDataUrl) {
        this.columns = this.constCom.manageTable.buyManage;
        // 获取挂售买入信息
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.info != undefined && res.data.data.info != '' && res.data.data.info != []) {
              that.totalPage = that.limit*(res.data.totalpage - 1 || 1);
              console.log(res);
              that.datas = [];
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
            } else {
              that.$Message.warning('找不到该条挂售！');
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function (error) {
          console.log(error)
          that.$Message.error('信息获取失败，请检查你的网络！');
        });
      },
      getSellData(getDataUrl) {
        // 获取挂售卖出信息
        this.columns = this.constCom.manageTable.sellManage;
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.info != undefined && res.data.data.info != '' && res.data.data.info != []) {
              that.datas = [];
              that.totalPage = that.limit*(res.data.totalpage - 1 || 1);
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
            } else {
              that.$Message.warning('找不到该条挂售！');
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function (error) {
          that.$Message.error('信息获取失败，请检查你的网络！');
        });
      },
      usergetTradeData(getDataUrl) {
        this.columns = this.constCom.userTable.userTransaction;
        if (this.columns[this.columns.length -1].key != 'dom') {
          this.columns.push(this.DOMS);
        }
        // 获取挂售买入信息
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.info != undefined && res.data.data.info != '' && res.data.data.info != []) {
              that.totalPage = that.limit*(res.data.totalpage|| 1);
              console.log(res);
              that.datas = [];
              var theJson = {};
              for(var key of res.data.data.info){
                theJson = {
                  id: key.id || that.$refs.searchKey.value,
                  publisher: key.username,
                  amount: key.amount,
                  price: key.the_unit_price,
                  type: key.type==0? '出售': '购买',
                  limitPrice: key.the_lower_transaction,
                  totalPrice: ((key.amount * 10) * (key.the_unit_price * 10) / 100).toFixed(2),
                  publishTime: that.$api.formatTime(key.time?key.time:key.time_hang),
                  dom: key.type
                }
              that.datas.push(theJson);
              }
            } else {
              that.$Message.warning('找不到该条挂售！');
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function (error) {
          console.log(error)
          that.$Message.error('信息获取失败，请检查你的网络！');
        });
      },
      usergetHang(getDataUrl){
        //获取用户挂售信息
        this.columns = this.constCom.userTable.userHang;
        if (this.columns[this.columns.length -1].key != 'dom') {
          this.columns.push(this.DOMC);
        }
        var that = this;
        this.$ajax.get(getDataUrl)
        .then(function(res) {
          if (res.data.code == 200) {
            var theJson = {};
            function createData (perData) {
              theJson = {
                ID: perData.id,
                amount: perData.amount,
                username: perData.username,
                totalPrice: parseFloat(perData.amount*perData.the_unit_price).toFixed(4),
                finish: perData.is_finish==0? '未完成': '已完成',
                price: perData.the_unit_price,
                lowerprice: perData.the_lower_transaction,
                type: perData.type==0? '买入': '卖出',
                time: that.$api.formatTime(perData.time)
              }
              return theJson;
            }
            if (res.data.data) {
              that.datas = [];
              that.totalPage = that.limit*((res.data.totalpage -1) || 1);
              if (Array.isArray(res.data.data.info)) {
                for (var key of res.data.data.info) {
                  that.datas.push(createData(key));
                }
              } else {
                that.datas.push(createData(res.data.data.info));
              };
            } else {
              that.$Message.error(res.data.msg);
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function(error) {
          console.log(error)
          that.$Message.error('对方不想说话，并且向你抛出了一个异常');
        })
      },
      usergetBuyData(getDataUrl) {
        this.columns = this.constCom.userTable.userBuy;
        // 获取挂售买入信息
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          if (res.data.code == 200) {
            if (res.data.data.info != undefined && res.data.data.info != '' && res.data.data.info != []) {
              that.totalPage = that.limit*(res.data.totalpage - 1 || 1);
              console.log(res);
              that.datas = [];
              var theJson = {};
              for(var key of res.data.data.info){
                theJson = {
                  id: key.record_id || that.$refs.searchKey.value,
                  publisher: key.username,
                  amount: key.need_amount,
                  price: key.the_unit_price,
                  time_success: that.$api.formatTime(key.time?key.time:key.time_success),
                  publishTime: that.$api.formatTime(key.time?key.time:key.time_hang)
                }
              that.datas.push(theJson);
              }
            } else {
              that.$Message.warning('找不到该条挂售！');
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function (error) {
          console.log(error)
          that.$Message.error('信息获取失败，请检查你的网络！');
        });
      },
      usergetSellData(getDataUrl) {
        // 获取挂售卖出信息
        this.columns = this.constCom.userTable.userSell;
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          if (res.data.code == 200) {
            console.log(res.data.data.info)
            if (res.data.data.info != undefined && res.data.data.info != '' && res.data.data.info != []) {
              that.datas = [];
              that.totalPage = that.limit*(res.data.totalpage - 1 || 1);
              var theJson = {};
              for(var key of res.data.data.info){
                theJson = {
                  id: key.record_id,
                  publisher: key.username,
                  amount: key.need_amount,
                  price: key.the_unit_price,
                  publishTime: that.$api.formatTime(key.time?key.time:key.time_hang),
                  time_shop: that.$api.formatTime(key.time?key.time:key.time_success)
                }
                that.datas.push(theJson);
              }
            } else {
              that.$Message.warning('找不到该条挂售！');
            };
          } else {
            that.$Message.error('信息获取失败！');
          };
        })
        .catch(function (error) {
          that.$Message.error('信息获取失败，请检查你的网络！');
        });
      },
      getUserData(getDataUrl) {
        // 获取用户信息
        // this.columns = [];
        this.columns = this.constCom.manageTable.userManage;
        if (this.columns[this.columns.length -1].key != 'dom') {
          this.columns.push(this.DOMD);
        }
        var that = this;
        this.$ajax(getDataUrl)
        .then(function (res) {
          var theJson = {};
          function createData (perData) {
            theJson = {
                BCC: perData.BCC,
                BTC: perData.BTC,
                EOS: perData.EOS,
                ETH: perData.ETH,
                username: perData.username,
                real_name: perData.real_name,
                phone: perData.phone,
                ID_card: perData.ID_card,
                public_key: perData.public_key,
                remaining: perData.remaining,
                Tang: perData.Tang,
                vipLevel: perData.vipLevel,
                regiestTime: that.$api.formatTime(perData.regiestTime),
                dom: 123
              }
              return theJson;
          }
          if (res.data.code==200) {
            if (res.data.data) {
              that.datas = [];
              that.totalPage = that.limit*(res.data.totalpage - 1 || 1);
              if (Array.isArray(res.data.data)) {
                for(var key of res.data.data){
                  that.datas.push(createData(key));
                }
              } else {
                that.datas.push(createData(res.data.data));
              };
            } else {
              that.$Message.warning(res.data.msg);
            };
            
          } else {
            that.$Message.error('获取用户信息失败！');
          };
        })
        .catch(function (error) {
          console.log(error)
          that.$Message.error('获取用户信息失败，请检查你的网络！');
        });
      },
      changePage(num){
        //跳转页数
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
  .AddHangSell{
    margin-right: 50px;
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