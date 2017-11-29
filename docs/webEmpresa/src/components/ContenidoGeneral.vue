<template>
    <div>
        <div class="row paperviu-e8" style="padding-top: 30px; padding-bottom: 80px">
            <div class="ui text container" v-show="!loading">
                <div class="ui fluid small labeled input">
                    <div class="ui basic label">T&iacute;tulo</div>
                    <input type="text" v-model="titulo"
                           placeholder="Ingrese el Titulo del contenido...">
                </div>
                <div class="ui reply form" style="margin-top: 16px">
                    <div class="field">
                            <textarea v-model="descripcion" cols="30"
                                      style="min-height: 100px; max-width: 100%; min-width: 100%" maxlength="1024"
                                      placeholder="Escriba una descripcion para el contenido..."></textarea>
                    </div>
                </div>
                <div class="ui fluid labeled small input" style="margin-top: 16px">
                    <div class="ui basic label" style="margin-right: -1px">Categorias</div>
                    <select multiple="" id="categorias" class="ui fluid search dropdown">
                        <template v-for="cat in this.$store.getters.getCategorias">
                            <option :value="cat.nombre">{{ cat.nombre }}</option>
                        </template>
                    </select>
                </div>
                <div class="ui fluid labeled small input" style="margin-top: 16px">
                    <div class="ui basic label" style="margin-right: -1px">Actores</div>
                    <select id="actores" multiple="" class="ui fluid search dropdown"></select>
                </div>
                <div class="ui fluid labeled input small" style="margin-top: 16px">
                    <div class="ui basic label" style="margin-right: -1px">Directores</div>
                    <select id="directores" multiple="" class="ui fluid search dropdown"></select>
                </div>
            </div>
            <div v-if="loading" class="ui center aligned basic segment" style="padding: 100px">
                <div class="ui active loader huge" style="opacity: 0.5"></div>
            </div>
        </div>
        <div class="ui bottom fixed pointing secondary menu" style="border: 0px">
            <div class="ui basic center aligned segment paperviu-dark"
                 style="width: 100%">
                <button @click="$emit('recargarInfo')" class="ui button inverted basic"><i class="refresh icon"></i>Recargar
                </button>
                <button @click="actualizarContenido" v-if="!loading"
                        class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8"><i
                        class="save icon"></i>Guardar Cambios
                </button>
            </div>
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';

    export default {
        props: ['contenido', 'loading'],
        data() {
            return {
                titulo: '',
                descripcion: '',
                actores: [],
                directores: [],
                categorias: []
            }
        },
        computed: {
            contenidos() {
                return this.$store.state.contenidosModList;
            },
            contenidoActual() {
                return this.contenidos.find(c => c.id == this.contenido);
            },
            actualizarContenidoURL() {
                return this.$store.state.baseUrl + "contenidos?id=" + this.contenido + "&titulo=" + this.titulo + "&descripcion=" + this.descripcion + "&actores=" + this.actores + "&directores=" + this.directores + "&categorias=" + this.categorias;
            }
        },
        mounted() {
            $('#actores').dropdown({
                allowAdditions: true
            });
            $('#directores').dropdown({
                allowAdditions: true
            });
            $('#categorias').dropdown();
            this.cargarTLS();
        },
        methods: {
            cargarTLS() {
                if (this.contenidoActual !== undefined) {
                    if (this.contenidoActual.info !== undefined) {
                        this.titulo = this.contenidoActual.info.titulo;
                        this.descripcion = this.contenidoActual.info.descripcion;
                    }
                    if (this.contenidoActual.categorias !== undefined) {
                        $('#categorias').dropdown('set selected', this.contenidoActual.categorias);
                    }
                    if (this.contenidoActual.directores !== undefined) {
                        $('#directores').dropdown('set selected', this.contenidoActual.directores);
                    }
                    if (this.contenidoActual.actores !== undefined) {
                        $('#actores').dropdown('set selected', this.contenidoActual.actores);
                    }
                }
            },
            actualizarContenido() {
                this.mostrarGuardando();
                var actores = $('#actores').dropdown("get value");
                this.actores = actores;
                var directores = $('#directores').dropdown("get value");
                this.directores = directores;
                var categorias = $('#categorias').dropdown("get value");
                this.categorias = categorias;
                var _this = this;
                $.ajax({
                    type: 'PUT',
                    url: _this.actualizarContenidoURL,
                    success: function (response) {
                        if (response !== undefined) {
                            if (response === true || response === "true") {
                                _this.actualizarInfo();
                                _this.mostrarExitoActualizar();
                            }
                            else {
                                _this.mostrarErrorActualizar();
                            }
                        } else {
                            _this.mostrarErrorActualizar();
                        }
                    },
                    error: function () {
                        _this.mostrarErrorActualizar();
                    }
                });
            },
            actualizarInfo() {
                this.contenidoActual.info.titulo = this.titulo;
                this.contenidoActual.info.descripcion = this.descripcion;
                this.contenidoActual.actores = this.actores;
                this.contenidoActual.directores = this.directores;
                this.contenidoActual.categorias = this.categorias;
            },
            mostrarGuardando() {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Actualizando Informaci&oacute;n...</h3>", noty.info);
            },
            mostrarExitoActualizar() {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Informaci&oacute;n Actualizada!</h3>", noty.success);
            },
            mostrarErrorActualizar() {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Error al Actualizar Informaci&oacute;n!</h3>", noty.error);
            }
        },
        watch: {
            loading(newValue, oldValue) {
                if (newValue === false) {
                    $('#actores').dropdown({
                        allowAdditions: true
                    });
                    $('#directores').dropdown({
                        allowAdditions: true
                    });
                    $('#categorias').dropdown();
                    this.cargarTLS();
                }
            }
        }
    }
</script>