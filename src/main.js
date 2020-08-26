import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'

import { firebase } from '@firebase/app'
import '@firebase/auth'
import '@firebase/database'
import firebaseConfig from './firebase/firebase'

/* import 'materialize-css/dist/js/materialize.min' */
import M from 'materialize-css'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/Loader'

Vue.config.productionTip = false

Vue.use(M)
Vue.use(Vuelidate)
Vue.use(messagePlugin)

Vue.component('Loader', Loader)

firebase.initializeApp(firebaseConfig)

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
