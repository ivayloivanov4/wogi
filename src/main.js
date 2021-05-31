import Vue from 'vue'
import App from './App.vue'
import Buefy from "buefy"
import axios from "axios";
import VueAxios from "vue-axios";
// import "./scss/bulma.scss"
import "./scss/main.scss"
import { library } from '@fortawesome/fontawesome-svg-core'
import { faChevronDown, faChevronUp, faGlobe } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faTwitter, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faChevronDown, faChevronUp, faFacebook, faGlobe, faTwitter, faInstagram)
import { required } from "vee-validate/dist/rules";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";

Vue.use(Buefy);
Vue.use(VueAxios,axios);
Vue.component('font-awesome-icon', FontAwesomeIcon)

extend("required", {
  ...required,
  message: "*Please enter {_field_}",
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
