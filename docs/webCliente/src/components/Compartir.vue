<template>
    <div>
        <select v-model="usernameReceptor" class="ui fluid selection dropdown">
            <option v-for="amistad in amistades" :value="amistad.username">{{amistad.nombre}}</option>
            <option value="" selected disabled>Seleccionar destinatario...</option>
        </select>
        <div class="ui reply form" style="margin-top: 7px">
            <div class="field">
                <textarea style="min-height: 80px; max-width: 100%; min-width: 100%; max-height: 80px"
                          maxlength="1024" placeholder="Escribe un comentario..."
                          v-model="comentario"></textarea>
            </div>
        </div>
        <div class="ui secondary one item pointing menu" style="border: 0">
            <a @click="compartirContenido"
               class="ui item text-paperviu-d7 hover-paperviu-e4 hover-text-paperviu-sky"><i
                    class="share icon"></i><span class="ui header"
                                                 style="margin: 0; color: inherit">Compartir</span></a>
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';

    export default {
        props: {
            idContenido: {
                type: Number,
                defualt: ''
            },
            titulo: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                usernameReceptor: '',
                comentario: '',
            }
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            getAmistadesURL() {
                return this.$store.state.baseUrl + "amistades?username=" + this.usuario.username + "&aceptadas=true";
            },
            amistades() {
                return this.$store.state.amistades;
            },
            compartirContenidoURL() {
                return this.$store.state.baseUrl + "compartidos?usuarioEmisor=" + this.usuario.username + "&usuarioReceptor=" + this.usernameReceptor + "&idContenido=" + this.idContenido + "&comentario=" + this.comentario + "&nombreEmisor=" + this.usuario.nombre + "&titulo=" + this.titulo;
            }
        },
        mounted() {
            $('.ui.dropdown').dropdown();
            this.getAmistades();
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
            compartirContenido() {
                if (this.idContenido !== undefined && this.usuario.username !== '' && this.usernameReceptor !== '') {
                    var _this = this;
                    _this.mostrarCompartiendoContenido();
                    $.post(this.compartirContenidoURL, function () {
                        _this.mostrarContenidoCompartido();
                        _this.usernameReceptor = "";
                        _this.comentario = '';
                    }).fail(function () {
                        _this.mostrarErrorCompartirContenido();
                    });
                }
            },
            mostrarContenidoCompartido() {
                this.$noty.success("<h4 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Contenido compartido!</h4>", noty.success);
            },
            mostrarErrorCompartirContenido() {
                this.$noty.error("<h4 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo compartir el contenido</h4>", noty.error);
            },
            mostrarCompartiendoContenido() {
                this.$noty.info("<h4 class=\"ui inverted header\"><i class=\"info icon\"></i>Compatiendo el contenido...</h4>", noty.info);
            }
        }
    }
</script>