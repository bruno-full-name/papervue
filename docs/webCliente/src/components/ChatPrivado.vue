<template>
    <div>
        <div>
            <div class="border-bottom-paperviu-sky">
                <div id="listado" v-show="usernameReceptor === ''" class="ui vertical one item menu"
                     style="width: 100%">
                    <div class="ui item" style="margin: 0; padding: 0">
                        <h3 class="ui sub header huge text-paperviu-sky">Seleccionar chat</h3>
                    </div>
                    <template v-for="amistad in amistades">
                        <div @click="mostrarChat(amistad.username, amistad.nombre)"
                             class="ui item text-paperviu-e8 hover-text-paperviu-sky" style="cursor:pointer;">
                            <h3 class="ui header small" style="color: inherit; font-size: 20px; font-weight: 500;">
                                {{amistad.nombre}}</h3>
                        </div>
                    </template>
                </div>
                <div id="chatPrivado" class="row" style="display:none;">
                    <div class="ui secondary menu" style="margin: 0">
                        <a @click="mostrarListado();" class="ui item">
                            <i class="left arrow large icon"></i>
                            <span class="ui header small inverted" style="margin: 0">{{nombreReceptor}}</span>
                        </a>
                    </div>
                    <div v-bar>
                        <div v-chat-scroll style="max-height: 350px; padding-bottom: 60px"> <!-- el2 -->
                            <infinite-loading ref="infiniteLoaderMensajes"
                                              direction="top"
                                              @infinite="infiniteHandler">
                                <div slot="no-more">
                                    <div class="ui basic center aligned segment" style="padding: 0">
                                        <h4 class="ui icon header small text-paperviu-e8" style="opacity: 0.6; margin: 0"><i
                                                class="comments icon text-paperviu-sky"></i>No hay m&aacute;s mensajes
                                        </h4>
                                    </div>
                                </div>
                                <div slot="no-results">
                                    <div class="ui basic center aligned segment" style="padding: 0; margin: 0">
                                        <h4 class="ui icon header small text-paperviu-e8" style="opacity: 0.6"><i
                                                class="comments icon text-paperviu-sky"></i>No hay mensajes.
                                        </h4>
                                    </div>
                                </div>
                            </infinite-loading>
                            <div class="ui relaxed items" style="padding-bottom: 60px">
                                <template v-for="mensaje in mensajes">
                                    <div v-if="mensaje.usuarioEmisor !== usuario.username"
                                         class="ui left aligned basic segment"
                                         style="margin-bottom: 7px; margin-top: 0; padding: 0">
                                        <div class="ui left pointing label paperviu-dark border-right-paperviu-sky"
                                             style="padding: 0;width: 80%; margin: 0">
                                            <div class="row border-left-paperviu-sky" style="padding-left: 10px">
                                                <h4 class="ui author text-paperviu-sky"
                                                    style="margin: 0; font-size: 16px">
                                                    {{mensaje.nombreEmisor}}
                                                    <span class="ui header large date"
                                                          style="font-weight: 500; font-size: 14px; margin-left: 7px">{{mensaje.fecha}}</span>
                                                </h4>
                                                <div class="metadata">
                                                    <div class="ui header text-paperviu-e8 text"
                                                         style="margin: 0; padding-bottom: 5px; font-weight: 500">
                                                        {{mensaje.comentario}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-if="mensaje.usuarioEmisor === usuario.username"
                                         class="ui right aligned basic segment"
                                         style="margin-bottom: 7px; margin-top: 0; padding: 0">
                                        <div class="ui right pointing label paperviu-d7 border-right-paperviu-sky"
                                             style="padding: 0;width: 80%; margin: 0">
                                            <div class="row border-right-paperviu-sky" style="padding-right: 10px">
                                                <h4 class="ui author text-paperviu-e4"
                                                    style="margin: 0; font-size: 16px">
                                <span class="ui sub huge header large date"
                                      style="font-weight: 500; font-size: 14px; margin-right: 7px">{{mensaje.fecha}}</span>
                                                    {{mensaje.nombreEmisor}}
                                                </h4>
                                                <div class="metadata">
                                                    <div class="ui header text-paperviu-e8 text"
                                                         style="margin: 0; padding-bottom: 5px; font-weight: 500">
                                                        {{mensaje.comentario}}
                                                    </div>
                                                </div>
                                                <div style="padding-bottom: 5px"
                                                     v-if="mensaje.titulo !== '' && mensaje.idContenido !== undefined && mensaje.idContenido !== ''"
                                                     class="metadata">
                                                    <div @click="$router.push('reproducir?cont=' + mensaje.idContenido)"
                                                         class="ui header text-paperviu-e4 hover-text-paperviu-sky"
                                                         style="font-weight: 600; cursor: pointer;">{{mensaje.titulo}}<i
                                                            class="external icon"
                                                            style="font-size: 14px; margin-top: -5px; margin-right: 0; margin-left: 7px"></i>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="nombreReceptor !== ''"
                     class="ui bottom fixed secondary menu pointing paperviu-d7 border-bottom-paperviu-sky"
                     style="margin: 0">
                    <div class="ui item" style="margin: 0">
                        <div class="ui transparent left icon large focus inverted input">
                            <i @click="agregarMensaje"
                               class="send text-paperviu-e8 hover-text-paperviu-sky active link icon"
                               style="margin-left: 14px"></i>
                            <input v-model="comentario" @keyup.enter="agregarMensaje" class="ui header text-paperviu-e8"
                                   style="height: 40px; margin-left: 16px; padding: 10px; font-weight: 600" type="text"
                                   placeholder="Escriba su mensaje...">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';
    import {pusherjs} from '../pusher_key';
    import Pusher from 'pusher-js';
    import {noty} from '../noty';

    const pusher = new Pusher(pusherjs.key, {
        cluster: 'us2',
        encrypted: true
    });
    export default {
        data() {
            return {
                usernameReceptor: '',
                nombreReceptor: '',
                mensajes: [],
                comentario: '',
                pagina: 1
            }
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            amistades() {
                return this.$store.state.amistades;
            },
            getAmistadesURL() {
                return this.$store.state.baseUrl + "amistades?username=" + this.usuario.username + "&aceptadas=true";
            },
            agregarMensajeURL() {
                return this.$store.state.baseUrl + "compartidos/chat?usuarioEmisor=" + this.usuario.username + "&nombreEmisor=" + this.usuario.nombre + "&usuarioReceptor=" + this.usernameReceptor + "&nombreReceptor=" + this.nombreReceptor + "&comentario=" + this.comentario;
            },
            getMensajesURL() {
                return this.$store.state.baseUrl + "compartidos?emisor=" + this.usuario.username + "&receptor=" + this.usernameReceptor + "&pagina=" + this.pagina;
            }
        },
        mounted() {
            this.$emit('popup');
            this.getAmistades();
            var _this = this;
            var channelCompartidos = pusher.subscribe("compartidos");
            channelCompartidos.bind('nuevo', function (data) {
                if (data.usuarioEmisor === _this.usernameReceptor) {
                    var fecha = new Date(data.fecha);
                    var f = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "  " + fecha.getHours() + ":" + fecha.getMinutes();
                    _this.mensajes.push({
                        usuarioEmisor: data.usuarioEmisor,
                        nombreEmisor: data.nombreEmisor,
                        nombreReceptor: data.nombreReceptor,
                        usernameReceptor: data.usuarioReceptor,
                        comentario: data.comentario,
                        titulo: data.titulo || '',
                        idContenido: data.idContenido || '',
                        fecha: f
                    });
                } else if (data.usuarioEmisor === _this.usuario.username && _this.usernameReceptor !== '') {
                    if (data.idContenido !== undefined && data.titulo !== undefined && data.titulo !== '' && data.idContenido > 0) {
                        var fecha = new Date(data.fecha);
                        var f = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "  " + fecha.getHours() + ":" + fecha.getMinutes();
                        _this.mensajes.push({
                            usuarioEmisor: data.usuarioEmisor,
                            nombreEmisor: data.nombreEmisor,
                            usernameReceptor: data.usuarioReceptor,
                            comentario: data.comentario,
                            titulo: data.titulo || '',
                            idContenido: data.idContenido || '',
                            fecha: f
                        });
                    }
                }
            });
        },
        methods: {
            getAmistades() {
                if (this.usuario.username !== '' && this.amistades.length === 0) {
                    var _this = this;
                    $.get(this.getAmistadesURL, function (response) {
                        if (response !== undefined) {
                            var amistades = [];
                            $.each(response, function (index, amistad) {
                                if (amistad.usernameEmisor !== _this.usuario.username) amistades.push({
                                    username: amistad.usernameEmisor,
                                    nombre: amistad.nombreEmisor,
                                });
                                else amistades.push({
                                    username: amistad.usernameReceptor,
                                    nombre: amistad.nombreReceptor,
                                });
                            });
                            _this.$store.commit('setAmistades', amistades);
                        }
                    });
                }
            },
            infiniteHandler($state) {
                if (this.usuario.username !== '' && this.usernameReceptor !== '') {
                    var _this = this;
                    setTimeout(() => {
                        $.get(_this.getMensajesURL, function (response) {
                            if (response !== undefined) {
                                if (response.length >= 1) {
                                    var mensajes = [];
                                    $.each(response, function (index, mensaje) {
                                        var fecha = new Date(mensaje.fecha);
                                        var f = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "  " + fecha.getHours() + ":" + fecha.getMinutes();
                                        _this.mensajes.unshift({
                                            usuarioEmisor: mensaje.usuarioEmisor,
                                            usuarioReceptor: mensaje.usuarioReceptor,
                                            nombreEmisor: mensaje.nombreEmisor,
                                            nombreReceptor: mensaje.nombreReceptor,
                                            comentario: mensaje.comentario,
                                            fecha: f,
                                            idContenido: mensaje.idContenido || '',
                                            titulo: mensaje.titulo || ''
                                        });
                                    });
                                    //_this.mensajes = _this.mensajes.concat(mensajes);
                                    $state.loaded();
                                    _this.pagina += 1;
                                } else {
                                    $state.complete();
                                }
                            }
                        });
                    }, 800);
                }
            },
            agregarMensaje() {
                if (this.usernameReceptor !== '' && this.usuario.username !== '' && this.comentario !== '') {
                    $.post(this.agregarMensajeURL);
                    var fecha = new Date();
                    var f = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "  " + fecha.getHours() + ":" + fecha.getMinutes();
                    this.mensajes.push({
                        usuarioEmisor: this.usuario.username,
                        nombreEmisor: this.usuario.nombre,
                        nombreReceptor: this.nombreReceptor,
                        usernameReceptor: this.usernameReceptor,
                        comentario: this.comentario,
                        fecha: f
                    });
                    this.comentario = '';
                }
            },
            mostrarChat(username, nombre) {
                var _this = this;
                $('#listado').transition({
                    animation: 'fade right out',
                    onComplete: function () {
                        _this.usernameReceptor = username;
                        _this.nombreReceptor = nombre;
                        $('#chatPrivado').transition('fade left in');
                    }
                });
            },
            mostrarListado() {
                var _this = this;
                $('#chatPrivado').transition({
                    animation: 'fade left out',
                    onComplete: function () {
                        _this.nombreReceptor = '';
                        _this.usernameReceptor = '';
                        $('#listado').transition('fade left in');
                    }
                });
            },
            listarMensajes() {
                this.pagina = 1;
                this.mensajes = [];
                this.$refs.infiniteLoaderMensajes.$emit('$InfiniteLoading:reset');
            },
            mostrarContenidoCompartido(nombre, titulo) {
                this.$noty.info("<h3 class=\"ui inverted header\">" + nombre + "<br><span class=\"text-paperviu-e8\" style=\"font-weight: 500;\">Le ha compatido: " + titulo + "</span></h3>", noty.info);
            }
        },
        watch: {
            usuario() {
                this.getAmistades();
            },
            usernameReceptor(newValue, oldValue) {
                if (newValue !== '' && newValue !== oldValue) this.listarMensajes();
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>