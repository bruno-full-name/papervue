import Vue from 'vue'
import VueRouter from 'vue-router';
import VueCookie from 'vue-cookie';
import VueNoty from 'vuejs-noty';
import VueImgInputer from 'vue-img-inputer';
import App from './App.vue';
import {store} from './store';
import VueCharts from 'vue-charts';

import Inicio from './components/Inicio.vue';
import Login from './components/Login.vue';
import Perfil from './components/Perfil.vue';
import Contenido from './components/Contenido.vue';
import ContenidoItem from './components/ContenidoItem.vue';
import Reporte from './components/Reporte.vue';
import VideoUpload from './components/VideoUpload.vue';
import ContenidoAtributo from './components/ContenidoAtributo.vue';
import ContenidoVideo from './components/ContenidoVideo.vue';
import ContenidoMod from './components/ContenidoMod.vue';
import ContenidoConfig from './components/ContenidoConfig.vue';
import ContenidoGeneral from './components/ContenidoGeneral.vue';
import ContenidoPortada from './components/ContenidoPortada.vue';
import Retiros from './components/Retiros.vue';

Vue.component('paperviu-inicio', Inicio);
Vue.component('paperviu-login', Login);
Vue.component('paperviu-perfil', Perfil);
Vue.component('paperviu-contenido', Contenido);
Vue.component('paperviu-contenido-item', ContenidoItem);
Vue.component('paperviu-reporte', Reporte);
Vue.component('paperviu-video-upload', VideoUpload);
Vue.component('paperviu-contenido-atributo', ContenidoAtributo);
Vue.component('paperviu-contenido-video', ContenidoVideo);
Vue.component('paperviu-contenido-mod', ContenidoMod);
Vue.component('paperviu-contenido-config', ContenidoConfig);
Vue.component('paperviu-contenido-general', ContenidoGeneral);
Vue.component('paperviu-contenido-portada', ContenidoPortada);
Vue.component('paperviu-retiros', Retiros);

Vue.component('VueImgInputer', VueImgInputer);
Vue.use(VueCookie);
Vue.use(VueNoty);
Vue.use(VueCharts);

Vue.use(VueRouter);
const routes = [
    {path: '/inicio', component: Inicio},
    {path: '/perfil', component: Perfil},
    {path: '/reportes', component: Reporte},
    {path: '/retiros', component: Retiros},
    {path: '/contenidos', component: Contenido},
    {path: '/', component: Inicio}
];
const router = new VueRouter({
    routes
});

new Vue({
    el: '#app',
    store,
    router,
    render: h => h(App)
});
