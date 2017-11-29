<template>
    <div>
        <div class="landing border-bottom-paperviu-dark">
            <div class="transp6 border-top-paperviu-sky">
                <div class="ui center aligned text container" style="padding: 50px">
                    <img src="src/assets/paperviu.png" style="height: 70px">
                </div>
                <div class="ui center aligned text container">
                    <h1 style="margin-bottom: 0; font-weight: 500" class="ui header text-paperviu-d7">Iniciar Sesi&oacute;n</h1>
                    <div class="ui sub header text-paperviu-sky huge" style="margin-top: 0">
                        m&oacute;dulo de administraci&oacute;n de empresas
                    </div>
                    <div id="login" class="row" style="padding-top: 28px; display: block;">
                        <div class="ui left icon large input"
                             style="margin-bottom: 16px; padding: 7px">
                            <i class="user icon" style="margin-left: 10px"></i>
                            <input v-on:keyup.enter="autenticarEmpresa" v-model="username"
                                   type="text"
                                   placeholder="Ingrese su username...">
                        </div>
                        <div class="divider"></div>
                        <div class="ui left icon large input"
                             style="padding: 7px">
                            <i class="privacy icon" style="margin-left: 10px"></i>
                            <input autocomplete="off" v-on:keyup.enter="autenticarEmpresa"
                                   v-model="password" type="password"
                                   placeholder="Ingrese su password...">
                        </div>
                        <div class="divider" style="padding: 16px"></div>
                        <button class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8 big" @click="autenticarEmpresa"><i
                                class="sign in icon"></i>Ingresar
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
                password: ''
            }
        },
        computed: {
            autenticarURL() {
                return this.$store.state.baseUrl + "login?username=" + this.username + "&password=" + this.password + "&tipo=2";
            },
            getEmpresaURL() {
                return this.$store.state.baseUrl + "empresas/usr/" + this.username;
            }
        },
        methods: {
            autenticarEmpresa() {
                if (this.username !== '' && this.password !== '') {
                    this.mostrarAutenticando();
                    var _this = this;
                    $.ajax({
                        url: _this.autenticarURL,
                        type: 'GET',
                        success: function (response) {
                            if (response === true || response === "true") {
                                _this.crearSesionUsuario();
                                _this.mostrarBienvenido$Usuario();
                            }
                            else _this.mostrarErrorAutenticar();
                        },
                        error: function (xhr, status, errorData) {
                            _this.mostrarErrorAutenticar();
                        }
                    });
                } else _this.mostrarAlertInicioSesion();
            },
            crearSesionUsuario() {
                this.$store.commit('setUsuario', this.username);
                this.$cookie.set('webEmp-username', this.username);
                var _this = this;
                $.get(this.getEmpresaURL, function (response) {
                    if (response !== undefined) {
                        _this.$store.state.empresa.nombre = response.nombre;
                        _this.$store.state.empresa.email = response.email;
                        _this.$store.state.empresa.link = response.link;
                        _this.$store.state.empresa.imagen = response.imagen;
                        _this.$store.state.empresa.tokenUsr = response.tokenUsr;
                        _this.$cookie.set('linkEmp', response.link);
                        _this.$cookie.set('empresa', response.nombre);
                        _this.$cookie.set('imgEmp', response.imagen);
                        _this.$cookie.set('emailEmp', response.email);
                        _this.$cookie.set('tokenUsr', response.tokenUsr);
                        _this.$store.commit('setAutenticado', true);
                    }
                });
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
            }
        }
    }
</script>