<template>
    <div id="app">
        <div v-if="autenticado">
            <div class="ui secondary pointing inverted top fixed stackable menu"
                 style="margin: 0;border: 0; background-color: #3e444a">
                <div class="ui image paperviu-sky">
                    <img src="src/assets/paperviu-darkblue.png"
                         style="padding: 0; margin-left: 7px; margin-right: 7px; height: 37px; margin-top: 5px">
                </div>
                <a :class="{'active paperviu-d7 border-bottom-paperviu-sky': inicio, 'text-paperviu-e4': !inicio}"
                   @click="$router.push('/')" class="ui item">
                    <span style="margin: 0; color: inherit; font-size: 20px; font-weight: 500;">Inicio</span>
                </a>
                <a :class="{'active paperviu-d7 border-bottom-paperviu-sky': contenido, 'text-paperviu-e4': !contenido}"
                   @click="$router.push('contenidos')" class="ui item">
                    <span style="margin: 0; color: inherit; font-size: 20px; font-weight: 500;">Contenidos</span>
                </a>
                <a :class="{'active paperviu-d7 border-bottom-paperviu-sky': reporte, 'text-paperviu-e4': !reporte}"
                   @click="$router.push('reportes')" class="ui item">
                    <span style="margin: 0; color: inherit; font-size: 20px; font-weight: 500;">Reportes</span>
                </a>
                <a :class="{'active paperviu-d7 border-bottom-paperviu-sky': perfil, 'text-paperviu-e4': !perfil}"
                   @click="$router.push('perfil')" class="ui item">
                    <span style="margin: 0; color: inherit; font-size: 20px; font-weight: 500;">Perfil</span>
                </a>
                <a :class="{'active paperviu-d7 border-bottom-paperviu-sky': retiros, 'text-paperviu-e4': !retiros}"
                   @click="$router.push('retiros')" class="ui item">
                    <span style="margin: 0; color: inherit; font-size: 20px; font-weight: 500;">Retiros</span>
                </a>
                <div class="right menu">
                    <a @click="logout" class="ui item text-paperviu-e4" style="margin-bottom: 0">
                        <i class="sign out icon"></i><span
                            style="margin: 0; color: inherit; font-size: 18px; font-weight: 500;">Salir</span>
                    </a>
                </div>
            </div>
            <div style="margin-top: 44px">
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
        computed: {
            autenticado() {
                return this.$store.state.autenticado;
            },
            inicio() {
                return this.$store.state.vistaActual === 'Inicio';
            },
            reporte() {
                return this.$store.state.vistaActual === 'Reportes';
            },
            contenido() {
                return this.$store.state.vistaActual === 'Contenidos';
            },
            perfil() {
                return this.$store.state.vistaActual === 'Perfil';
            },
            retiros() {
                return this.$store.state.vistaActual === 'Retiros';
            },
            usuario() {
                return this.$store.state.username;
            },
            empresa() {
                return this.$store.state.empresa;
            },
            validarUsuarioURL() {
                return this.$store.state.baseUrl + "login/token?username=" + this.usuario + "&token=" + this.empresa.tokenUsr;
            }
        },
        mounted() {
            this.checkSesionUsuario();
        },
        methods: {
            checkSesionUsuario() {
                if (this.$cookie.get('webEmp-username') !== null) {
                    this.$store.commit('setUsuario', this.$cookie.get('webEmp-username'));
                    if (this.$cookie.get('empresa') !== null) {
                        this.empresa.nombre = this.$cookie.get('empresa');
                        this.empresa.link = this.$cookie.get('linkEmp');
                        this.empresa.imagen = this.$cookie.get('imgEmp');
                        this.empresa.email = this.$cookie.get('emailEmp');
                        this.empresa.tokenUsr = this.$cookie.get('tokenUsr');
                        this.$store.commit('setAutenticado', true);
                    }
                    this.validarUsuario();
                }
            },
            logout() {
                if (this.$cookie.get('webEmp-username') !== null) {
                    this.$cookie.delete('webEmp-username');
                    this.$store.commit('setUsuario', '');
                    if (this.$cookie.get('empresa') !== null) {
                        this.$router.push('/');
                        this.$cookie.delete('empresa');
                        this.$cookie.delete('linkEmp');
                        this.$cookie.delete('imgEmp');
                        this.$cookie.delete('emailEmp');
                        this.$cookie.delete('tokenUsr');
                        this.$store.state.empresa.nombre = '';
                        this.$store.state.empresa.email = '';
                        this.$store.state.empresa.link = '';
                        this.$store.state.empresa.imagen = '';
                        this.$store.state.empresa.tokenUsr = '';
                        this.$store.commit('setAutenticado', false);
                    }
                }
            },
            validarUsuario() {
                var _this = this;
                $.get(this.validarUsuarioURL, function (response) {
                    if (response !== undefined) {
                        if (response === false || response === 'false') _this.logout();
                    }
                });
            }
        }
    }
</script>
<style>
    @import "~vuejs-noty/dist/vuejs-noty.css";

    .fade-enter {
        opacity: 0;
    }

    .fade-enter-active {
        transition: opacity 0.127s ease;
    }

    .fade-leave {
    }

    .fade-leave-active {
        transition: opacity 0.127s ease;
        opacity: 0;
    }
</style>