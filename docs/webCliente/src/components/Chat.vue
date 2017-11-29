<template>
    <div>
        <div class="ui secondary one item menu pointing bottom fixed" style="padding: 0">
            <div class="ui very relaxed items">
                <template v-for="mensaje in mensajes">
                    <div class="ui item paperviu-dark" style="padding: 0; margin-bottom: 7px">
                        <div class="row border-top-paperviu-sky" style="padding: 10px">
                            <div class="ui left aligned content basic segment" style="padding: 0">
                                <h4 class="ui author text-paperviu-e7" style="margin: 0">{{mensaje.username}}</h4>
                                <div class="metadata">
                        <span class="ui sub header text-paperviu-sky large date"
                              style="font-weight: 500; font-size: 14px">{{mensaje.fecha}}</span>
                                </div>
                                <div class="ui header small text-paperviu-e8 text"
                                     style="margin: 5px; font-weight: 500">{{mensaje.texto}}
                                </div>
                            </div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="row border-left-paperviu-sky paperviu-d7">
                <div class="ui item" style="margin: 0">
                    <div class="ui transparent left icon focus big inverted input" style="padding-bottom: 20px">
                        <i @click="agregarMensaje"
                           class="send text-paperviu-e8 hover-text-paperviu-sky active link icon"
                           style="margin-left: 16px; margin-top: -10px"></i>
                        <input v-model="texto" @keyup.enter="agregarMensaje" class="ui header text-paperviu-e8"
                               style="height: 40px; margin-left: 16px; padding: 10px; font-weight: 600" type="text"
                               placeholder="Escriba su mensaje...">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {pusherjs} from '../pusher_key';
    import Pusher from 'pusher-js';

    const pusher = new Pusher(pusherjs.key, {
        cluster: 'us2',
        encrypted: true
    });
    export default {
        props: {
            idContenido: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                mensajes: [],
                texto: ''
            }
        },
        computed: {
            agregarMensajeURL() {
                return this.$store.state.baseUrl + "chats?idContenido=" + this.idContenido + "&username=" + this.usuario.username + "&texto=" + this.texto;
            },
            usuario() {
                return this.$store.state.usuario;
            }
        },
        mounted() {
            this.suscribirse();
        },
        methods: {
            agregarMensaje() {
                if (this.idContenido !== '' && this.usuario.username !== "" && this.texto !== '') {
                    $.post(this.agregarMensajeURL);
                    var _this = this;
                    var fecha = new Date();
                    this.mensajes.push({
                        username: _this.usuario.username,
                        fecha: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + "  " + fecha.getHours() + ":" + fecha.getMinutes(),
                        texto: _this.texto
                    });
                    this.texto = '';
                }
            },
            suscribirse() {
                var _this = this;
                if (this.idContenido !== '') {
                    pusher.allChannels().forEach(channel => pusher.unsubscribe(channel));
                    var channel = pusher.subscribe(this.idContenido + "-Contenido");
                    channel.bind('mensaje-nuevo', function (data) {
                        if (data.username !== undefined && data.username !== _this.usuario.username) {
                            var fecha = new Date(data.fecha);
                            _this.mensajes.push({
                                username: data.username,
                                fecha: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + "  " + data.hora,
                                texto: data.texto
                            });
                        }
                    });
                }
            }
        },
        watch: {
            idContenido(newValue) {
                this.suscribirse();
            }
        }
    }
</script>