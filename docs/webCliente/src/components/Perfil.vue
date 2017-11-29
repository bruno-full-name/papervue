<template>
    <div>
        <div class="ui basic segment secondary" id="menu2" style="padding: 1px; margin: 0; background-color: #3e444a">
            <div class="ui container">
                <h3 class="ui header inverted"
                    style="margin-bottom: 0; margin-top: 3px; margin-left: 16px; padding: 5px"><i
                        class="user circle outline icon text-paperviu-sky"></i>{{ usuario.username }}</h3>
            </div>
        </div>
        <div class="ui stackable two column grid container" style="padding-bottom: 50px">
            <div class="column" style="padding: 30px">
                <div class="ui row border-left-paperviu-sky paperviu-d7" style="margin-top: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="margin-left: 13px; margin-top: 10px">
                        <i class="edit icon"></i>Perfil de Usuario
                    </h1>
                    <div class="ui basic segment">
                        <div class="ui fluid labeled input" style="padding: 10px">
                            <div class="ui basic right pointing text-paperviu-dark label">Nombre</div>
                            <input type="text" id="tituloNuevo" v-model="nombre"
                                   placeholder="Ingrese un enlace al sitio web de la empresa...">
                        </div>
                        <div class="ui fluid labeled input" style="padding: 10px">
                            <div class="ui basic right pointing text-paperviu-dark label">Apellido</div>
                            <input type="text" v-model="apellido"
                                   placeholder="Ingrese un Email para el usuario asociado a la empresa">
                        </div>
                        <div class="ui fluid labeled input" style="padding: 10px">
                            <div class="ui basic right pointing text-paperviu-dark label">Email</div>
                            <input type="text" v-model="email" autocomplete="false"
                                   placeholder="Ingrese un Email para el usuario asociado a la empresa">
                        </div>
                        <div class="ui fluid labeled input" style="padding: 10px" v-if="!facebook">
                            <div class="ui basic right pointing text-paperviu-dark label">Contrase&ntilde;a</div>
                            <input type="password" v-model="password1"
                                   placeholder="Ingrese una password nueva...">
                        </div>
                        <div class="ui fluid labeled input" style="padding: 10px" v-if="!facebook">
                            <div class="ui basic right pointing label text-paperviu-dark">Confirmar Contrase&ntilde;a
                            </div>
                            <input type="password" v-model="password2"
                                   placeholder="Vuelva a ingresar la password...">
                        </div>
                        <h3 class="ui header text-paperviu-e8" v-if="!facebook"><i
                                class="info icon text-paperviu-sky"></i>Enviar Contrase&ntilde;a vacia para mantener la anterior.
                        </h3>
                    </div>
                    <div class="ui basic center aligned segment paperviu-d7">
                        <button @click="actualizarUsuario"
                                class="ui paperviu-sky text-paperviu-e8 hover-paperviu-63 button"><i
                                class="save icon"></i>Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
            <div class="column" style="padding: 30px">
                <div class="ui row border-left-paperviu-sky paperviu-d7" style="margin-top: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="margin-left: 13px; margin-top: 10px">
                        <i class="user add icon"></i>Enviar solicitud de amistad
                    </h1>
                    <div class="row" style="padding: 16px">
                        <div class="ui action fluid input">
                            <select v-model="usernameReceptor" class="ui fluid selection dropdown" style="width: 100%">
                                <option v-for="cliente in clientes" :value="cliente.username">
                                    {{cliente.nombreCompleto}}
                                </option>
                                <option selected disabled value="">Seleccionar un usuario...</option>
                            </select>
                            <div @click="enviarSolicitudAmistad"
                                 class="ui left attached inverted hover-text-paperviu-sky text-paperviu-dark active button"
                                 style="margin-left: -3px"><i class="send icon"></i>Enviar solicitud
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="solicitudes.length > 0" class="ui row border-left-paperviu-sky paperviu-d7"
                     style="margin-top: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="margin-left: 13px; margin-top: 10px">
                        <i class="handshake icon"></i>Solicitudes de amistad
                    </h1>
                    <div class="row" style="padding: 16px">
                        <template v-for="solicitud in solicitudes">
                            <div class="ui secondary stackable pointing menu paperviu-e4 border-bottom-paperviu-sky">
                                <div class="ui item">
                                    <h3 class="ui header text-paperviu-d7">{{solicitud.nombreEmisor}}
                                        <span class="ui sub header huge text-paperviu-63" style="font-weight: 600">Le ha enviado una solicitud de amistad</span>
                                    </h3>
                                </div>
                                <div class="right menu">
                                    <div class="ui item" style="margin: 0">
                                        <button @click="idAmistadActual = solicitud.solicitudId; aceptarSolicitudAmistad();"
                                                style="margin-right: 7px"
                                                class="ui circular paperviu-sky hover-paperviu-63 text-paperviu-e8 icon button">
                                            <i class="checkmark icon"></i>
                                        </button>
                                        <button :id="solicitud.id"
                                                @click="popupEliminar(solicitud.id, solicitud.id + 'popup')"
                                                class="ui circular paperviu-d7 hover-paperviu-dark text-paperviu-e8 icon button">
                                            <i class="trash icon"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div :id="solicitud.id + 'popup'" class="ui popup flowing transition hidden"
                                 style="padding: 0">
                                <div class="ui secondary menu"
                                     style="margin: 0">
                                    <h3 class="ui header text-paperviu-d7"
                                        style="margin-top: 8px; margin-left: 15px; margin-right: 5px">
                                        &iquest;Confirmar?</h3>
                                    <a @click="idAmistadActual = solicitud.solicitudId; eliminarSolicitud(solicitud.id);"
                                       class="ui item hover-paperviu-e8" style="margin: 0"><span
                                            class="ui header text-paperviu-sky">Eliminar</span></a>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div v-show="amistades.length > 0" class="ui row border-left-paperviu-sky paperviu-d7"
                     style="margin-top: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="margin-left: 13px; margin-top: 10px">
                        <i class="users icon"></i>Amistades
                    </h1>
                    <div class="row" style="padding: 16px">
                        <template v-for="amistad in amistades">
                            <div class="ui secondary stackable pointing menu paperviu-e8 border-bottom-paperviu-sky">
                                <div class="ui item">
                                    <h3 class="ui header text-paperviu-d7">{{amistad.nombreEmisor}}<br>
                                        <span class="text-paperviu-63" style="font-weight: 600">{{amistad.nombreReceptor}}</span>
                                    </h3>
                                </div>
                                <div class="right menu">
                                    <div class="ui item" style="margin: 0">
                                        <button :id="amistad.id"
                                                @click="popupEliminar(amistad.id, amistad.id + 'popup')"
                                                class="ui circular paperviu-d7 hover-paperviu-dark text-paperviu-e8 icon button">
                                            <i class="trash icon"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div :id="amistad.id + 'popup'" class="ui popup flowing transition hidden"
                                 style="padding: 0">
                                <div class="ui secondary menu"
                                     style="margin: 0">
                                    <h3 class="ui header text-paperviu-d7"
                                        style="margin-top: 8px; margin-left: 15px; margin-right: 5px">
                                        &iquest;Confirmar?</h3>
                                    <a @click="idAmistadActual = amistad.amistadId; eliminarAmistad(amistad.id);"
                                       class="ui item hover-paperviu-e8" style="margin: 0"><span
                                            class="ui header text-paperviu-sky">Eliminar</span></a>
                                </div>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {pusherjs} from '../pusher_key';
    import Pusher from 'pusher-js';
    import {noty} from '../noty';

    const pusher2 = new Pusher(pusherjs.key, {
        cluster: 'us2',
        encrypted: true
    });
    export default {
        data() {
            return {
                nombre: '',
                apellido: '',
                email: '',
                password1: '',
                password2: '',
                password: '',
                facebook: false,
                idAmistadActual: '',
                usernameReceptor: '',
                amistades: [],
                solicitudes: []
            }
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            actualizarUsuarioURL() {
                return this.$store.state.baseUrl + "usuarios?username=" + this.usuario.username + "&nombre=" + this.nombre + "&apellido=" + this.apellido + "&email=" + this.email + "&password=" + this.password;
            },
            clientes() {
                return this.$store.state.clientes;
            },
            getClientesURL() {
                return this.$store.state.baseUrl + "usuarios/clientes/todos";
            },
            getSolicitudesAmistadesURL() {
                return this.$store.state.baseUrl + "amistades?username=" + this.usuario.username + "&aceptadas=false";
            },
            getAmistadesURL() {
                return this.$store.state.baseUrl + "amistades?username=" + this.usuario.username + "&aceptadas=true";
            },
            aceptarAmistadURL() {
                return this.$store.state.baseUrl + "amistades?id=" + this.idAmistadActual;
            },
            eliminarAmistadURL() {
                return this.$store.state.baseUrl + "amistades/" + this.idAmistadActual;
            },
            enviarSolicitudAmistadURL() {
                return this.$store.state.baseUrl + "amistades?usernameEmisor=" + this.usuario.username + "&usernameReceptor=" + this.usernameReceptor;
            }
        },
        mounted() {
            document.title = "Perfil de usuario";
            this.getSolicitudesAmistades();
            this.getAmistades();
            this.facebook = this.$cookie.get('facebook');
            this.nombre = this.usuario.nombre;
            this.apellido = this.usuario.apellido;
            this.email = this.usuario.email;
            this.$store.commit('setVistaActual', 'Perfil');
            if (this.clientes.length === 0) this.getClientes();
            $('.ui.dropdown').dropdown();
            var _this = this;
            var channelAmistades = pusher2.subscribe("amistades");
            channelAmistades.bind('nueva', function (data) {
                if (data.usernameReceptor === _this.usuario.username) {
                    _this.getSolicitudesAmistades();
                    _this.mostrarSolicitudRecibida(data.nombreEmisor);
                }
            });
            channelAmistades.bind('aceptada', function (data) {
                if (data.usernameEmisor === _this.usuario.username) {
                    _this.getAmistades();
                    _this.mostrarSolicitudAceptada(data.nombreReceptor);
                }
            });
        },
        methods: {
            popupEliminar(id, popup) {
                $('#' + id).popup({
                    popup: $('#' + popup),
                    inline: true,
                    on: 'click'
                }).popup('show');
            },
            enviarSolicitudAmistad() {
                if (this.usuario.username !== '' && this.usernameReceptor !== '') {
                    var _this = this;
                    this.mostrarInfo("Enviando solicitud de amistad...");
                    $.post(this.enviarSolicitudAmistadURL, function (response) {
                        if (response !== undefined) {
                            if (response === 1 || response === "1") _this.mostrarExito("Solicitud de amistad enviada!");
                            else if (response === 2 || response === "2") _this.mostrarAlerta("La solicitud o amistad ya existe");
                            else _this.mostrarError("No se pudo enviar la solicitud");
                        } else _this.mostrarError("No se pudo enviar solicitud de amistad");
                    }).fail(function () {
                        _this.mostrarError("No se pudo enviar solicitud de amistad");
                    });
                } else this.mostrarAlerta("Debes seleccionar un usuario!");
            },
            getSolicitudesAmistades() {
                if (this.usuario.username !== '') {
                    var _this = this;
                    this.$store.commit('setSolicitudes', []);
                    $.get(this.getSolicitudesAmistadesURL, function (response) {
                        if (response !== undefined) {
                            $.each(response, function (index, solicitud) {
                                _this.solicitudes.push({
                                    nombreEmisor: solicitud.nombreEmisor,
                                    solicitudId: solicitud.id,
                                    id: _this.solicitudes.length + 1
                                });
                            });
                        }
                    });
                }
            },
            getAmistades() {
                if (this.usuario.username !== '') {
                    this.$store.commit('setAmistades', []);
                    var _this = this;
                    $.get(this.getAmistadesURL, function (response) {
                        if (response !== undefined) {
                            $.each(response, function (index, amistad) {
                                _this.amistades.push({
                                    nombreEmisor: amistad.nombreEmisor,
                                    usernameEmisor: amistad.usernameEmisor,
                                    usernameReceptor: amistad.usernameReceptor,
                                    nombreReceptor: amistad.nombreReceptor,
                                    amistadId: amistad.id,
                                    id: _this.amistades.length + 1
                                });
                            });
                        }
                    });
                }
            },
            eliminarSolicitud(id) {
                if (this.idAmistadActual !== '') {
                    var _this = this;
                    $.ajax({
                        type: 'DELETE',
                        url: _this.eliminarAmistadURL,
                        success: function (response) {
                            if (response !== undefined) {
                                if (response === true || response === "true") {
                                    _this.mostrarExito("Solicitud de amistad eliminada!");
                                    _this.getSolicitudesAmistades();
                                    $('#' + id).popup('hide');
                                }
                                else _this.mostrarError("No se pudo eliminar la solicitud");
                            } else _this.mostrarError("No se pudo eliminar la solicitud");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo eliminar la solicitud");
                        }
                    });
                }
            },
            aceptarSolicitudAmistad(id) {
                if (this.idAmistadActual !== '') {
                    var _this = this;
                    $.ajax({
                        type: 'PUT',
                        url: _this.aceptarAmistadURL,
                        success: function (response) {
                            if (response !== undefined) {
                                if (response === true || response === "true") {
                                    _this.mostrarExito("Solicitud aceptada!");
                                    _this.getSolicitudesAmistades();
                                    _this.idAmistadActual = '';
                                    _this.getAmistades();
                                } else _this.mostrarError("No se pudo aceptar la solicitud");
                            } else _this.mostrarError("No se pudo aceptar la solicitud");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo aceptar la solicitud");
                        }
                    });
                }
            },
            eliminarAmistad(id) {
                if (this.idAmistadActual !== '') {
                    var _this = this;
                    $.ajax({
                        type: 'DELETE',
                        url: _this.eliminarAmistadURL,
                        success: function (response) {
                            if (response !== undefined) {
                                if (response === true || response === "true") {
                                    _this.mostrarExito("Amistad eliminada!");
                                    $('#' + id).popup('hide');
                                    _this.$store.commit('setAmistades', _this.amistades.filter(function (item) {
                                        return item.amistadId !== _this.idAmistadActual;
                                    }));
                                    _this.idAmistadActual = '';
                                }
                                else _this.mostrarError("No se pudo eliminar la amistad.");
                            } else _this.mostrarError("No se pudo eliminar la amistad.");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo eliminar la amistad.");
                        }
                    });
                }
            },
            actualizarUsuario() {
                if (this.password1 === this.password2) {
                    this.password = this.password1;
                    var _this = this;
                    this.mostrarInfo("Actualizando perfil de usuario...");
                    $.ajax({
                        url: _this.actualizarUsuarioURL,
                        type: 'PUT',
                        success: function (response) {
                            if (response !== undefined) {
                                if (response === true || response === "true") {
                                    _this.$store.commit('setUsuario', {
                                        username: _this.usuario.username,
                                        nombre: _this.nombre,
                                        apellido: _this.apellido,
                                        email: _this.email,
                                        token: _this.usuario.token,
                                        facebook: _this.usuario.facebook
                                    });
                                    _this.$cookie.set('email', _this.email);
                                    _this.$cookie.set('nombre', _this.nombre);
                                    _this.$cookie.set('apellido', _this.apellido);
                                    _this.mostrarExito("Perfil de usuario actualizado!");
                                } else _this.mostrarError("No se pudo actualizar el perfil de usuario");
                            } else _this.mostrarError("No se pudo actualizar el perfil de usuario");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo actualizar el perfil de usuario");
                        }
                    });
                } else this.mostrarErrorPassword();
            },
            getClientes() {
                var _this = this;
                $.get(this.getClientesURL, function (response) {
                    if (response !== undefined) {
                        $.each(response, function (index, cliente) {
                            if (cliente.username !== _this.usuario.username) _this.clientes.push({
                                username: cliente.username,
                                nombreCompleto: cliente.nombreCompleto
                            });
                        })
                    }
                });
            },
            mostrarErrorPassword() {
                var _this = this;
                this.$noty.warning("<h4 class=\"ui inverted header\"><i class=\"warning icon\"></i>Las contrase&ntilde;as deben coincidir.</h4>", noty.warning);
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
            mostrarSolicitudRecibida(nombreCompleto) {
                this.$noty.info("<h3 class=\"ui inverted header\">" + nombreCompleto + "<br><span class=\"text-paperviu-e8\" style=\"font-weight: 500;\">Le ha enviado una solicitud de amistad!</span></h3>", noty.info);
            },
            mostrarSolicitudAceptada(nombreCompleto) {
                this.$noty.info("<h3 class=\"ui inverted header\">" + nombreCompleto + "<br><span class=\"text-paperviu-e8\" style=\"font-weight: 500;\">Acept&oacute; tu solicitud de amistad!</span></h3>", noty.info);
            }
        }
    }
</script>