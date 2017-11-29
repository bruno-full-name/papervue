<template>
    <div id="app">
        <div id="sidebar" class="ui sidebar vertical left menu icon inverted paperviu-dark"
             style="-webkit-transition-duration: 0.1s; overflow: visible !important;">
            <a @click="sidebar = !sidebar" class="ui toc item" style="height: 50px">
                <i class="sidebar large icon" style="margin-top: 3px; display: inline"></i>
            </a>
            <div @click="$router.push('/');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': inicio}">
                <i class="home icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 18px; margin: 5px">Inicio</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div @click="$router.push('clientes');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': cliente}">
                <i class="users icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">Clientes</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div @click="$router.push('empresas');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': empresa}">
                <i class="user circle outline icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">Empresas</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div @click="$router.push('contenidos');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': contenido}">
                <i class="film icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">Contenidos</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div @click="$router.push('categorias');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': categoria}">
                <i class="tags icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">Categorias</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div @click="$router.push('tipos');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': tipos}">
                <i class="sitemap icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">Tipos</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div @click="$router.push('reportes');" style="padding: 13px" class="ui dropdown item"
                 :class="{'active border-left-paperviu-sky paperviu-d7': reporte}">
                <i class="pie chart icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">Reportes</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
            <div class="ui dropdown item" style="padding: 13px" @click="logout">
                <i class="sign out icon"></i>
                <div class="ui secondary menu paperviu-dark" style="border: 0">
                    <h1 class="ui header huge text-paperviu-e8" style="font-size: 20px; margin: 5px">
                        Cerrar Sesi&oacute;n</h1>
                    <div class="ui item" style="display: none"></div>
                </div>
            </div>
        </div>
        <div v-show="autenticado">
            <div class="ui secondary inverted pointing top fixed menu large paperviu-sky border-bottom-paperviu-dark"
                 style="border-top: 0; height: 50px; border-bottom-width: 4px">
                <a @click="sidebar = !sidebar" class="ui icon toc item"><i
                        class="sidebar large icon"></i></a>
                <img src="src/assets/paperviu-darkblue.png"
                     style="height: 35px;margin-left: 7px; margin-top: 7px">
                <div class="ui item" style="margin-left: -7px; padding-bottom: 9px">
                    <span class="ui header large text-paperviu-e8" style="font-weight: 500; margin: 0">{{$store.state.vistaActual}}</span></div>
            </div>
            <div id="pusher" class="pusher" style="margin-top: 48px" :class="{push: sidebar}">
                <transition name="fade" mode="out-in">
                    <router-view></router-view>
                </transition>
            </div>
        </div>
        <paperviu-login v-if="!autenticado"></paperviu-login>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                sidebar: false
            }
        },
        computed: {
            autenticado() {
                return this.$store.state.autenticado;
            },
            inicio() {
                return this.$store.state.vistaActual === "Inicio";
            },
            reporte() {
                return this.$store.state.vistaActual === "Reportes";
            },
            cliente() {
                return this.$store.state.vistaActual === "Clientes";
            },
            empresa() {
                return this.$store.state.vistaActual === "Empresas";
            },
            contenido() {
                return this.$store.state.vistaActual === "Contenidos";
            },
            categoria() {
                return this.$store.state.vistaActual === "Categorias";
            },
            tipos() {
                return this.$store.state.vistaActual === "Tipos";
            },
            usuario() {
                return this.$store.state.username;
            },
            validarUsuarioURL() {
                return this.$store.state.baseUrl + "login/token?username=" + this.usuario + "&token=" + this.$store.state.tokenUsr;
            }
        },
        mounted() {
            this.checkSesionUsuario();
            $('#sidebar')
                .sidebar({silent: true})
                .sidebar('setting', 'dimPage', false)
                .sidebar('setting', 'closable', false)
                .sidebar('setting', 'transition', 'overlay')
                .sidebar('attach events', '.toc.item');
            $(".ui.dropdown.item").dropdown({
                transition: "fade up",
                context: 'sidebar',
                on: "hover"
            });

        },
        methods: {
            checkSesionUsuario() {
                if (this.$cookie.get('webAdmin-username') !== null) {
                    this.$store.commit('setUsuario', this.$cookie.get('webAdmin-username'));
                    this.$store.commit('setTokenUsr', this.$cookie.get('webAdmin-tokenUsr'));
                    this.$store.commit('setAutenticado', true);
                    this.validarUsuario();
                }
            },
            logout() {
                if (this.$cookie.get('webAdmin-username') !== null) {
                    this.sidebar = false;
                    $('.ui.sidebar').sidebar('hide');
                    this.$cookie.delete('webAdmin-username');
                    this.$cookie.delete('webAdmin-tokenUsr');
                    this.$store.commit('setUsuario', '');
                    this.$store.commit('setTokenUsr', '');
                    this.$router.push('/');
                    this.$store.commit('setAutenticado', false);
                }
            },
            validarUsuario() {
                var _this = this;
                $.get(this.validarUsuarioURL, function (response) {
                    if (response !== undefined) {
                        if (response === false || response === 'false') {
                            _this.logout();
                        }
                    }
                });
            }
        }
    }
</script>
<style>
    @import "~vuejs-noty/dist/vuejs-noty.css";

    body.pushable > .pusher {
        background-color: #f1f5f9;
    }

    .push {
        padding-left: 50px;
    }

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 0.200s ease;
    }

    .fade-leave {
    }

    .fade-leave-active {
        transition: opacity 0.200s ease;
        opacity: 0;
    }

    .marginlefting {
        margin-left: 60px !important;
    }

    .displaynone {
        display: none !important;
    }

    .displayblock {
        display: block !important;
    }

    .sidebar .item i {
        font-size: 24px;
        margin-top: -5px !important;
    }

    .logo {
        height: 48px !important;
        padding: 10px !important;
    }

    .logo img {
        width: 100% !important;
        height: 38px !important;
    }

    .title.item {
        padding: .92857143em 1.14285714em !important;
    }

    .dropdown .menu .header {
        padding-top: 3.9px !important;
        padding-bottom: 3.9px !important;
    }
</style>