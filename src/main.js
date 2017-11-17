// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as fb from 'firebase'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import RotateLoader from 'vue-spinner/src/RotateLoader.vue'
import store from '@/store/store'

Vue.config.productionTip = false

Vue.use(iView)

Vue.component('bl-loader', RotateLoader)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
  created () {
    var config = {
      apiKey: 'AIzaSyAy3xXWQr-tfysim3-eNLKpTmt-L64JiV0',
      authDomain: 'balaban-30080.firebaseapp.com',
      databaseURL: 'https://balaban-30080.firebaseio.com',
      projectId: 'balaban-30080',
      storageBucket: 'balaban-30080.appspot.com',
      messagingSenderId: '230607839888'
    }

    fb.initializeApp(config)
    fb.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
    })
  }
})
