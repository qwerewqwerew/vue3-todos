import { createApp } from 'vue'
import App from './App.vue'
import link from './router';
import store from './store';

createApp(App).use(store).use(link).mount('#app')
