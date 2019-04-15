import Vue from 'vue'
import Router from 'vue-router'

import login from '../views/login/router'
import transactionManage from '../views/transactionManage/router'
import buyManage from '../views/buyManage/router'
import sellManage from '../views/sellManage/router'
import userManage from '../views/userManage/router'
import otherManage from '../views/otherManage/router'
import userCenter from '../views/userCenter/router'
// import complainManage from '../views/complainManage/router'

import userBuy from '../views/userBuy/router'
import userSell from '../views/userSell/router'
import userTransaction from '../views/userTransaction/router'
import kCharts from '../views/kCharts/router'

Vue.use(Router)

export default new Router({
	routes: [
	{
		path: '/',
		redirect: '/login',
	},
	...login,
	...transactionManage,
	...buyManage,
	...sellManage,
	...userManage,
	...otherManage,
	...userCenter,
	...userBuy,
	...userSell,
	...userTransaction,
	...kCharts
	// ...complainManage
	]
})
