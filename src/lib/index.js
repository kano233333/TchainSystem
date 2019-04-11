import Vue from 'vue';
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import svgIcon from './svgIcon';

export default {
  install(Vue) {
    Vue.use(iView)
    Vue.use(svgIcon)
  }
}