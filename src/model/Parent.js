import { Xhr, Func, Php } from '../vendor/lib';
import Fake from '../backend/Fake';

class Parent {
  static get (url, options) {
    options = options || {};
    options.credentials = 'include';
    return Fake.isDev ? Fake.fetch(url, options) : Xhr.fetch(url, options);
  }
  static post (url, options) {
    options = options || {};
    options.credentials = 'include';
    options.method = 'post';
    return Fake.isDev ? Fake.fetch(url, options) : Xhr.fetch(url, options);
  }
}

Object.assign(Parent, Func);
Object.assign(Parent, Php);

export default Parent;