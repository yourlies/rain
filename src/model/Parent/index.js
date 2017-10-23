import Xhr from './lib/Xhr.js';
import { Func, Php } from '../../vendor/lib';

class Parent {
  static get (url, options) {
    options = options || {};
    options.credentials = 'include';
    Xhr.fetch('/', options);
  }
  static post (url, options) {
    options = options || {};
    options.credentials = 'include';
    options.method = 'post';
  }
}

Object.assign(Parent, Func);
Object.assign(Parent, Php);

export default Parent;