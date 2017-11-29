<template>
    <div class="row paperviu-e8" style="margin-bottom: 50px">
        <div v-if="!loading" style="padding-top: 32px">
            <div v-if="!enVivo" class="ui text container">
                <div class="ui relaxed items" style="padding-bottom: 30px">
                    <transition-group name="list" tag="p">
                        <paperviu-video-upload
                                v-for="(video, index) in videos"
                                class="list-item"
                                :key="video.id"
                                :id="video.id"
                                :videoId="video.videoId"
                                :titulo="video.titulo"
                                :numero="video.numero"
                                :contenido="video.contenido"
                                :fecha="video.fecha"
                                :hora="video.hora"
                                :estadoVideo="video.estadoVideo"
                                :videoRuta="video.videoRuta"
                                :loading="video.loading"
                                :tipo="video.tipo"
                                @quitarVideo="quitarVideo(video.id)"
                                @crearVideo="crearVideo()"
                                @actualizarVideo="actualizarVideo(video.id)"
                                @eliminarVideo="eliminarVideo(video.id, video.videoRuta)"
                                @recargarVideo="recargarVideo(video.id)"
                                @actualizarRuta="actualizarRuta(video.id)"
                        ></paperviu-video-upload>
                    </transition-group>
                    <div @click="agregarVideo" class="ui center aligned basic segment paperviu-e8 hover-paperviu-e4"
                         style="padding: 30px; cursor: pointer;">
                        <h4 class="ui icon header text-paperviu-sky" style="margin: 0px"><i class="add icon"></i></h4>
                        <h1 class="ui sub header huge text-paperviu-dark" style="margin: 0px">Agregar Video</h1>
                    </div>
                </div>
            </div>
            <div v-if="enVivo">
                <div class="ui text container" style="padding-bottom: 30px">
                    <div class="ui row" style="padding: 16px">
                        <div class="ui center aligned text container" style="padding: 20px">
                            <h2 class="ui text-paperviu-sky header" style="margin: 3px">
                                Fuente de Streaming multimedia</h2>
                        </div>
                        <div class="ui fluid small labeled input" style="padding: 10px">
                            <div class="ui basic label">URL</div>
                            <input type="text" v-model="url"
                                   placeholder="Ingrese el url donde se realizara el streaming">
                        </div>
                        <div class="ui fluid small labeled input" style="padding: 10px">
                            <div class="ui basic label">Origen</div>
                            <select v-model="tipoVideo" class="ui dropdown">
                                <option v-if="tipoVideo === 'video/youtube'" selected value="video/youtube">Youtube
                                </option>
                                <option v-if="tipoVideo !== 'video/youtube'" value="video/youtube">Youtube</option>
                                <option v-if="tipoVideo === 'video/facebook'" selected value="video/facebook">Facebook
                                </option>
                                <option v-if="tipoVideo !== 'video/facebook'" value="video/facebook">Facebook</option>
                                <option v-if="tipoVideo === 'video/twitch'" selected value="video/twitch">Twitch
                                </option>
                                <option v-if="tipoVideo !== 'video/twitch'" value="video/twitch">Twitch</option>
                                <option v-if="tipoVideo === 'video/vimeo'" selected value="video/vimeo">Vimeo</option>
                                <option v-if="tipoVideo !== 'video/vimeo'" value="video/vimeo">Vimeo</option>
                                <option v-if="tipoVideo === 'video/dailymotion'" selected value="video/dailymotion">
                                    DailyMotion
                                </option>
                                <option v-if="tipoVideo !== 'video/dailymotion'" value="video/dailymotion">DailyMotion
                                </option>
                                <option v-if="tipoVideo === undefined || tipoVideo === ''" value="" selected disabled>
                                    Seleccionar formato
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="ui bottom fixed pointing secondary menu" style="border: 0px">
                    <div class="ui basic center aligned segment paperviu-dark"
                         style="width: 100%">
                        <button @click="$emit('recargarInfo')" class="ui button inverted basic"><i
                                class="refresh icon"></i>Recargar
                        </button>
                        <button @click="agregarURL" v-if="!loading"
                                class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8"><i
                                class="save icon"></i>Guardar Cambios
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="loading" class="ui center aligned basic segment" style="padding: 30px">
            <div class="ui active loader huge" style="opacity: 0.7"></div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';

    export default {
        props: ['contenido', 'loading', 'enVivo', 'tipo'],
        data() {
            return {
                videosCont: 1000,
                idVideoActual: '',
                url: '',
                tipoVideo: ''
            }
        },
        computed: {
            contenidos() {
                return this.$store.state.contenidosModList;
            },
            contenidoActual() {
                return this.contenidos.find(c => c.id === this.contenido);
            },
            videoActual() {
                return this.contenidoActual.videos.find(c => c.id === this.idVideoActual);
            },
            videos() {
                return this.contenidoActual.videos;
            },
            videoNuevo() {
                return this.$store.state.videoNuevo;
            },
            agregarVideoURL() {
                return this.$store.state.baseUrl + "videos?numero=" + this.videoNuevo.numero + "&titulo=" + this.videoNuevo.titulo + "&tipo=" + this.videoNuevo.tipo + "&idContenido=" + this.contenido + "&estado=" + this.videoNuevo.estado;
            },
            actualizarVideoURL() {
                return this.$store.state.baseUrl + "videos?numero=" + this.videoActual.numero + "&titulo=" + this.videoActual.titulo + "&id=" + this.videoActual.videoId + "&estado=" + this.videoActual.estadoVideo;
            },
            videoURL() {
                return this.$store.state.baseUrl + "videos/" + this.videoActual.videoId;
            },
            actualizarRutaURL() {
                return this.$store.state.baseUrl + "videos/video?id=" + this.videoActual.videoId + "&video=" + this.videoActual.videoRuta;
            },
            actualizarURLStreaming() {
                return this.$store.state.baseUrl + "contenidos/streaming";
            }
        },
        mounted() {
            this.url = this.contenidoActual.info.url;
            if (this.tipo !== undefined && this.tipo !== null && this.tipo !== "null") this.tipoVideo = this.tipo;
            this.cargarVideos();
            $('.ui.dropdown').dropdown();
        },
        methods: {
            agregarURL() {
                var _this = this;
                $.ajax({
                    type: 'PUT',
                    url: _this.actualizarURLStreaming,
                    data: {
                        "id": _this.contenido,
                        "url": _this.url,
                        "tipo": _this.tipoVideo
                    },
                    success: function (response) {
                        if (response !== undefined && response !== null && response !== "null") {
                            if (response === true) _this.mostrarURLActualizada();
                        } else _this.mostrarErrorActualizarURL();
                    },
                    error: function () {
                        _this.mostrarErrorActualizarURL();
                    }
                });
            },
            crearVideo() {
                this.idVideoActual = this.videoNuevo.id;
                var _this = this;
                this.mostrarCreandoVideo();
                this.videoActual.loading = true;
                $.post(this.agregarVideoURL, function (response) {
                    if (response !== undefined && response !== null && response !== "null") {
                        var fecha = new Date(response.fecha);
                        _this.videoActual.videoId = response.id;
                        _this.videoActual.fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
                        _this.videoActual.hora = response.hora;
                        _this.videoActual.loading = false;
                        _this.mostrarVideoCreado();
                    } else {
                        _this.mostrarErrorCrearVideo();
                        _this.videoActual.loading = false;
                    }
                }).fail(function () {
                    _this.mostrarErrorCrearVideo();
                    _this.videoActual.loading = false;
                });
            },
            actualizarVideo(id) {
                this.idVideoActual = id;
                if (this.videoActual !== undefined) {
                    var _this = this;
                    this.mostrarActualizandoVideo();
                    this.videoActual.loading = true;
                    $.ajax({
                        type: 'PUT',
                        url: _this.actualizarVideoURL,
                        success: function (response) {
                            if (response !== undefined && response !== null && response !== "null") {
                                var fecha = new Date(response.fecha);
                                _this.videoActual.fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
                                _this.videoActual.hora = response.hora;
                                _this.videoActual.loading = false;
                                _this.mostrarVideoActualizado();
                            } else {
                                _this.videoActual.loading = false;
                                _this.mostrarErrorActualizarVideo();
                            }
                        },
                        error: function () {
                            _this.videoActual.loading = false;
                            _this.mostrarErrorActualizarVideo();
                        }
                    });
                }
            },
            actualizarRuta(id) {
                this.idVideoActual = id;
                if (this.videoActual !== undefined && this.videoActual.videoId !== undefined && this.videoActual.videoId !== "") {
                    this.videoActual.loading = true;
                    var _this = this;
                    this.mostrarActualizandoVideo();
                    $.ajax({
                        type: 'PUT',
                        url: _this.actualizarRutaURL,
                        success: function (response) {
                            if (response !== undefined && response !== null && response !== "null") {
                                var fecha = new Date(response.fecha);
                                _this.videoActual.fecha = fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate();
                                _this.videoActual.hora = response.hora;
                                _this.videoActual.loading = false;
                                _this.mostrarVideoActualizado();
                            } else {
                                _this.videoActual.loading = false;
                                _this.mostrarErrorActualizarVideo();
                            }
                        },
                        error: function () {
                            _this.mostrarErrorActualizarVideo();
                            _this.videoActual.loading = false;
                        }
                    });
                }
            },
            eliminarVideo(id, videoRuta) {
                this.idVideoActual = id;
                if (this.videoActual !== undefined) {
                    var _this = this;
                    this.videoActual.loading = true;
                    this.mostrarEliminandoVideo();
                    $.ajax({
                        type: 'DELETE',
                        url: _this.videoURL,
                        success: function (response) {
                            if (response !== undefined) {
                                if (response === true || response === "true") {
                                    if (videoRuta !== undefined && videoRuta !== null && videoRuta !== "null" && videoRuta !== "") {
                                        _this.eliminarVideoDropbox(id, videoRuta);
                                    } else {
                                        _this.videoActual.loading = false;
                                        _this.mostrarVideoEliminado();
                                        _this.quitarVideo(id);
                                    }
                                } else {
                                    _this.videoActual.loading = false;
                                    _this.mostrarErrorEliminarVideo();
                                }
                            } else {
                                _this.videoActual.loading = false;
                                _this.mostrarErrorEliminarVideo();
                            }
                        },
                        error: function () {
                            _this.videoActual.loading = false;
                            _this.mostrarErrorEliminarVideo();
                        }
                    });
                }
            },
            eliminarVideoDropbox(id, nombreVideo) {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesDeleteV2({
                    path: "/Aplicaciones/contenidos/" + _this.contenido + "/" + nombreVideo
                }).then(function (response) {
                    _this.mostrarVideoEliminado();
                    _this.quitarVideo(id);
                }).catch(function () {
                    _this.mostrarVideoEliminado();
                    _this.quitarVideo(id);
                });
            },
            recargarVideo(id) {
                this.idVideoActual = id;
                if (this.videoActual !== undefined) {
                    if (this.videoActual.videoId !== undefined && this.videoActual.videoId !== "") {
                        this.videoActual.loading = true;
                        var _this = this;
                        $.get(this.videoURL, function (response) {
                            if (response !== undefined) {
                                _this.videoActual.titulo = response.titulo;
                                _this.videoActual.numero = response.numero;
                                _this.videoActual.videoRuta = response.video;
                                _this.videoActual.estadoVideo = response.estado;
                                _this.videoActual.fecha = response.fecha;
                                _this.videoActual.hora = response.hora;
                                _this.videoActual.loading = false;
                                _this.mostrarInfoRecargada();
                            } else {
                                _this.videoActual.loading = false;
                            }
                        }).fail(function () {
                            _this.videoActual.loading = false;
                        });
                    }
                }
            },
            cargarVideos() {
                if (this.contenidoActual !== undefined) {
                    if (this.contenidoActual.videos !== undefined) {
                        if (this.contenidoActual.videos.length === 0) {
                            this.vaciarLista();
                        } else {
                            this.videos = this.contenidoActual.videos;
                        }
                    } else {
                        this.vaciarLista();
                    }
                } else {
                    this.vaciarLista();
                }
            },
            agregarVideo() {
                var _this = this;
                this.videosCont += 1;
                this.contenidoActual.videos.push({
                    id: _this.videosCont,
                    videoId: '',
                    numero: 1,
                    titulo: '',
                    contenido: _this.contenido,
                    fecha: '',
                    hora: '',
                    estadoVideo: false,
                    video: '',
                    loading: false
                });
            },
            quitarVideo(id) {
                this.contenidoActual.videos = this.contenidoActual.videos.filter(function (item) {
                    return item.id !== id;
                });
                //this.$store.commit('quitarVideoContenidosModList', id);
            },
            vaciarLista() {
                this.videos.splice(0, this.videos.length);
            },
            mostrarVideoCreado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Video Creado!</h3>", noty.successVideo);
            },
            mostrarCreandoVideo() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Creando Video...</h3>", noty.infoVideo);
            },
            mostrarErrorCrearVideo() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido Crear el Video.</h3>", noty.errorVideo);
            },
            mostrarVideoActualizado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Video Actualizado!</h3>", noty.successVideo);
            },
            mostrarActualizandoVideo() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Actualizando Video...</h3>", noty.infoVideo);
            },
            mostrarErrorActualizarVideo() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido Actualizar el Video.</h3>", noty.errorVideo);
            },
            mostrarVideoEliminado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Video Eliminado!</h3>", noty.successVideo);
            },
            mostrarEliminandoVideo() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Eliminando Video...</h3>", noty.infoVideo);
            },
            mostrarErrorEliminarVideo() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido Eliminar el Video.</h3>", noty.errorVideo);
            },
            mostrarInfoRecargada() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Informaci&oacute;n reestablecida.</h3>", noty.success);
            },
            mostrarURLActualizada() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>URL de streaming Actualizada!</h3>", noty.success);
            },
            mostrarErrorActualizarURL() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido Actualizar la URL del streaming.</h3>", noty.error);
            }
        },
        watch: {
            loading(newValue, oldValue) {
                if (newValue === false) {
                    this.cargarVideos();
                    $('.ui.dropdown').dropdown();
                }
            }
        }
    }
</script>
<style>
    .list-item {
        display: block;
        margin-right: 10px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.3s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }
</style>