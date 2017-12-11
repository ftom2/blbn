// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {initializeApp, auth} from 'firebase'
import store from '@/store/store'
import Vuetify from 'vuetify'
import VueMoment from 'vue-moment'
import('vuetify/dist/vuetify.min.css')

Vue.use(Vuetify)
Vue.use(VueMoment);

Vue.config.productionTip = false


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

    initializeApp(config)
    auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignin', user)
      }
      else{
        this.$store.dispatch('setUser', null)
      }
    })
  }
})
