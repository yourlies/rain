export default {
  models: ['Raw', 'App'],
  subscriptions: {
    'selectGoodsList': {
      Raw: 'selectGoodsList',
    },
    'selectGoodsDetail': {
      Raw: 'selectGoodsDetail',
    },
    'exchangeGood': {
      Raw: 'exchangeGood',
    },
    'selectExchangeResult': {
      Raw: 'selectExchangeResult',
    },
    'selectOrderDetail': {
      Raw: 'selectOrderDetail',
    },
    'selectOrderList': {
      Raw: 'selectOrderList',
    },
    'validatePhone': {
      App: 'validatePhone',
    },
    'selectAddressPhone': {
      App: 'selectAddressPhone',
    },
    'delegationBack': {
      App: 'delegationBack',
    },
    'delegationGetCreditDetail': {
      App: 'delegationGetCreditDetail',
    },
    'delegationRedirect': {
      App: 'delegationRedirect',
    },
    'selectBasicParams': {
      App: 'selectBasicParams',
    },
    'exchangeSuccess': {
      App: 'exchangeSuccess',
    },
    'delegationLayer': {
      App: 'delegationLayer',
    },
  }
}
