import Parent from './Parent';

class Raw {
  static async selectGoodsList (page, component, id) {
    page.isSelecting = true;
    await component.$nextTick(() => {});
    const params = { ...page.$route.query, ...page.params, type: 1 };
    const req = Parent.bodyPack({ params, type: 'get', url: '/student/mall/goodslist' });
    Parent.get(req.query)
    .catch(() => {})
    .then((res) => {
      page.raw = res.data;
      component.allocate({ raw: res.data });
    })
    .then(() => {
      page.items = page.raw.goods.list;
      page.order = page.raw.order;
      page.user = page.raw.user;
      page.isSelecting = false;
      component.resolve(id);
    })
  }

  static async selectGoodsDetail (page, component, id) {
    const params = { ...page.$route.query, type: 1 };
    const req = Parent.bodyPack({ params, type: 'get', url: '/student/mall/goodsdetail' });
    Parent.get(req.query)
    .catch(() => {})
    .then((res) => {
      page.raw = res.data;
      component.modify({ payEvent: component.memory.payEvent || 0 });
      component.allocate({ raw: res.data });
    })
    .then(() => {
      page.item = page.raw.goods;
      page.user = page.raw.user;
      component.resolve(id);
      component.modify({ payEvent: component.memory.payEvent + 1 });;
    })
  }

  static async exchangeGood (page, component, id) {
    const params = { ...component.memory.basic, ...component.memory.params };
    const req = Parent.bodyPack({ params, type: 'get', url: '/student/mall/exchange' });
    Parent.get(req.query)
    .catch(() => {})
    .then((res) => {
      if (res.status == 0) {
        component.request('redirect', {
          path: '/student/mall/exchangeresult',
          params: {
            oid: res.data.oid,
          },
        });
        component.bubble('exchangeSuccess');
      } else {
        component.request('createLayer', {
          title: '商品兑换出错',
          notice: [res.data.msg]
        });
      }
    })
  }

  static async selectExchangeResult (page, component, id) {
    const params = { ...page.$route.query, type: 1 };
    const req = Parent.bodyPack({ params, type: 'get', url: '/student/mall/exchangeresult' });
    Parent.get(req.query)
    .catch(() => {})
    .then((res) => {
      page.raw = res.data;
      component.allocate({ raw: res.data });
    })
    .then(() => {
      page.order = page.raw.order;
      page.operator = { 1: '移动', 2: '联通', 4: '电信' }[page.order.ext.operator];
      component.resolve(id);
    })
  }

  static async selectOrderDetail (page, component, id) {
    const params = { ...page.$route.query, type: 1 };
    const req = Parent.bodyPack({ params, type: 'get', url: '/student/mall/orderdetail' });
    Parent.get(req.query)
    .catch(() => {})
    .then((res) => {
      page.raw = res.data;
      component.allocate({ raw: res.data });
    })
    .then(() => {
      page.order = page.raw.order;
      page.item = page.raw.goods;
      page.operator = { 1: '移动', 2: '联通', 4: '电信' }[page.order.ext.operator];
      component.resolve(id);
    })
  }

  static async selectOrderList (page, component, id) {
    const params = { ...page.$route.query, type: 1 };
    const req = Parent.bodyPack({ params, type: 'get', url: '/student/mall/orderlist' });
    Parent.get(req.query)
    .catch(() => {})
    .then((res) => {
      page.raw = res.data;
      component.allocate({ raw: res.data });
    })
    .then(() => {
      page.items = page.raw.order.list;
      page.user = page.raw.user;
      component.resolve(id);
    })
  }
}
export default Raw;