import Vue from 'vue';
import VueRouter from 'vue-router';
import VueImgInputer from 'vue-img-inputer';
import VueNoty from 'vuejs-noty';

import App from './App.vue';
import Reporte from './components/Reporte.vue';
import Cliente from './components/Cliente.vue';
import Categoria from './components/Categoria.vue';
import Empresa from './components/Empresa.vue';
import Contenido from './components/Contenido.vue';
import ContenidoItem from './components/ContenidoItem.vue';
import Login from './components/Login.vue';
import Inicio from './components/Inicio.vue';
import Tipo from './components/Tipo.vue';
import Atributo from './components/Atributo.vue';
import VueCookie from 'vue-cookie';

import {store} from './store';

Vue.component('paperviu-reporte', Reporte);
Vue.component('paperviu-cliente', Cliente);
Vue.component('paperviu-categoria', Categoria);
Vue.component('paperviu-empresa', Empresa);
Vue.component('paperviu-contenido', Contenido);
Vue.component('paperviu-contenido-item', ContenidoItem);
Vue.component('paperviu-login', Login);
Vue.component('paperviu-inicio', Inicio);
Vue.component('paperviu-tipo', Tipo);
Vue.component('paperviu-atributo', Atributo);


import Chartkick from 'chartkick';
import VueChartkick from 'vue-chartkick';
import VueCharts from 'vue-charts';

Vue.use(VueChartkick, { Chartkick });

Vue.component('VueImgInputer', VueImgInputer);
Vue.use(VueCookie);
Vue.use(VueNoty);
Vue.use(VueCharts);

Vue.use(VueRouter);
const routes = [
    {path: '/reportes', component: Reporte},
    {path: '/clientes', component: Cliente},
    {path: '/categorias', component: Categoria},
    {path: '/empresas', component: Empresa},
    {path: '/contenidos', component: Contenido},
    {path: '/tipos', component: Tipo},
    {path: '/', component: Inicio}
];

const router = new VueRouter({routes});

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
