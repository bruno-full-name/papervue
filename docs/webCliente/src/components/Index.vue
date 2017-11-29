<template>
    <div>
        <div class="ui basic inverted vertical masthead center aligned segment" style="padding: 0px">
            <div class="landing">
                <div class="transp border-bottom-paperviu-sky">
                    <div class="ui text container" v-show="!login && !registrarse">
                        <div class="row" style="padding-top: 150px">
                            <img src="src/assets/paperviu-skyblue.png" style="height: 100px">
                        </div>
                        <h2>Servicio de Streaming de Contenido Multimedia</h2>
                        <div class="ui big compact inverted button" @click="login = !login"><i
                                class="add user icon"></i>
                            Ingresar
                        </div>
                        <div class="ui big compact inverted button" @click="registrarse = !registrarse"><i
                                class="add user icon"></i>
                            Registrarse
                        </div>
                    </div>
                    <div class="ui center aligend text container" v-show="login">
                        <div class="ui center aligned text container" style="padding: 20px">
                            <div class="ui header inverted" style="font-weight: 500; font-size: 35px;">
                                <button @click="login = !login"
                                        class="ui circular icon inverted basic button" style="font-size: 30px">
                                    <i class="left chevron icon"></i>
                                </button>
                                Iniciar sesi&oacute;n
                            </div>
                        </div>
                        <div class="ui basic segment" style="padding: 30px">
                            <center>
                                <div class="ui left icon big fluid input transparent border-left-paperviu-sky inverted"
                                     style="padding: 7px; max-width: 350px; background-color: #3e444a">
                                    <i class="user icon" style="margin-left: 10px"></i>
                                    <input style="height: 35px" autocomplete="off" v-on:keyup.enter="autenticarUsuario"
                                           v-model="usernameLogin" type="text"
                                           placeholder="Ingrese su username...">
                                </div>
                                <div class="ui left icon big fluid input transparent border-left-paperviu-sky inverted"
                                     style="padding: 7px; max-width: 350px; margin-top: 16px; background-color: #3e444a">
                                    <i class="privacy icon" style="margin-left: 10px"></i>
                                    <input style="height: 35px" autocomplete="off" v-on:keyup.enter="autenticarUsuario"
                                           v-model="passwordLogin" type="password"
                                           placeholder="Ingrese su password...">
                                </div>
                                <button @click="autenticarUsuario"
                                        class="ui big compact paperviu-sky hover-paperviu-63 text-paperviu-e8 button"
                                        style="margin-top: 22px"><i
                                        class="sign in icon"></i>Ingresar
                                </button>
                            </center>
                            <div class="ui header large inverted"
                                 style="margin-top: 20px; margin-bottom: 5px; font-weight: 500;">Accede con facebook
                            </div>
                            <button @click="autenticarUsuarioFacebook" class="ui large circular inverted icon button"
                                    style="margin: 10px"><i
                                    class="facebook f large icon"></i></button>
                        </div>
                    </div>
                    <div class="ui center aligned text container" v-show="registrarse">
                        <div class="ui center aligned text container" style="padding: 20px">
                            <div class="ui header inverted" style="font-weight: 500; font-size: 35px;">
                                <button @click="registrarse = !registrarse"
                                        class="ui circular icon inverted basic button" style="font-size: 30px">
                                    <i class="left chevron icon"></i>
                                </button>
                                Registrarse
                            </div>
                        </div>
                        <center>
                            <div class="ui labeled fluid small inverted input"
                                 style="margin-top: 20px; max-width: 350px;">
                                <div class="ui basic right pointing label">Nombre</div>
                                <input v-model="nombre" type="text" placeholder="Ingrese su nombre...">
                            </div>
                            <div class="ui labeled fluid small inverted input"
                                 style="margin-top: 13px; max-width: 350px;">
                                <div class="ui basic right pointing label">Apellido</div>
                                <input v-model="apellido" type="text" placeholder="Ingrese su apellido...">
                            </div>
                            <div class="ui labeled fluid small inverted input"
                                 style="margin-top: 13px; max-width: 350px;">
                                <div class="ui basic right pointing label">Email</div>
                                <input v-model="email" type="email" placeholder="Ingrese su email...">
                            </div>
                            <div class="ui labeled fluid small inverted input"
                                 style="margin-top: 13px; max-width: 350px;">
                                <div class="ui basic right pointing label">Username</div>
                                <input v-model="username" type="text" placeholder="Ingrese su username...">
                            </div>
                            <div class="ui labeled fluid small inverted input"
                                 style="margin-top: 13px; max-width: 350px;">
                                <div class="ui basic right pointing label">Password</div>
                                <input v-model="password" type="password" placeholder="Ingrese su password...">
                            </div>
                        </center>
                        <button class="ui huge paperviu-sky hover-paperviu-63 text-paperviu-e8 compact button"
                                @click="registrarUsuario" style="margin-top: 20px">
                            Confirmar
                        </button>
                        <div class="row" style="padding: 10px">
                            <div class="ui center aligned header inverted" style="font-weight: 500; margin: 0">
                                Registrarse con Facebook
                            </div>
                            <button @click="registrarUsuarioFacebook" class="ui large circular inverted icon button"
                                    style="margin: 10px"><i
                                    class="facebook f large icon"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui basic segment border-top-paperviu-sky" style="padding: 55px">
            <div class="ui middle aligned stackable grid text container">
                <div class="row">
                    <div class="ui center aligned text container">
                        <h1 class="ui header icon huge text-paperviu-sky">Introducci&oacute;n</h1>
                    </div>
                </div>
                <div class="row">
                    <div class="center aligned column">
                        <h2 class="ui header text-paperviu-e7">
                            PAPERVUE es un plataforma online de Streaming de Contenido Multimedia.</h2>
                        <p class="ui inverted header" style="font-weight: 500">
                            En el, tanto usuarios como empresas disfrutan de lo f&aacute;cil y r&aacute;pido que es compartir contenido con todo el mundo.<br>
                        </p>
                        <p class="ui inverted header" style="font-weight: 400">
                            Comienza por registrarte, y en seguida tendr&aacute;s acceso a miles de pel&iacute;culas, series, as&iacute; como tambi&eacute;n todos aquellos eventos que tienen lugar en la paltaforma.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row" style="padding: 50px; background-color: #3e444a">
            <div class="row">
                <div class="ui center aligned text container">
                    <div class="ui header huge text-paperviu-e8" style="margin: 0px">Caracter&iacute;sticas</div>
                    <h2 class="ui sub header huge text-paperviu-sky" style="margin: 5px">
                        descubre algunas de las razones por las cu&aacute;les comenzar ya mismo </h2>
                </div>
            </div>
            <div class="ui middle aligned stackable relaxed grid two column text container"
                 style="padding-top: 50px; padding-bottom: 30px">
                <div class="center aligned column">
                    <div class="row paperviu-dark border-bottom-paperviu-sky" style="padding: 20px">
                        <h1 class="ui icon huge header text-paperviu-e4" style="margin: 0px">
                            <i class="film circular text-paperviu-sky icon"></i>Contenidos
                        </h1>
                        <p class="ui header inverted" style="padding: 16px; font-weight: 500;">
                            Disfruta de la m&aacute;s variada y completa colecci&oacute;n de contenidos.
                        </p>
                    </div>
                </div>
                <div class="center aligned column">
                    <div class="row paperviu-dark border-bottom-paperviu-sky" style="padding: 20px">
                        <h1 class="ui icon huge header text-paperviu-e4" style="margin: 0px">
                            <i class="users circular text-paperviu-sky icon"></i>Amigos
                        </h1>
                        <p class="ui header inverted" style="padding: 16px; font-weight: 500;">
                            Ten tu lista de amigos con los cu&aacute;les chatear y compartir.
                        </p>
                    </div>
                </div>
                <div class="center aligned column">
                    <div class="row paperviu-dark border-bottom-paperviu-sky" style="padding: 20px">
                        <h1 class="ui icon huge header text-paperviu-e4" style="margin: 0px">
                            <i class="heart circular text-paperviu-sky icon"></i>Favoritos
                        </h1>
                        <p class="ui header inverted" style="padding: 16px; font-weight: 500;">
                            Gestiona tu lista de contenidos favoritos, accede con facilidad.
                        </p>
                    </div>
                </div>
                <div class="center aligned column">
                    <div class="row paperviu-dark border-bottom-paperviu-sky" style="padding: 20px">
                        <h1 class="ui icon huge header text-paperviu-e4" style="margin: 0px">
                            <i class="comments circular text-paperviu-sky icon"></i>Chat
                        </h1>
                        <p class="ui header inverted" style="padding: 16px; font-weight: 500;">
                            Mensajea con tus amigos, o con aquellos que est&aacute;n viendo lo mismo que vos.
                        </p>
                    </div>
                </div>
                <div class="center aligned column">
                    <div class="row paperviu-dark border-bottom-paperviu-sky" style="padding: 20px">
                        <h1 class="ui icon huge header text-paperviu-e4" style="margin: 0px">
                            <i class="share circular text-paperviu-sky icon"></i>Compartir
                        </h1>
                        <p class="ui header inverted" style="padding: 16px; font-weight: 500;">
                            Comparte contenidos con tus amigos en la plataforma, o con los de Facebook.
                        </p>
                    </div>
                </div>
                <div class="center aligned column">
                    <div class="row paperviu-dark border-bottom-paperviu-sky" style="padding: 20px">
                        <h1 class="ui icon huge header text-paperviu-e4" style="margin: 0px">
                            <i class="add to cart circular text-paperviu-sky icon"></i>Pay-Per-View
                        </h1>
                        <p class="ui header inverted" style="padding: 16px; font-weight: 500;">
                            Paga solo por los contenidos que quieras ver. Luego, vuelvelos a ver cuando quieras.
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-bottom-paperviu-sky">
            <div class="ui center aligned text container" style="padding: 80px">
                <div class="ui header huge text-paperviu-sky" style="margin: 0px">Planes</div>
                <h2 class="ui sub header huge inverted" style="margin: 0px">
                    Elije el tipo de suscripci&oacute;n que m&aacute;s se adapte a tus preferencias!</h2>
                <div class="ui center aligned three columns stackable grid" style="padding-top: 60px">
                    <div class="column">
                        <div class="ui huge statistic">
                            <div class="label text-paperviu-e4">usd</div>
                            <div class="value border-bottom-paperviu-sky">
                                <div class="ui small header text-paperviu-e7">5</div>
                            </div>
                            <div class="label" style="padding-top: 10px">
                                <div class="ui header large text-paperviu-e4" style="font-weight: 500;">
                                    Semanal
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui huge statistic">
                            <div class="label text-paperviu-e4">usd</div>
                            <div class="value border-bottom-paperviu-sky">
                                <div class="ui small header text-paperviu-e7">10</div>
                            </div>
                            <div class="label" style="padding-top: 10px">
                                <div class="ui header large text-paperviu-e4" style="font-weight: 500;">
                                    Mensual
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column">
                        <div class="ui huge statistic">
                            <div class="label text-paperviu-e4">usd</div>
                            <div class="value border-bottom-paperviu-sky">
                                <div class="ui small header text-paperviu-e7">100</div>
                            </div>
                            <div class="label" style="padding-top: 10px">
                                <div class="ui header large text-paperviu-e4" style="font-weight: 500;">
                                    Anual
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui basic center aligned segment" style="padding: 0px; margin: 0px">
            <div class="bkg">
                <div class="transp2 border-bottom-paperviu-sky">
                    <div class="ui center aligned text container" style="padding: 97px">
                        <img src="src/assets/paperviu-skyblue.png" style="height: 100px">
                    </div>
                </div>
            </div>
        </div>
        <div class="ui vertical footer segment paperviu-dark">
            <div class="ui center aligned container" style="padding: 32px">
                <div class="column">
                    <h4 class="ui inverted header"><i class="code icon"></i>TSI JavaEE - 2017 - Grupo 05</h4>
                    <div class="ui inverted link list">
                        <div class="ui small header item" style="margin: 5px">Agust&iacute;n Maidana</div>
                        <div class="ui small header item" style="margin: 5px">Bruno carballido</div>
                        <div class="ui small header item" style="margin: 5px">Nicolas Umpierrez</div>
                        <div class="ui small header item" style="margin: 5px">Nicolas Perez</div>
                        <div class="ui small header item" style="margin: 5px">Pedro Moretto</div>
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
                login: false,
                registrarse: false,
                nombre: '',
                apellido: '',
                username: '',
                email: '',
                password: '',
                usernameLogin: '',
                passwordLogin: '',
                facebook: false,
                ciudad: '',
                pais: ''
            }
        },
        computed: {
            registrarUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios?nombre=" + this.nombre + "&apellido=" + this.apellido + "&username=" + this.username + "&email=" + this.email + "&password=" + this.password + "&estado=true&tipo=Cliente";
            },
            validarUsernameURL() {
                return this.$store.state.baseUrl + "usuarios/validar/" + this.usernameLogin;
            },
            autenticarUsuarioURL() {
                return this.$store.state.baseUrl + "login?username=" + this.usernameLogin + "&password=" + this.passwordLogin + "&tipo=1";
            },
            autenticarUsuarioFacebookURL() {
                return this.$store.state.baseUrl + "login/facebook?username=" + this.usernameLogin;
            },
            getUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios/" + this.usernameLogin;
            },
            agregarSesionURL() {
                return this.$store.state.baseUrl + "sesiones?username=" + this.usernameLogin + "&userAgent=" + bowser.name + " " + bowser.version + "&sistemaOperativo=" + bowser.osname + " " + bowser.osversion + "&ciudad=" + this.ciudad + "&pais=" + this.pais;
            }
        },
        mounted() {
            document.title = 'Papervue';
        },
        methods: {
            registrarUsuario() {
                this.mostrarInfo("Registrando usuario...");
                var _this = this;
                $.post(_this.registrarUsuarioURL, function (response) {
                    if (response === true || response === "true") {
                        _this.mostrarExito("Usuario registrado!");
                        _this.usernameLogin = _this.username;
                        _this.passwordLogin = _this.password;
                        setTimeout(function () {
                            _this.autenticarUsuario();
                        }, 1500);
                    } else _this.mostrarError("No se pudo crear el usuario. Intente con otro username");
                }).fail(function () {
                    _this.mostrarError("No se pudo realizar la solicitud. Por favor vuelve a intentar");
                });
            },
            registrarUsuarioFacebook() {
                var _this = this;
                FB.login(function (response2) {
                    if (response2['status'] == 'connected') {
                        FB.api('/me', {fields: 'first_name,last_name,id,email'}, function (response) {
                            if (response !== undefined) {
                                _this.mostrarInfo("Registrando usuario...");
                                _this.username = response["email"];
                                _this.nombre = response["first_name"];
                                _this.apellido = response["last_name"];
                                _this.email = response["email"];
                                $.post(_this.registrarUsuarioURL, function (data) {
                                    if (data === true || data === "true") {
                                        _this.mostrarExito("Registro completado!")
                                        _this.usernameLogin = response["email"];
                                        setTimeout(function () {
                                            _this.autenticarUsuarioFacebookDespuesRegistro();
                                        }, 1000);
                                    } else _this.mostrarError("No se pudo registrar el usuario");
                                }).fail(function () {
                                    _this.mostrarError("No se pudo enviar solicitud. Por favor vuelve a intentar");
                                });
                            }
                            else _this.mostrarError("No se pudo registrar el usuario");
                        });
                    }
                    else _this.mostrarAlerta("Primero debes autenticarte con Facebook!");
                }, {scope: 'public_profile,email'});
            },
            autenticarUsuario() {
                if (this.usernameLogin !== '' && this.passwordLogin !== '') {
                    var _this = this;
                    $.get(this.autenticarUsuarioURL, function (response) {
                        if (response === true || response === "true") {
                            _this.crearSesionUsuario();
                            _this.mostrarExito("Bienvenido " + _this.usernameLogin + "!");
                        }
                        else _this.mostrarError("Credenciales incorrectas, o usuario bloqueado")
                    }).fail(function () {
                        _this.mostrarError("No se pudo autenticar, por favor vuelve a intentar");
                    });
                } else this.mostrarAlerta("Debes ingresar un username y passowrd!");
            },
            autenticarUsuarioFacebook() {
                var _this = this;
                FB.login(function (response2) {
                    if (response2['status'] == 'connected') {
                        FB.api('/me', {fields: 'first_name,last_name,id,email'}, function (response) {
                            _this.mostrarInfo("Autenticando usuario...");
                            if (response !== undefined) {
                                _this.usernameLogin = response.email;
                                $.get(_this.autenticarUsuarioFacebookURL, function (data) {
                                    if (data !== undefined) {
                                        if (data === true || data === "true") {
                                            _this.facebook = true;
                                            _this.crearSesionUsuario();
                                            _this.mostrarExito("Bienvenido " + _this.usernameLogin + "!");
                                        } else _this.mostrarError("Credenciales incorrectas, o usuario bloueado");
                                    } else _this.mostrarError("No se pudo autenticar, por favor vuelve a intentar");
                                }).fail(function () {
                                    _this.mostrarError("No se pudo autenticar, por favor vuelve a intentar");
                                });
                            } else _this.mostrarError("No se pudo autenticar, por favor vuelve a intentar");
                        });
                    }
                }, {scope: 'public_profile,email'});
            },
            autenticarUsuarioFacebookDespuesRegistro() {
                this.mostrarInfo("Autenticando usuario...");
                var _this = this;
                $.get(_this.autenticarUsuarioFacebookURL, function (data) {
                    if (data === true || data === "true") {
                        _this.crearSesionUsuario();
                        _this.mostrarExito("Bienvenido " + _this.usernameLogin + "!");
                    }
                    else _this.mostrarError("Credenciales incorrectas, o usuario bloueado");
                }).fail(function () {
                    _this.mostrarError("No se pudo autenticar, por favor vuelve a intentar");
                });
            },
            agregarSesion() {
                $.post(this.agregarSesionURL);
            },
            crearSesionUsuario() {
                var _this = this;
                $.get(this.getUsuarioURL, function (response) {
                    if (response !== undefined) {
                        var usuario = {
                            username: response.username,
                            nombre: response.nombre,
                            apellido: response.apellido,
                            email: response.email,
                            token: response.token,
                            facebook: _this.facebook
                        };
                        _this.$cookie.set('username', response.username);
                        _this.$cookie.set('email', response.email);
                        _this.$cookie.set('nombre', response.nombre);
                        _this.$cookie.set('apellido', response.apellido);
                        _this.$cookie.set('token', response.token);
                        _this.$cookie.set('facebook', _this.facebook);
                        _this.$store.commit('setUsuario', usuario);
                        _this.$store.commit('setAutenticado', true);
                        $.get("https://ipinfo.io", function (response) {
                            if (response != undefined) {
                                _this.ciudad = response.city;
                                _this.pais = response.country;
                            }
                            _this.agregarSesion();
                        }, "jsonp");
                    }
                });
            },
            mostrarExito(mensaje) {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i> " + mensaje + "</h3>", noty.success);
            },
            mostrarError(mensaje) {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i> " + mensaje + "</h3>", noty.error);
            },
            mostrarInfo(mensaje) {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i> " + mensaje + "</h3>", noty.info);
            },
            mostrarAlerta(mensaje) {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>" + mensaje + "</h3>", noty.warning);
            },
        }
    }
</script>