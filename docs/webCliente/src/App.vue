<template>
    <div>
        <div id="nav" v-show="autenticado"
             :class="{push: sidebar}"
             class="ui secondary pointing fixed top large menu inverted paperviu-dark border-bottom-paperviu-sky"
             style="border-top: 0; border-left-style: none; border-right-style: none">
            <a @click="sidebar = !sidebar" :class="{'paperviu-sky': sidebar}" class="ui icon toc item"><i
                    class="sidebar inverted large icon"></i></a>
            <img v-show="!inicio" src="src/assets/paperviu-skyblue.png"
                 style="height: 37px; margin-top: 10px; margin-left: 7px; margin-right: 10px">
            <div v-show="!explorar && !inicio" class="ui active border-bottom-paperviu-sky item"
                 style="background-color: #666d75">
                <div class="ui transparent icon input inverted large" style="padding: 9px">
                    <i @clik="$router.push('explorar?cont=' + filtro); filtro = ''" class="search link icon"></i>
                    <input v-model="filtro" @keyup.enter="$router.push('explorar?cont=' + filtro); filtro = ''"
                           placeholder="Buscar contenidos..." type="text">
                </div>
            </div>
            <div class="right menu">
                <a id="chatPrivadoBtn" class="ui item" style="font-weight: 500;">
                    <i class="comments large icon"></i>Mensajes
                </a>
            </div>
            <div id="chatPrivadoPopup" class="ui transition hidden flowing basic inverted popup"
                 style="margin: 0; padding: 0; min-width: 300px;background-color: #3e444a; z-index:999;">
                <paperviu-chat-privado @popup="popupChatPrivado"></paperviu-chat-privado>
            </div>
        </div>
        <div id="sidebar" class="ui sidebar vertical secondary menu pointing inverted paperviu-dark"
             style="-webkit-transition-duration: 0.1s; overflow: visible !important;width: 200px; border: 0">
            <h4 class="ui header inverted border-sky"
                style="margin: 0; padding: 15px">
                <i class="user outline circle text-paperviu-sky icon"></i>
                {{ usuario.nombre + ' ' + usuario.apellido }}
            </h4>
            <div class="row" style="width: 197px; padding-top: 20px; padding-bottom: 10px">
                <a @click="$router.push('/');" class="ui item" style="padding: 16px"
                   :class="{'active text-paperviu-sky paperviu-d7 border-left-paperviu-sky': inicio, 'hover-border-paperviu-sky': !inicio}">
                    <h3 style="color: inherit; font-weight: 500;">
                        <i class="home icon" style="margin-top: -4px; margin-right: 10px"
                           :class="{'text-paperviu-sky': inicio}"></i>Inicio
                    </h3>
                </a>
                <a @click="$router.push('historial');" class="ui item" style="padding: 16px"
                   :class="{'active text-paperviu-sky paperviu-d7 border-left-paperviu-sky': historial, 'hover-border-paperviu-sky':!historial}">
                    <h3 style="color: inherit; font-weight: 500;">
                        <i class="history icon" style="margin-top: -4px; margin-right: 10px"
                           :class="{'text-paperviu-sky': historial}"></i>Historial
                    </h3>
                </a>
                <a @click="$router.push('explorar');" class="ui item" style="padding: 16px"
                   :class="{'active text-paperviu-sky paperviu-d7 border-left-paperviu-sky': explorar, 'hover-border-paperviu-sky':!explorar}">
                    <h3 style="color: inherit; font-weight: 500;">
                        <i class="list icon" style="margin-top: -4px; margin-right: 10px"
                           :class="{'text-paperviu-sky': explorar}"></i>Explorar
                    </h3>
                </a>
                <a @click="$router.push('reproducir');" class="ui item" style="padding: 16px"
                   :class="{'active text-paperviu-sky paperviu-d7 border-left-paperviu-sky': reproduccion, 'hover-border-paperviu-sky':!reproduccion}">
                    <h3 style="color: inherit; font-weight: 500;">
                        <i class="play icon" style="margin-top: -4px; margin-right: 10px"
                           :class="{'text-paperviu-sky': reproduccion}"></i>Reproducir
                    </h3>
                </a>
                <a @click="$router.push('perfil');" class="ui item" style="padding: 16px"
                   :class="{'active text-paperviu-sky paperviu-d7 border-left-paperviu-sky': perfil, 'hover-border-paperviu-sky':!perfil}">
                    <h3 style="color: inherit; font-weight: 500;">
                        <i class="edit icon" style="margin-top: -4px; margin-right: 10px"
                           :class="{'text-paperviu-sky': perfil}"></i>Ver perfil
                    </h3>
                </a>
                <a @click="$router.push('suscripciones');" class="ui item" style="padding: 16px"
                   :class="{'active text-paperviu-sky paperviu-d7 border-left-paperviu-sky': suscripciones, 'hover-border-paperviu-sky':!suscripciones}">
                    <h3 style="color: inherit; font-weight: 500;">
                        <i class="payment icon" style="margin-top: -4px; margin-right: 10px"
                           :class="{'text-paperviu-sky': suscripciones}"></i>Suscripciones
                    </h3>
                </a>
                <a class="ui item hover-border-paperviu-sky" style="padding: 16px"
                   @click="logout">
                    <h3 class="ui header" style="color: inherit; font-weight: 500;">
                        <i class="sign out icon" style="font-size: 19px; margin-top: -8px"></i>Cerrar Sesi&oacute;n
                    </h3>
                </a>
            </div>
            <div class="row">
                <div class="ui item">
                    <h2 class="title header" style="margin: 0; color: #a8cfd9; font-size: 19px"><i
                            class="star text-paperviu-sky icon"></i>Favoritos</h2>
                </div>
                <div class="content">
                    <div class="ui selection list">
                        <h3 v-for="fav in getFavoritos"
                            class="ui item hover-border-paperviu-sky hover-text-paperviu-sky"
                            style="padding: 10px; font-weight: 500; margin-left: 10px"
                            @click="$router.push('reproducir?cont=' + fav.idContenido)"
                        >{{ fav.titulo }}</h3>
                    </div>
                </div>
            </div>
        </div>
        <div id="pusher" class="pusher"
             :class="{push: sidebar}">
            <div v-if="!autenticado">
                <paperviu-index></paperviu-index>
            </div>
            <div v-if="autenticado" style="margin-top: 50px">
                <paperviu-evento></paperviu-evento>
                <transition name="fade" mode="out-in">
                    <router-view id="router"></router-view>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

    export default {
        data() {
            return {
                sidebar: false,
                filtro: '',
                ciudad: '',
                pais: ''
            }
        },
        mounted() {
            $('.ui.accordion').accordion();
            this.checkSesionUsuario();
            this.cargarCategorias();
            this.cargarTipos();
            $('#sidebar')
                .sidebar({silent: true})
                .sidebar('setting', 'dimPage', false)
                .sidebar('setting', 'closable', false)
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('attach events', '.toc.item');
            this.popupChatPrivado();
        },
        computed: {
            inicio() {
                return this.$store.state.vistaActual === 'Inicio';
            },
            explorar() {
                return this.$store.state.vistaActual === 'Explorar';
            },
            reproduccion() {
                return this.$store.state.vistaActual === 'Reproduccion';
            },
            perfil() {
                return this.$store.state.vistaActual === 'Perfil';
            },
            historial() {
                return this.$store.state.vistaActual === 'Historial';
            },
            suscripciones() {
                return this.$store.state.vistaActual === 'Suscripciones';
            },
            autenticado() {
                return this.$store.state.autenticado;
            },
            usuario() {
                return this.$store.state.usuario;
            },
            getCategorias() {
                return this.$store.state.categoriasList;
            },
            validarUsuarioURL() {
                return this.$store.state.baseUrl + "login/token?username=" + this.usuario.username + "&token=" + this.usuario.token;
            },
            getTipos() {
                return this.$store.state.tiposList;
            },
            getCategoriasURL() {
                return this.$store.state.baseUrl + "categorias";
            },
            usuario() {
                return this.$store.state.usuario;
            },
            cargarTiposURL() {
                return this.$store.state.baseUrl + "tipos/all";
            },
            getFavoritos() {
                return this.$store.state.favoritosList;
            },
            listarFavoritosURL() {
                return this.$store.state.baseUrl + "favoritos?username=" + this.usuario.username;
            },
            agregarSesionURL() {
                return this.$store.state.baseUrl + "sesiones?username=" + this.usuario.username + "&userAgent=" + bowser.name + " " + bowser.version + "&sistemaOperativo=" + bowser.osname + " " + bowser.osversion + "&ciudad=" + this.ciudad + "&pais=" + this.pais;
            },
            isSuscriptoURL() {
                return this.$store.state.baseUrl + "suscripciones/" + this.usuario.username;
            }
        },
        methods: {
            checkSesionUsuario() {
                if (this.$cookie.get('username') !== null) {
                    var usuario = {
                        username: this.$cookie.get('username'),
                        nombre: this.$cookie.get('nombre'),
                        apellido: this.$cookie.get('apellido'),
                        email: this.$cookie.get('email'),
                        token: this.$cookie.get('token'),
                        facebook: this.$cookie.get('facebook')
                    };
                    this.$store.commit('setUsuario', usuario);
                    this.$store.commit('setAutenticado', true);
                    this.listarFavoritos();
                    this.validarUsuario();
                }
            },
            validarUsuario() {
                var _this = this;
                $.get(this.validarUsuarioURL, function (response) {
                        if (response !== undefined) {
                            if (response === false || response === 'false') _this.logout();
                            else {
                                _this.isSuscripto();
                                $.get("https://ipinfo.io", function (response) {
                                    if (response != undefined) {
                                        _this.ciudad = response.city;
                                        _this.pais = response.country;
                                    }
                                    _this.agregarSesion();
                                }, "jsonp");
                            }
                        }
                    }
                );
            },
            isSuscripto() {
                if (this.usuario.username !== '') {
                    var _this = this;
                    $.get(this.isSuscriptoURL, function (response) {
                        if (response === true || response === "true") _this.$store.commit('setSuscripto', true);
                        else _this.$store.commit('setSuscripto', false);
                    });
                }
            },
            agregarSesion() {
                $.post(this.agregarSesionURL);
            },
            logout() {
                this.$router.push('/');
                this.sidebar = false;
                $('#sidebar').sidebar('hide');
                this.$store.commit('setUsuario', {});
                this.$cookie.delete('username');
                this.$cookie.delete('email');
                this.$cookie.delete('nombre');
                this.$cookie.delete('apellido');
                this.$cookie.delete('token');
                this.$cookie.delete('facebook');
                this.$store.commit('setFavoritosList', []);
                this.$store.commit('setAmistades', []);
                this.$store.commit('setAutenticado', false);
                this.$store.commit('setSuscripto', false);
                this.$store.commit('setContenidoActual', {
                    id: '',
                    titulo: '',
                    descripcion: '',
                    destacado: false,
                    payperview: false,
                    fecha: '',
                    empresa: '',
                    tipo: '',
                    precio: '',
                    pago: false,
                    imagen: '',
                    enVivo: false,
                    url: '',
                    imagenSrc: '',
                    actores: [],
                    directores: [],
                    categorias: [],
                    comentarios: [],
                    atributos: [],
                    videos: [],
                    valoracion: ''
                });
            },
            cargarCategorias() {
                var _this = this;
                $.ajax({
                    url: _this.getCategoriasURL,
                    type: 'GET',
                    success: function (response) {
                        if (response !== undefined) {
                            var categorias = [];
                            $.each(response, function (index, categoria) {
                                categorias.push({
                                    nombre: categoria.nombre
                                });
                            });
                            _this.$store.commit('setCategorias', categorias);
                        }
                    }
                });
            }
            ,
            cargarTipos() {
                var _this = this;
                $.get(_this.cargarTiposURL, function (res) {
                    var tipos = [];
                    $.each(res, function (index, tipo) {
                        tipos.push({
                            nombre: tipo.nombre,
                            link: tipo.descripcion
                        });
                    });
                    _this.$store.commit('setTipos', tipos);
                });
            },
            listarFavoritos() {
                var _this = this;
                $.get(this.listarFavoritosURL, function (response) {
                    if (response !== undefined) {
                        var favoritos = [];
                        $.each(response, function (index, fav) {
                            favoritos.push({
                                id: fav.id,
                                idContenido: fav.idCont,
                                titulo: fav.titulo
                            });
                        });
                        _this.$store.commit('setFavoritosList', favoritos);
                    }
                });
            },
            popupChatPrivado() {
                $('#chatPrivadoBtn').popup({
                    popup: $('#chatPrivadoPopup'),
                    inline: true,
                    on: 'click',
                    position: 'bottom right'
                });
            }
        },
        watch: {
            autenticado(newValue, oldValue) {
                if (newValue === true) this.isSuscripto();
            }
        }
    }
</script>
<style>
    @import "~vuejs-noty/dist/vuejs-noty.css";

    body.pushable > .pusher {
        background: #555d66;
    }

    .push {
        padding-left: 200px;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 0.100s ease;
    }

    .fade-leave {
    }

    .fade-leave-active {
        transition: opacity 0.100s ease;
        opacity: 0;
    }

    .border-right-sky {
        border-right: solid;
        border-right-color: #6eb0c0;
    }

    .active-grey {
        background-color: #b2c3cd;
    }

    .sidebar-visible {
        padding-left: 180px;
    }

    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0, 0, 0, 0);
        transform: rotate3d(0, 0, 0, 0);
        -webkit-transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        background-color: rgba(235, 241, 246, .1);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }

    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(110, 176, 192, .3);
    }

    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba(110, 176, 192, .5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(110, 176, 192, .5);
        margin: 0px;
        height: 100%;
    }

    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(110, 176, 192, .5);
    }
</style>