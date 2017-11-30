import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        vistaActual: 'Inicio',
        usuario: {
            username: '',
            nombre: '',
            apellido: '',
            token: '',
            email: '',
            facebook: false
        },
        autenticado: false,
        suscripto: false,
        baseUrl: 'http://papervue.jelastic.saveincloud.net/web/api',
        categoriasList: [],
        tiposList: [],
        contenidosList: [],
        contenidosDestacados: [],
        contenidoActual: {
            id: '',
            titulo: '',
            descripcion: '',
            destacado: false,
            payperview: false,
            fecha: '',
            empresa: '',
            tipo: '',
            precio: '',
            imagen: '',
            enVivo: false,
            url: '',
            tipoVideo: '',
            pago: false,
            imagenSrc: '',
            actores: [],
            directores: [],
            categorias: [],
            comentarios: [],
            atributos: [],
            videos: [],
            valoracion: ''
        },
        empresasList: [],
        favoritosList: [],
        reproducciones: [],
        clientes: [],
        solicitudes: [],
        amistades: [],
        pagos: []
    },
    getters: {
        listarTiposURL(state) {
            return state.baseUrl + "tipos/all";
        },
        listarCategoriasURL(state) {
            return state.baseUrl + "categorias";
        },
        listarEmpresasURL(state) {
            return state.baseUrl + "empresas/all";
        }
    },
    mutations: {
        setVistaActual(state, vista) {
            state.vistaActual = vista;
        },
        setUsuario(state, usuario) {
            state.usuario = usuario;
        },
        setAutenticado(state, autenticado) {
            state.autenticado = autenticado;
        },
        setTokenSesion(state, token) {
            state.token = token;
        },
        setCategorias(state, categoriasList) {
            state.categoriasList = categoriasList;
        },
        setTipos(state, tipos) {
            state.tiposList = tipos;
        },
        setContenidos(state, contenidos) {
            state.contenidosList = contenidos;
        },
        setEmpresas(state, empresas) {
            state.empresasList = empresas;
        },
        setContenidoActual(state, contenido) {
            state.contenidoActual = contenido;
        },
        setContenidosDestacados(state, contenidos) {
            state.contenidosDestacados = contenidos;
        },
        setFavoritosList(state, favoritos) {
            state.favoritosList = favoritos;
        },
        quitarFavorito(state, idFavorito) {
            state.favoritosList = state.favoritosList.filter(function (fav) {
                return fav.id !== idFavorito;
            });
        },
        agregarFavorito(state, fav) {
            state.favoritosList.push(fav);
        },
        setReproducciones(state, reproducciones) {
            state.reproducciones = reproducciones;
        },
        setClientesList(state, clientes) {
            state.clientes = clientes;
        },
        setSolicitudes(state, solicitudes) {
            state.solicitudes = solicitudes;
        },
        setAmistades(state, amistades) {
            state.amistades = amistades;
        },
        setSuscripto(state, suscripto) {
            state.suscripto = suscripto;
        },
        setPagos(state, pagos) {
            state.pagos = pagos;
        },
        quitarReproduccion(state, id){
            state.reproducciones = state.reproducciones.filter(function (item) {
                return item.idRep !== id;
            });
        }
    }

});