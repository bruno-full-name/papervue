import Vue from 'vue';
import App from './App.vue';
import {store} from './store';
import VueRouter from 'vue-router';
import Index from './components/Index.vue';
import Reproduccion from './components/Reproduccion.vue';
import Explorar from './components/Explorar.vue';
import ContenidoItem from './components/ContenidoItem.vue';
import Inicio from './components/Inicio.vue';
import Perfil from './components/Perfil.vue';
import VueCookie from 'vue-cookie';
import VueNoty from 'vuejs-noty';
import Historial from './components/Historial.vue';
import ContenidoDestacado from './components/ContenidoDestacado.vue';
import VueMediaElement from './components/VueMediaElement.vue';
import Chat from './components/Chat.vue';
import ChatPrivado from './components/ChatPrivado.vue';
import Evento from './components/Evento.vue';
import Compartir from './components/Compartir.vue';
import Suscripcion from './components/Suscripcion.vue';
import VueChatScroll from 'vue-chat-scroll';
import Vuebar from 'vuebar';


Vue.component('paperviu-index', Index);
Vue.component('paperviu-reproduccion', Reproduccion);
Vue.component('paperviu-contenido-item', ContenidoItem);
Vue.component('paperviu-inicio', Inicio);
Vue.component('paperviu-perfil', Perfil);
Vue.component('paperviu-explorar', Explorar);
Vue.component('paperviu-contenido-destacado', ContenidoDestacado);
Vue.component('paperviu-historial', Historial);
Vue.component('VueMediaElement', VueMediaElement);
Vue.component('paperviu-chat', Chat);
Vue.component('paperviu-evento', Evento);
Vue.component('paperviu-compartir', Compartir);
Vue.component('paperviu-chat-privado', ChatPrivado);
Vue.component('paperviu-suscripciones', Suscripcion);

Vue.use(Vuebar);
Vue.use(VueChatScroll);
Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueNoty);
const routes = [
    {
        path: '/reproducir',
        component: Reproduccion,
        props: (route) => ({
            contenidoSearch: route.query.cont,
            offset: route.query.offset,
            videoReproducir: route.query.video
        })
    },
    {
        path: '/explorar',
        component: Explorar,
        props: (route) => ({
            search: route.query.cont,
            tipoSearch: route.query.tipo,
            categoriaSearch: route.query.cat
        })
    },
    {path: '/perfil', component: Perfil},
    {path: '/historial', component: Historial},
    {path: '/suscripciones', component: Suscripcion},
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
