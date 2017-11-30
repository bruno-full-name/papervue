import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        autenticado: false,
        username: '',
        tokenUsr: '',
        nombreEmpresa: '',
        vistaActual: 'Inicio',
        atributosCount: 0,
        atributosNuevoList: [],
        empresasList: [],
        empresas: [],
        usuariosList: [],
        tiposList: [],
        categoriasList: [],
        contenidosList: [],
        baseUrl: 'http://papervue.jelastic.saveincloud.net/web/api'
    },
    getters: {
        getAtributo(state, id) {
            return state.atributosNuevoList.filter(atributo => {
                return atributo.id = id;
            });
        },
        getAtributosList(state) {
            return state.atributosNuevoList;
        }
    },
    mutations: {
        setAtributosNuevoList(state, atributos) {
            state.atributosCount = 0;
            state.atributosNuevoList = atributos;
        },
        setAutenticado(state, estado) {
            state.autenticado = estado;
        },
        setUsuario(state, username) {
            state.username = username;
        },
        setEmpresasList(state, empresas) {
            state.empresasList = empresas;
        },
        setEmpresas(state, empresas) {
            state.empresas = empresas;
        },
        setUsuariosList(state, usuarios) {
            state.usuariosList = usuarios;
        },
        setTiposList(state, tipos) {
            state.tiposList = tipos;
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
        agregarAtributo(state, atributo) {
            state.atributosCount++;
            state.atributosNuevoList.push({
                'id': state.atributosCount,
                'clave': atributo.clave
            });
        },
        actualizarAtributo(state, atr) {
            state.atributosNuevoList[Number(atr.id) - 1].clave = atr.clave;
        },
        quitarAtributo(state, id) {
            state.atributosNuevoList = state.atributosNuevoList.filter(function (item) {
                return item.id !== id;
            });
        },
        quitarEmpresa(state, id) {
            state.empresasList = state.empresasList.filter(function (item) {
                return item.id !== id;
            });
        },
        setTokenUsr(state, token) {
            state.tokenUsr = token;
        }
    }
});