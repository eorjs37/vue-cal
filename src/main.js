import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.mount('#app');
app.config.errorHandler = () => null;
app.config.warnHandler = () => null;
