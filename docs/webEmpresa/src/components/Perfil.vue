<template>
    <div>
        <div class="ui text container paperviu-e8 border-left-paperviu-sky" style="padding-bottom: 80px">
            <div class="ui center aligned basic segment paperviu-e4" style="margin: 0">
                <h1 class="ui header text-paperviu-sky" style="padding: 10px; font-size: 50px; margin: 0">
                    {{empresa.nombre}}</h1>
            </div>
            <div class="row" style="padding: 30px">
                <div class="ui left ribbon label large inverted paperviu-dark"
                     style="width: auto;margin-left: -15px; padding-top: 5px; padding-bottom: 5px">
                    <h4 class="ui header inverted" style="margin: 0"><i class="image icon"></i>Imagen de Portada</h4>
                </div>
            </div>
            <div class="ui center aligned basic segment" style="padding: 0px; margin: 0px">
                <VueImgInputer :imgSrc="imagenSrc" v-model="imagen"
                               style="background-color: #e9eff5" size="large"
                               bottomText="Click para cambiar la imagen de portada."
                               placeholder="Ingrese una imagen de portada de la empresa..."></VueImgInputer>
            </div>
            <div class="row" style="padding: 30px; padding-bottom: 0">
                <div class="ui left ribbon label large inverted paperviu-dark"
                     style="width: auto;margin-left: -15px; padding-top: 5px; padding-bottom: 5px">
                    <h4 class="ui header inverted" style="margin: 0"><i class="user outline circle icon"></i>Informaci&oacute;n de la empresa
                    </h4>
                </div>
            </div>
            <div class="ui basic segment" style="margin: 0; padding: 16px">
                <div class="ui fluid labeled input" style="margin-top: 16px">
                    <div class="ui basic right pointing text-paperviu-dark label">Link</div>
                    <input type="text" v-model="link"
                           placeholder="Ingrese un enlace al sitio web de la empresa...">
                </div>
                <div class="ui fluid labeled input" style="margin-top: 16px">
                    <div class="ui basic right pointing text-paperviu-dark label">Email</div>
                    <input type="text" v-model="email"
                           placeholder="Ingrese un Email para el usuario asociado a la empresa">
                </div>
            </div>
            <div class="row" style="padding: 30px; padding-bottom: 0">
                <div class="ui left ribbon label large inverted paperviu-dark"
                     style="width: auto;margin-left: -15px; padding-top: 5px; padding-bottom: 5px">
                    <h4 class="ui header inverted" style="margin: 0"><i class="paypal icon"></i>Informaci&oacute;n de PayPal
                    </h4>
                </div>
            </div>
            <div class="ui basic segment" style="margin: 0; padding: 16px">
                <div class="ui fluid labeled input" style="margin-top: 16px">
                    <div class="ui basic right pointing text-paperviu-dark label">Email</div>
                    <input type="text" v-model="emailPago"
                           placeholder="Ingrese un Email correspondiente a una cuenta de PayPal...">
                </div>
            </div>
            <div class="row" style="padding: 30px; padding-bottom: 0">
                <div class="ui left ribbon label large inverted paperviu-dark"
                     style="width: auto;margin-left: -15px; padding-top: 5px; padding-bottom: 5px">
                    <h4 class="ui header inverted" style="margin: 0"><i class="sign in icon"></i>Informaci&oacute;n de autenticaci&oacute;n
                    </h4>
                </div>
            </div>
            <div class="ui basic segment" style="margin: 0; padding: 16px">
                <div class="ui fluid labeled input" style="margin-top: 16px">
                    <div class="ui basic right pointing text-paperviu-dark label">Username</div>
                    <input type="text" v-model="username"
                           placeholder="Ingrese un Email para el usuario asociado a la empresa">
                </div>
                <div class="ui fluid labeled input" style="margin-top: 16px">
                    <div class="ui basic right pointing text-paperviu-dark label">Contrase&ntilde;a</div>
                    <input type="password" v-model="password"
                           placeholder="Ingrese una password nueva...">
                </div>
                <div class="ui fluid labeled input" style="margin-top: 16px">
                    <div class="ui basic right pointing label text-paperviu-dark">Confirmar Contrase&ntilde;a</div>
                    <input type="password" v-model="password2"
                           placeholder="Vuelva a ingresar la password...">
                </div>
            </div>
            <h3 class="ui header text-paperviu-d7" style="margin: 0; padding-left: 16px">
                <i class="info icon text-paperviu-sky"></i>Enviar Contrase&ntilde;a vacia para mantener la anterior.
            </h3>
            <div class="ui bottom fixed pointing secondary menu" style="border: 0">
                <div class="ui basic center aligned segment"
                     style="width: 100%; background-color: #f1f5f9; padding: 10px">
                    <button @click="updateEmpresa"
                            class="ui button large compact paperviu-sky hover-paperviu-63 text-paperviu-e8">
                        <i class="save icon"></i>Actualizar perfil
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';

    export default {
        data() {
            return {
                portada: '',
                link: '',
                email: '',
                username: '',
                emailPago: '',
                password: '',
                password2: '',
                imagen: Object,
                imagenSrc: ''
            }
        },
        computed: {
            empresa() {
                return this.$store.state.empresa;
            },
            usuario() {
                return this.$store.state.username;
            },
            updateEmpresaURL() {
                return this.$store.state.baseUrl + "empresas?nombre=" + this.empresa.nombre + "&username=" + this.username + "&link=" + this.link + "&email=" + this.email + "&password=" + this.password + "&emailPago=" + this.emailPago;
            },
            guardarImagenURL() {
                return this.$store.state.baseUrl + "empresas/imagen?nombre=" + this.empresa.nombre + "&imagen=";
            }
        },
        mounted() {
            document.title = 'Perfil de empresa';
            this.$store.commit('setVistaActual', 'Perfil');
            this.link = this.empresa.link;
            this.username = this.usuario;
            this.portada = this.empresa.imagen;
            this.email = this.empresa.email;
            this.cargarImgEmpresa();
        },
        methods: {
            updateEmpresa() {
                if (this.password === this.password2) {
                    this.mostrarInfo("Actualizando perfil...");
                    var _this = this;
                    $.ajax({
                        url: _this.updateEmpresaURL,
                        type: 'PUT',
                        success: function (response) {
                            if (response === 1 || response === "1") {
                                _this.empresa.link = _this.link;
                                _this.$cookie.set('linkEmp', _this.link);
                                _this.empresa.email = _this.email;
                                _this.$cookie.set('emailEmp', _this.email);
                                _this.mostrarExito("Perfil actualizado con exito!");
                                if (_this.imagen !== Object) _this.guardarImagen(1);
                            }
                            else if (response === 2 || response === "2") {
                                if (_this.imagen !== Object) _this.guardarImagen(2);
                                else _this.mostrarExitoImagen(2, 'Perfil actualizado con exito!');
                            } else _this.mostrarError("No se pudo actualizar perfil");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo actualizar perfil");
                        }
                    });
                } else this.mostrarErrorPassword();

            },
            guardarImagen(num) {
                var dpb = new Dropbox({accessToken: dropbox.token});
                var _this = this;
                this.mostrarInfo("Actualizando imagen...");
                dpb.filesUpload({
                    path: '/Aplicaciones/empresas/' + _this.empresa.nombre + _this.imagen.name.substring(_this.imagen.name.lastIndexOf('.'), _this.imagen.name.length),
                    contents: _this.imagen,
                    mute: true,
                    mode: {'.tag': 'overwrite'}
                }).then(function (response) {
                    var x = JSON.parse(JSON.stringify(response));
                    $.ajax({
                        url: _this.guardarImagenURL + x.name,
                        type: 'PUT',
                        success: function (data) {
                            if (data === true || data === "true") {
                                _this.empresa.imagen = x.name;
                                _this.$cookie.set('imgEmp', x.name);
                                _this.mostrarExitoImagen(num, 'Imagen actualizada!');
                            }
                            else _this.mostrarErrorActualizarImagen(num);
                        },
                        error: function (xhr, status, errorData) {
                            _this.mostrarErrorActualizarImagen(num);
                        }
                    });
                }).catch(function (error) {
                    _this.mostrarErrorActualizarImagen(num);
                });
            },
            mostrarErrorPassword() {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Las contrase&ntilde;as deben coincidir.</h3>", noty.warning);
            },
            mostrarExito(mensaje) {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>" + mensaje + "</h3>", noty.success);
            },
            mostrarError(mensaje) {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>" + mensaje + "</h3>", noty.error);
            },
            mostrarInfo(mensaje) {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>" + mensaje + "</h3>", noty.info);
            },
            mostrarExitoImagen(num, mensaje) {
                var _this = this;
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>" + mensaje + "</h3>", {
                    killer: true,
                    theme: 'metroui',
                    timeout: 2500,
                    layout: 'topRight',
                    callbacks: {
                        afterClose: function () {
                            if (num === 2) {
                                _this.mostrarAlertInicioSesion();
                            }
                        }
                    }
                });
            },
            mostrarErrorActualizarImagen(num) {
                var _this = this;
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo actualizar la imagen.</h3>", {
                    killer: true,
                    timeout: false,
                    theme: 'metroui',
                    layout: 'topRight',
                    modal: true,
                    callbacks: {
                        afterClose: function () {
                            if (num === 2) {
                                _this.mostrarAlertInicioSesion();
                            }
                        }
                    }
                });
            },
            mostrarAlertInicioSesion() {
                var _this = this;
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Debes volver a iniciar sesi&oacute;n para continuar.</h3>", {
                    killer: true,
                    timeout: false,
                    theme: 'metroui',
                    layout: 'center',
                    modal: true,
                    callbacks: {
                        afterClose: function () {
                            _this.$cookie.delete('webEmp-username');
                            _this.$store.commit('setUsuario', '');
                            _this.$router.push('/');
                            _this.$cookie.delete('empresa');
                            _this.$cookie.delete('linkEmp');
                            _this.$cookie.delete('imgEmp');
                            _this.$cookie.delete('emailEmp');
                            _this.$cookie.delete('tokenUsr');
                            _this.$store.state.empresa.nombre = '';
                            _this.$store.state.empresa.email = '';
                            _this.$store.state.empresa.link = '';
                            _this.$store.state.empresa.imagen = '';
                            _this.$store.state.empresa.tokenUsr = '';
                            _this.$store.commit('setAutenticado', false);
                        }
                    }
                });
            },
            cargarImgEmpresa() {
                if (this.empresa.imagen !== null && this.empresa.imagen !== "null" && this.empresa.imagen !== '') {
                    var _this = this;
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesGetTemporaryLink({path: '/Aplicaciones/empresas/' + _this.empresa.imagen})
                        .then(function (response) {
                            if (response !== undefined && response.link !== undefined && response.link !== '') _this.imagenSrc = response.link;
                        });
                }
            }
        }
    }
</script>
<style>

</style>