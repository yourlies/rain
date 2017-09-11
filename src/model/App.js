import Parent from './Parent';
import '../assets/js/app.conf';
import '../assets/js/app.bridge';

const Locate = {};
Locate.get = function (event, payload) {
  bridgeClass.toLocalEvent(event, payload)
}

bridgeClass.toLocalEvent('setNaviBar', {
  red: 245,
  green: 245,
  blue: 245,
  alpha: 255,
});

// bridgeClass.jsEventHook.goback = () => {
  // self.redirect.request('redirect', {
    // next: 'back',
  // });
// }

const operators = {
  1: '移动',
  2: '联通',
  4: '电信',
};

class App {
  static async validatePhone (page, component, id) {
    const callBack = function (res) {
      const { is_online, goods_num } = component.memory.raw.goods;
      const goodCategory = component.memory.goodCategory;
      const gid = component.memory.gid;
      const { operator, location, status } = res;
      const llConf = component.memory.raw.order.ll_conf;
      const hfConf = component.memory.raw.order.hf_conf;
      const goodName = Parent.number(component.memory.goodName);
      const hfTimes = component.memory.raw.order.hf;
      const llTimes = component.memory.raw.order.ll;
      switch (true) {
        case [1, 2, 4].indexOf(Parent.number(operator)) === -1:
          page.isError = true;
          page.notice = '无效的手机号码';
          page.request('createPayment', {
            auth: false,
          });
          break;
        case [1, 2, 4].indexOf(Parent.number(operator)) !== -1:
          page.isError = false;
          page.notice = `${operators[operator]} ${location}`;
          page.request('createPayment', {
            auth: true,
          });
          component.allocate({
            params: { operator, phone: page.phone, gid },
          })
          break;
      }
      if (goodCategory == 18) {
        switch (true) {
          case Parent.number(llConf.size[operator]).indexOf(goodName) === -1:
            page.isError = true;
            page.notice = '套餐不支持兑换';
            page.request('createPayment', {
              auth: false,
            });
            break;
          case llConf.disable_area[operator].indexOf(location) !== -1:
            page.isError = true;
            page.notice = '地区不支持兑换';
            page.request('createPayment', {
              auth: false,
            });
            break;
        }
      }
      if (goodCategory == 19) {
        switch (true) {
          case Parent.number(hfConf.size[operator]).indexOf(goodName) === -1:
            page.isError = true;
            page.notice = '套餐不支持兑换';
            page.request('createPayment', {
              auth: false,
            });
            break;
          case hfConf.disable_area[operator].indexOf(location) !== -1:
            page.isError = true;
            page.notice = '地区不支持兑换';
            page.request('createPayment', {
              auth: false,
            });
            break;
        }
      }
      switch (true) {
        case Parent.number(component.memory.raw.user.credit) < Parent.number(component.memory.goodPrice):
          page.request('createPayment', {
            auth: false,
            notice: '余额不足',
          });
          break;
        case goods_num == 0:
          page.request('createPayment', {
            auth: false,
            notice: '库存不足',
          });
          break;
        case is_online == 2:
          page.request('createPayment', {
            auth: false,
            notice: '商品下架',
          });
          break;
        case hfTimes.limit || llTimes.limit:
          page.request('createPayment', {
            auth: false,
            notice: '兑换次数已尽',
          });
          break;
      }
    }
    bridgeClass.toLocalEvent('queryLocation', {
      number: page.phone,
      callBack: bridgeClass.__CB__(function (res) {
        callBack(res)
      })
    })
  }

  static async selectAddressPhone (page, component, id) {
    bridgeClass.toLocalEvent('addressBook', {
      callBack: bridgeClass.__CB__(function (res) {
        page.phone = res.number.replace(/ /g, '');
        page.switchFakeInput();
      })
    })
  }

  static async delegationBack (page, component, id) {
    if (page.$route.path == '/student/mall/goodslist') {
      await Locate.get('removeHistory', 1000)
    }
    Locate.get('goback')
  }

  static async delegationRedirect (page, component, id) {
    console.log(page.query)
    Locate.get('openView', {
      url: page.query,
    })
  }

  static async selectBasicParams (page, component, id) {
    Locate.get('getSysInfo', {
      callBack: bridgeClass.__CB__((res) => {
        alert(JSON.stringify(res));
      })
    })
  }

  static async delegationGetCreditDetail (page, component, id) {
    Locate.get('openView', {
      url: 'https://mapi.ekwing.com/student/user/getcreditdetail',
    })
  }

  static async exchangeSuccess (page, component, id) {
    Locate.get('exchangeSuccess')
  }

  static async delegationLayer (page, component, id) {
    Locate.get('vipPop');
  }
}
export default App;