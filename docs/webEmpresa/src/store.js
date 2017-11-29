import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        autenticado: false,
        empresa: {
            nombre: '',
            link: '',
            imagen: '',
            email: '',
            tokenUsr: ''
        },
        username: '',
        vistaActual: 'Inicio',
        categoriasList: [],
        tiposList: [],
        contenidosList: [],
        baseUrl: 'http://localhost:8080/web/api/',
        infoBasicaNuevo: true,
        videosNuevo: false,
        idContenidoCreado: '',
        contenidosModList: [],
        videoNuevo: {}
    },
    getters: {
        isAutenticado(state) {
            return state.autenticado;
        },
        getCategorias(state) {
            return state.categoriasList;
        },
        getTipos(state) {
            return state.tiposList;
        }
    },
    mutations: {
        setVideoNuevo(state, video) {
            state.videoNuevo = video;
        },
        addContenidoModList(state, id) {
            state.contenidosModList.push({
                id: id,
                info: undefined,
                actores: undefined,
                directores: undefined,
                categorias: undefined,
                atributos: undefined,
                videos: undefined,
                imagenSrc: ''
            });
        },
        quitarVideoContenidosModList(state, id) {
            state.contenidosModList.videos = state.contenidosModList.videos.filter(function (item) {
                return item.id !== id;
            });
        },
        setIdContenidoCreado(state, value) {
            state.idContenidoCreado = value;
        },
        setVideosNuevo(state, value) {
            state.videosNuevo = value;
        },
        setAutenticado(state, estado) {
            state.autenticado = estado;
        },
        setUsuario(state, username) {
            state.username = username;
        },
        setCategorias(state, categoriasList) {
            state.categoriasList = categoriasList;
        },
        setContenidosList(state, contenidos) {
            state.contenidosList = contenidos;
        },
        setVistaActual(state, vista) {
            state.vistaActual = vista;
        },
        actualizarAtributo(state, datos) {
            state.contenidosModList.find(c => c.id == datos.idCont).atributos.find(a => a.id == datos.atr.id).valor = datos.atr.valor;
        },
        setTiposList(state, tipos) {
            state.tiposList = tipos;
        }
    }
});