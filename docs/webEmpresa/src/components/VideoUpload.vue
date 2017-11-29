<template>
    <div style="padding-top: 30px; padding-bottom: 30px">
        <div :class="[id]" class="ui row border-left-paperviu-sky paperviu-e4">
            <div class="ui left ribbon paperviu-dark label small fluid"
                 style="margin-left: 10px">
                <div class="ui secondary borderless menu tiny inverted"
                     style="border: 0; margin-top: -9px; margin-bottom: -9px">
                    <a v-if="!loading" @click="guardar" class="ui active item" style="padding: 10px"><i
                            class="save large icon"></i>
                        <h2 class="ui header inverted small" style="margin: 0">Guardar</h2></a>
                    <a @click="subirVideo" v-if="toUpload && !loading" class="ui active item"
                       style="padding: 10px; margin-left: -4px"><i
                            class="upload large icon"></i>
                        <h2 class="ui header inverted small" style="margin: 0">Subir Video</h2></a>
                    <a @click="$emit('recargarVideo')" v-if="creado && !loading" class="ui active item"
                       style="padding: 10px; margin-left: -4px"><i
                            class="refresh large icon"></i>
                        <h2 class="ui header inverted small" style="margin: 0">Recargar</h2></a>
                    <a :id="id + 'Btn'" v-show="creado && !loading" class="ui active item"
                       style="padding: 10px; margin-left: -4px"><i
                            class="trash large icon"></i>
                        <h2 class="ui header inverted small" style="margin: 0">Eliminar</h2></a>
                    <div class="right menu">
                        <a v-if="!creado" @click="$emit('quitarVideo')" class="icon item" style="margin-right: -8px"><i
                                class="remove icon large"></i></a>
                        <h3 v-if="history" class="ui header small text-paperviu-e7 inverted"
                            style="margin-top: 10px; margin-right: -10px;">
                            {{fecha + ' ' + hora}}<i class="history inverted icon"
                                                     style="margin-left: 10px"></i>
                        </h3>
                        <div v-if="loading" class="ui active loader inline small inverted"
                             style="margin-top: 6px"></div>
                    </div>
                </div>
            </div>
            <div class="ui segments flowing inline popup transition hidden"
                 :id="id"
                 style="padding: 0; background-color: #f8fafb">
                <button @click="$emit('eliminarVideo')" class="ui large icon basic button" style="margin: 0">
                    <h3 class="ui sub header text-paperviu-dark" style="margin:0">
                        <i class="trash large red icon" style="margin-top: -5px"></i>Click para Confirmar
                    </h3>
                </button>
            </div>
            <div class="ui stacakble grid container" style="padding-top: 15px">
                <div class="row" style="padding-top:15px;">
                    <div class=" four wide column">
                        <VueImgInputer
                                v-model="video" accept="video/*" size="small"
                                bottomText="Click para seleccionar otro video..."
                                placeholder="Seleccione un video..." style="background-color: #e5ebf3"
                                maxSize="512000"
                        ></VueImgInputer>
                    </div>
                    <div class="twelve wide column">
                        <div class="row">
                            <div class="ui toggle checkbox" style="margin-left: 16px">
                                <input v-model="estadoVideo" type="checkbox">
                                <label class="ui header small grey"
                                       style="margin: 0px">{{ estadoVideo ? 'Habilitado' : 'Deshabilitado' }}</label>
                            </div>
                        </div>
                        <div class="row">
                            <div class="ui labeled small input" style="margin-left: 16px; margin-top: 10px">
                                <div class="ui basic right pointing label text-paperviu-dark">#Episodio/Video</div>
                                <input type="number" v-model="numero" min="0">
                            </div>
                            <div class="ui labeled small input" style="margin-left: 16px; margin-top: 10px">
                                <div class="ui basic right pointing label text-paperviu-dark">Formato</div>
                                <select v-model="tipo" class="ui dropdown">
                                    <option v-if="tipo === 'video/webm'" selected value="video/webm">Webm</option>
                                    <option v-if="tipo !== 'video/webm'" value="video/webm">Webm</option>
                                    <option v-if="tipo === 'video/ogg'" selected value="video/ogg">Ogg</option>
                                    <option v-if="tipo !== 'video/ogg'" value="video/ogg">Ogg</option>
                                    <option v-if="tipo === 'video/mp4'" selected value="video/mp4">Mp4</option>
                                    <option v-if="tipo !== 'video/mp4'" value="video/mp4">Mp4</option>
                                    <option v-if="tipo === undefined || tipo === ''" value="" selected disabled>
                                        Seleccionar formato
                                    </option>
                                </select>
                            </div>
                            <div class="ui labeled small fluid input" style="margin-left: 16px; margin-top: 10px">
                                <div class="ui basic right pointing label text-paperviu-dark">T&iacute;tulo</div>
                                <input type="text" placeholder="Ingrese un titulo..." v-model="titulo">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui two column grid center aligned container" style="background-color: #dce5ef">
                <div class="centered column" style="padding: 3px; margin: 0px">
                    <h3 class="ui sub header text-paperviu-dark" style="margin-top: 5px">
                        <i :class="{'text-paperviu-sky checkmark': creado, 'warning orange': !creado}"
                           class="icon"></i>{{ creado ? 'Video creado!' : 'A&uacute;n no creado'}}
                    </h3>
                </div>
                <div class="column" style="padding: 3px; margin: 0px">
                    <h3 class="ui sub header text-paperviu-dark" style="margin-top: 5px">
                        <i :class="{'text-paperviu-sky checkmark': uploaded, 'warning orange': !uploaded}"
                           class="icon"></i>{{ uploaded ? 'Video publicado!' : 'A&uacute;n no publicado'}}
                    </h3>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';

    export default {
        props: ['contenido', 'titulo', 'numero', 'videoId', 'fecha', 'hora', 'estadoVideo', 'videoRuta', 'id', 'loading', 'tipo'],
        data() {
            return {
                estado: 0,
                video: ''
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
                return this.contenidoActual.videos.find(c => c.id === this.id);
            },
            creado() {
                return this.estado >= 1;
            },
            uploaded() {
                return this.estado === 2;
            },
            toUpload() {
                return this.estado >= 1 && this.estado !== 2;
            },
            history() {
                return this.creado && !this.loading;
            }
        },
        mounted() {
            if (this.videoId !== undefined && this.videoId !== "") this.estado = 1;
            if (this.videoRuta !== undefined && this.videoRuta !== "" && this.videoRuta !== null && this.videoRuta !== "null") this.estado = 2;
            var _this = this;
            $('#' + this.id + 'Btn').popup({
                popup: $('#' + _this.id),
                on: 'click'
            });
            $('.ui.dropdown').dropdown();
        },
        methods: {
            subirVideo() {
                if (this.contenido !== '' && this.videoId !== '') {
                    this.loading = true;
                    var _this = this;
                    this.mostrarPublicandoVideo();
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesUpload({
                        path: '/Aplicaciones/contenidos/' + _this.contenido + "/" + _this.videoId + _this.video.name.substring(_this.video.name.lastIndexOf('.'), _this.video.name.length),
                        contents: _this.video,
                        mute: true,
                        mode: {'.tag': 'overwrite'}
                    }).then(function (response) {
                        if (response !== undefined) {
                            var x = JSON.parse(JSON.stringify(response));
                            _this.videoRuta = x.name;
                            _this.videoActual.videoRuta = x.name;
                            _this.estado = 2;
                            _this.mostrarVideoPublicado();
                            _this.$emit('actualizarRuta');
                        } else {
                            _this.loading = false;
                            _this.mostrarErrorPublicarVideo();
                        }
                    }).catch(function (error) {
                        _this.loading = false;
                        _this.mostrarErrorPublicarVideo();
                    });
                }
            },
            crearVideo() {
                var _this = this;
                this.$store.commit('setVideoNuevo', {
                    id: _this.id,
                    titulo: _this.titulo,
                    numero: _this.numero,
                    estado: _this.estadoVideo,
                    tipo: _this.tipo
                });
                this.$emit('crearVideo');
            },
            mostrarVideoPublicado() {
                var _this = this;
                this.$noty.success('Video Publicado!', noty.successPublicar);
            },
            mostrarPublicandoVideo() {
                this.$noty.info("Publicando Video...", noty.infoPublicar);
            },
            mostrarErrorPublicarVideo() {
                var _this = this;
                this.$noty.error("No se pudo Publicar el Video!", noty.errorPublicar);
            },
            guardar() {
                if (this.videoActual !== undefined && this.videoActual.videoId !== '') this.$emit('actualizarVideo');
                else this.crearVideo();
            },
        },
        watch: {
            video(newValue, oldValue) {
                if (newValue !== '' && newValue !== oldValue) {
                    this.estado = 3;
                }
            },
            videoId(newValue, oldValue) {
                if (newValue !== undefined && newValue !== "") {
                    this.estado = 1;
                }
            },
            titulo(newValue, oldValue) {
                this.videoActual.titulo = newValue;
            },
            numero(newValue, oldValue) {
                this.videoActual.numero = newValue;
            },
            tipo(newValue) {
                this.videoActual.tipo = newValue;
            },
            estadoVideo(newValue, oldValue) {
                this.videoActual.estadoVideo = newValue;
            },
            videoRuta(newValue, oldValue) {
                this.videoActual.videoRuta = newValue;
                if (newValue !== undefined && newValue !== "") {
                    this.estado = 2;
                }
            }
        }
    }
</script>