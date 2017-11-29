<template>
    <div>
        <div class="row paperviu-e8" style="padding: 30px; padding-bottom: 80px">
            <div v-if="!loading" class="ui center aligned text container">
                <VueImgInputer
                        v-model="imagen" :imgSrc="imagenSrc" icon="img" accept="image/*"
                        placeholder="Seleccione o arrastre una imagen de portada..."
                        style="background-color: #e9eff5" size="large"
                        bottomText="Click para cambiar la Imagen"></VueImgInputer>
            </div>
            <div v-if="loading" class="ui center aligned text container" style="padding: 100px">
                <div class="ui active loader huge" style="opacity: 0.3;"></div>
            </div>
        </div>
        <div class="ui bottom fixed pointing secondary menu" style="border: 0px">
            <div class="ui basic center aligned segment paperviu-dark"
                 style="width: 100%">
                <button @click="$emit('recargarInfo')" class="ui button inverted basic"><i class="refresh icon"></i>Recargar
                </button>
                <button @click="guardarImagenDropbox" v-if="!loading"
                        class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8"><i
                        class="save icon"></i>Guardar Cambios
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';

    export default {
        props: ['contenido', 'loading'],
        data() {
            return {
                imagenName: '',
                imagenSrc: '',
                imagen: ''
            }
        },
        computed: {
            contenidos() {
                return this.$store.state.contenidosModList;
            },
            contenidoActual() {
                return this.contenidos.find(c => c.id == this.contenido);
            },
            actualizarImagenURL() {
                return this.$store.state.baseUrl + "contenidos/imagen?contenido=" + this.contenido + "&imagen=" + this.imagenName;
            }
        },
        mounted() {
            this.cargarInfo();
            if (this.imagenName !== '' && this.imagenSrc === '') {
                this.cargarImagen();
            }
        },
        methods: {
            cargarInfo() {
                if (this.contenidoActual !== undefined) {
                    if (this.contenidoActual.info !== undefined) {
                        this.imagenName = this.contenidoActual.info.portada;
                    }
                }
            },
            cargarImagen() {
                if (this.contenidoActual.imagenSrc === '') {
                    var _this = this;
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + this.contenido + '/' + this.imagenName})
                        .then(function (response) {
                            if (response !== undefined && response.link !== undefined) {
                                _this.imagenSrc = response.link;
                                _this.contenidoActual.imagenSrc = response.link;
                            }
                        });
                } else {
                    this.imagenSrc = this.contenidoActual.imagenSrc;
                }
            },
            guardarImagenDropbox() {
                var _this = this;
                this.mostrarActualizandoImagen();
                if (this.imagen !== '') {
                    this.imagenName = _this.contenido + _this.imagen.name.substring(_this.imagen.name.lastIndexOf('.'), _this.imagen.name.length);
                    var _this = this;
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesUpload({
                        path: '/Aplicaciones/contenidos/' + _this.contenido + '/' + _this.imagenName,
                        contents: _this.imagen,
                        mute: true,
                        mode: {'.tag': 'overwrite'}
                    }).then(function (data) {
                        _this.actualizarImagen();
                    }).catch(function (error) {
                        _this.mostrarErrorActualizandoImagen();
                    });
                }
            },
            actualizarImagen() {
                var _this = this;
                $.ajax({
                    type: 'PUT',
                    url: this.actualizarImagenURL,
                    success: function (response) {
                        if (response !== undefined) {
                            if (response === true || response === "true") {
                                _this.mostrarImagenActualizada();
                                _this.contenidoActual.imagenSrc = '';
                                _this.cargarImagen();
                            } else {
                                _this.mostrarErrorActualizandoImagen();
                            }
                        } else {
                            _this.mostrarErrorActualizandoImagen();
                        }
                    },
                    error: function () {
                        _this.mostrarErrorActualizandoImagen();
                    }
                });
            },
            mostrarActualizandoImagen() {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Actualizando Imagen...</h3>", noty.info);
            },
            mostrarImagenActualizada() {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Imagen Actualizada!</h3>", noty.success);
            },
            mostrarErrorActualizandoImagen() {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido Actualizar la Imagen!</h3>", noty.error);
            }
        },
        watch: {
            loading(newValue, oldValue) {
                if (newValue === false) {
                    this.cargarInfo();
                }
            },
            imagenName(newValue, oldValue) {
                if (newValue !== '') {
                    if (this.imagenSrc === '') {
                        this.cargarImagen();
                    }
                }
            }
        }
    }
</script>