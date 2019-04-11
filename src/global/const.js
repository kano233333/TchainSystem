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
        name: '交易信息',
        link: 'transactionManage',
        icon: 'jiaoyi'
      },
      {
        name: '买入信息',
        link: 'buyManage',
        icon: 'mai1'
      },
      {
        name: '卖出信息',
        link: 'sellManage',
        icon: 'mai2'
      },
      {
        name: 'k线条',
        link: 'userManage',
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
  }
}

export default common;