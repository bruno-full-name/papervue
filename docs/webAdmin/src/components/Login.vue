<template>
    <div>
        <div class="landing border-bottom-paperviu-dark">
            <div class="transp6 border-top-paperviu-sky">
                <div class="ui center aligned text container" style="padding: 50px">
                    <img src="src/assets/paperviu.png" style="height: 60px">
                </div>
                <div class="ui center aligned text container" style="padding: 0">
                    <div class="ui header text-paperviu-sky" style="margin: 0px">
                        <h1 style="margin-bottom: 0px" class="content">Iniciar Sesi&oacute;n</h1>
                        <div class="ui sub header text-paperviu-d7 large">m&oacute;dulo de administraci&oacute;n</div>
                    </div>
                    <div class="row" style="padding-top: 28px; display: block;">
                        <div class="ui left icon large input"
                             style="margin-bottom: 16px; padding: 5px">
                            <i class="user icon" style="margin-left: 7px"></i>
                            <input style="margin-left: 5px" v-on:keyup.enter="autenticar"
                                   v-model="username" type="text"
                                   placeholder="Ingrese su username...">
                        </div>
                        <div class="divider"></div>
                        <div class="ui left icon large compact input"
                             style="margin-bottom: 16px; padding: 5px">
                            <i class="privacy icon" style="margin-left: 7px"></i>
                            <input style="margin-left: 5px" v-on:keyup.enter="autenticar"
                                   v-model="password" type="password"
                                   placeholder="Ingrese su password...">
                        </div>
                        <div class="divider" style="padding: 16px"></div>
                        <button class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8 huge compact"
                                @click="autenticar"><i class="sign in icon"></i>Ingresar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';

    export default {
        data() {
            return {
                username: '',
                password: '',
                token: ''
            }
        },
        computed: {
            autenticarURL() {
                return this.$store.state.baseUrl + "login?username=" + this.username + "&password=" + this.password + "&tipo=0";
            },
            getUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/" + this.username;
            }
        },
        mounted(){
            document.title = 'Papervue';
        },
        methods: {
            autenticar() {
                if (this.username !== '' && this.password !== '') {
                    this.mostrarAutenticando();
                    var _this = this;
                    $.ajax({
                        url: _this.autenticarURL,
                        type: 'GET',
                        success: function (response) {
                            if (response === true || response === "true") {
                                $.ajax({
                                    url: _this.getUsuarioURL,
                                    type: 'GET',
                                    success: function (response2) {
                                        if (response2 !== undefined) {
                                            _this.token = response2.token;
                                            _this.crearSesionUsuario();
                                            _this.mostrarBienvenido$Usuario();
                                        }
                                    }
                                });
                            }
                            else _this.mostrarErrorAutenticar();
                        },
                        error: function (xhr, status, errorData) {
                            _this.mostrarErrorAutenticar();
                        }
                    });
                } else this.mostrarAlertIniciarSesion();
            },
            mostrarAutenticando() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Iniciando sesi&oacute;n...</h3>", noty.info);
            },
            mostrarErrorAutenticar() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Usuario o credenciales inv&aacute;lidos.</h3>", noty.error);
            },
            mostrarAlertIniciarSesion() {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Debes ingresar el username y contrase&ntilde;a!</h3>", noty.warning);
            },
            mostrarBienvenido$Usuario() {
                this.$noty.success("<h3 class=\"ui inverted header\">Bienvenido " + this.username + "</h3>", noty.success);
            },
            crearSesionUsuario() {
                this.$store.commit('setUsuario', this.username);
                this.$store.commit('setTokenUsr', this.token);
                this.$cookie.set('webAdmin-username', this.username);
                this.$cookie.set('webAdmin-tokenUsr', this.token);
                this.$store.commit('setAutenticado', true);
            }
        }
    }
</script>