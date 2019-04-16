const common = {
  bar:{
    manage:[
        {
          name: '交易管理',
          link: 'transactionManage',
          icon: 'jiaoyi'
        },
        {
          name: '买入管理',
          link: 'buyManage',
          icon: 'mai1'
        },
        {
          name: '卖出管理',
          link: 'sellManage',
          icon: 'mai2'
        },
        {
          name: '用户管理',
          link: 'userManage',
          icon: 'yonghu'
        },
        {
          name: '其他管理',
          link: 'otherManage',
          icon: 'qita'
        }
      ],
    user:[
      {
        name: '挂售信息',
        link: 'userTransaction',
        icon: 'jiaoyi'
      },
      {
        name: '买入信息',
        link: 'userBuy',
        icon: 'mai1'
      },
      {
        name: '卖出信息',
        link: 'userSell',
        icon: 'mai2'
      },
      {
        name: 'k线条',
        link: 'KLine',
        icon: 'xiantu'
      },
      {
        name: '个人中心',
        link: 'userCenter',
        icon: 'yonghu'
      }
    ]
  },
  user:{
    info:{
      "ID_card": '身份证号',
      "Tang": '积分数量',
      "phone": '手机号',
      "private_key": '私钥',
      "public_key": '公钥',
      "real_name": '真实姓名',
      "regiestTime": '注册时间',
      "remaining": '余额',
      "username": '昵称',
      "vipLevel": '会员等级'
    }
  },
  manageTable:{
    transactionManage:[
    {
      title: '买家',
      key: 'buyer'
    },
    {
      title: '卖家',
      key: 'seller'
    },
    {
      title: '数量',
      key: 'amount'
    },
    {
      title: '单价',
      key: 'price'
    },
    {
      title: '总额',
      key: 'totalPrice'
    },
    {
      title: '类别',
      key: 'type'
    },
    {
      title: '完成时间',
      key: 'complishTime',
      width: 200
    }],
    buyManage:[{
      title: '交易ID',
      key: 'id'
    },{
      title: '发布者',
      key: 'publisher'
    },{
      title: '数量',
      key: 'amount'
    },{
      title: '单价',
      key: 'price'
    },{
      title: '限额',
      key: 'limitPrice'
    },{
      title: '总额',
      key: 'totalPrice'
    },{
      title: '发布时间',
      key: 'publishTime',
      width: 200
    }],
    sellManage:[{
      title: '交易ID',
      key: 'id'
    },{
      title: '发布者',
      key: 'publisher'
    },{
      title: '数量',
      key: 'amount'
    },{
      title: '单价',
      key: 'price'
    },{
      title: '限额',
      key: 'limitPrice'
    },{
      title: '总额',
      key: 'totalPrice'
    },{
      title: '发布时间',
      key: 'publishTime',
      width: 200
    }]
  },
  userTable: {
    userBuy:[{
      title: '交易ID',
      key: 'id'
    },{
      title: '发布者',
      key: 'publisher'
    },{
      title: '数量',
      key: 'amount'
    },{
      title: '单价',
      key: 'price'
    },{
      title: '限额',
      key: 'limitPrice'
    },{
      title: '总额',
      key: 'totalPrice'
    },{
      title: '发布时间',
      key: 'publishTime',
      width: 200
    }],
    userSell:[{
      title: '交易ID',
      key: 'id'
    },{
      title: '发布者',
      key: 'publisher'
    },{
      title: '数量',
      key: 'amount'
    },{
      title: '单价',
      key: 'price'
    },{
      title: '限额',
      key: 'limitPrice'
    },{
      title: '总额',
      key: 'totalPrice'
    },{
      title: '发布时间',
      key: 'publishTime',
      width: 200
    }]
  },
  searchTable:{
    IDsearch:[{
      title: '',
      key: ''
    },{
      title: '',
      key: ''
    },{
      title: '',
      key: ''
    },{
      title: '',
      key: ''
    },{
      title: '',
      key: ''
    },{
      title: '',
      key: ''
    },{
      title: '',
      key: ''
    }]
  }
}
export default common;