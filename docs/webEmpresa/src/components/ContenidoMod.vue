<template>
    <div>
        <div class="row border-bottom-paperviu-sky paperviu-dark" id="menu2"
             style="border-bottom-width: 4px;margin: 0">
            <div class="ui center aligned text container" style="padding: 20px">
                <div class="ui header inverted">
                    <button @click="$emit('volver')" class="ui circular icon inverted basic button"><i
                            class="left text-paperviu-sky chevron icon"></i></button>
                    Modificar Contenido
                </div>
            </div>
            <div class="ui center aligned text container">
                <div class="ui four item stackable secondary pointing massive menu"
                     style="border: 0;">
                    <a class="ui item" @click="setVista('Config')"
                       :class="{'active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8': config, 'hover-text-paperviu-sky text-paperviu-e4': !config}">
                        <i :class="{'text-paperviu-sky': config}" class="setting icon"></i>Config.
                    </a>
                    <a class="ui item" @click="setVista('General')"
                       :class="{'active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8': general, 'hover-text-paperviu-sky text-paperviu-e4': !general}">
                        <i :class="{'text-paperviu-sky': general}" class="info icon"></i>General
                    </a>
                    <a class="ui item" @click="setVista('Portada')"
                       :class="{'active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8': portada, 'hover-text-paperviu-sky text-paperviu-e4': !portada}">
                        <i :class="{'text-paperviu-sky': portada}" class="image icon"></i>Portada
                    </a>
                    <a class="ui item" @click="setVista('Atributos')"
                       :class="{'active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8': atributos, 'hover-text-paperviu-sky text-paperviu-e4': !atributos}">
                        <i :class="{'text-paperviu-sky': atributos}" class="tags icon"></i>Atributos
                    </a>
                    <a class="ui item" @click="setVista('Videos')"
                       :class="{'active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8': videos, 'hover-text-paperviu-sky text-paperviu-e4': !videos}">
                        <i :class="{'text-paperviu-sky': videos}" class="film icon"></i>Videos
                    </a>
                </div>
            </div>
        </div>
        <paperviu-contenido-config
                v-if="config"
                :contenido="contenido"
                :loading="loadingInfo"
                @recargarInfo="getContenido"
        ></paperviu-contenido-config>
        <paperviu-contenido-general
                v-if="general"
                :contenido="contenido"
                :loading="loadingInfo && loadingDAC"
                @recargarInfo="recargarGeneral"
        ></paperviu-contenido-general>
        <paperviu-contenido-portada
                v-if="portada"
                :contenido="contenido"
                :loading="loadingInfo"
                @recargarInfo="getContenido"
        ></paperviu-contenido-portada>
        <paperviu-contenido-atributo
                v-if="atributos"
                :contenido="contenido"
                :loading="loadingAtr"
                :tipo="tipo"
                @recargarAtributos="getAtributos"
        ></paperviu-contenido-atributo>
        <paperviu-contenido-video
                v-if="videos"
                :contenido="contenido"
                :loading="loadingVideos"
                :tipo="contenidoActual.info.tipoVideo"
                :enVivo="contenidoActual.info.tipo.enVivo"
        ></paperviu-contenido-video>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';

    export default {
        props: ['contenido', 'tipo'],
        data() {
            return {
                vistaActual: 'Config',
                loadingInfo: true,
                loadingAtributos: true,
                loadingVideos: true,
                loadingAtr: true,
                loadingDAC: true,
                info: false
            }
        },
        computed: {
            config() {
                return this.vistaActual === 'Config';
            },
            general() {
                return this.vistaActual === 'General';
            },
            portada() {
                return this.vistaActual === 'Portada';
            },
            atributos() {
                return this.vistaActual === 'Atributos';
            },
            videos() {
                return this.vistaActual === 'Videos';
            },
            getContenidoURL() {
                return this.$store.state.baseUrl + "contenidos/" + this.contenido;
            },
            getDACURL() {
                return this.$store.state.baseUrl + "contenidos/dac?idContenido=" + this.contenido;
            },
            getAtributosURL() {
                return this.$store.state.baseUrl + "contenidos/atributos?idContenido=" + this.contenido;
            },
            getVideosURL() {
                return this.$store.state.baseUrl + "contenidos/videos?idContenido=" + this.contenido;
            },
            contenidos() {
                return this.$store.state.contenidosModList;
            },
            contenidoActual() {
                return this.contenidos.find(c => c.id == this.contenido);
            }
        },
        methods: {
            setVista(vista) {
                this.vistaActual = vista;
            },
            getContenido() {
                var _this = this;
                this.loadingInfo = true;
                $.get(this.getContenidoURL, function (response) {
                    if (response !== undefined) {
                        _this.contenidoActual.info = response.contenido;
                        _this.loadingInfo = false;
                        _this.info = true;

                    }
                });
            },
            recargarGeneral() {
                this.getContenido();
                this.getDAC();
            },
            getDAC() {
                var _this = this;
                this.loadingDAC = true;
                $.get(this.getDACURL, function (response) {
                    if (response !== undefined) {
                        if (response.actores !== undefined) {
                            var actores = [];
                            $.each(response.actores, function (index, actor) {
                                actores.push(actor.actorPK.actor);
                            });
                            _this.contenidoActual.actores = actores;
                        }
                        if (response.directores !== undefined) {
                            var directores = [];
                            $.each(response.directores, function (index, director) {
                                directores.push(director.directorPK.director);
                            });
                            _this.contenidoActual.directores = directores;
                        }
                        if (response.categorias !== undefined) {
                            var categorias = [];
                            $.each(response.categorias, function (index, categoria) {
                                categorias.push(categoria.nombre);
                            });
                            _this.contenidoActual.categorias = categorias;
                        }
                        _this.loadingDAC = false;
                    }
                });
            },
            getAtributos() {
                var _this = this;
                this.loadingAtr = true;
                $.get(this.getAtributosURL, function (resp) {
                    if (resp !== undefined) {
                        var atributos = [];
                        _this.loadingAtr = false;
                        $.each(resp, function (index, atributo) {
                            atributos.push({
                                id: index,
                                clave: atributo.clave,
                                valor: atributo.valor
                            });
                        });
                        _this.contenidoActual.atributos = atributos;
                    }
                });
            },
            getVideos() {
                var _this = this;
                $.get(this.getVideosURL, function (response) {
                    if (response !== undefined) {
                        var videos = [];
                        $.each(response, function (index, video) {
                            videos.push({
                                id: index,
                                videoId: video.id,
                                titulo: video.titulo,
                                numero: video.numero,
                                contenido: _this.contenido,
                                fecha: video.fecha,
                                hora: video.hora,
                                tipo: video.tipo,
                                estadoVideo: video.estado,
                                videoRuta: video.video,
                                loading: false
                            });
                        });
                        _this.contenidoActual.videos = videos;
                        _this.loadingVideos = false;
                    }
                });
            }
        },
        mounted() {
            if (this.contenidoActual === undefined) this.$store.commit('addContenidoModList', this.contenido);
            if (this.contenidoActual.info === undefined) this.getContenido();
            else {
                this.loadingInfo = false;
                this.info = true;
            }
            if (this.contenidoActual.actores === undefined || this.contenidoActual.directores === undefined || this.contenidoActual.categorias === undefined) this.getDAC();
            else this.loadingDAC = false;
            if (this.contenidoActual.atributos === undefined) this.getAtributos();
            else this.loadingAtr = false;
            if (this.contenidoActual.videos === undefined) this.getVideos();
            else this.loadingVideos = false;
        }
    }
</script>