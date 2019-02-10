import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import firebase from 'firebase'
import "firebase/firestore"
import firebaseConfig from './config/firebase'
import VueYouTubeEmbed from 'vue-youtube-embed'

Vue.use(Vuetify);
Vue.use(VueYouTubeEmbed);
Vue.config.productionTip = false;
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
// db.settings({
//   timestampsInSnapshots: true
// });

Vue.$db = db;

new Vue({
  router,
  store,
  render: h => h(App),
  created () {
    firebase.auth().onAuthStateChanged(user => {
      this.$store.dispatch('STATE_CHANGED', user)
    });

    this.$store.dispatch('LOAD_BOOKS');
  }
}).$mount('#app');
