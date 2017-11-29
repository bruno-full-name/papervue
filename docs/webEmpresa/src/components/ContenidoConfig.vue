<template>
    <div>
        <div class="row paperviu-e8" style="padding: 30px; padding-bottom: 80px">
            <div v-if="!loading">
                <div class="ui text container">
                    <div class="ui toggle checkbox">
                        <input v-model="estado" type="checkbox">
                        <label class="ui header small grey"
                               style="margin: 0px">{{ estado ? 'Habilitado' : 'Deshabilitado' }}</label>
                    </div>
                    <div class="divider"></div>
                    <div class="ui toggle checkbox" style="margin-top: 16px">
                        <input v-model="destacado" type="checkbox">
                        <label class="ui header small grey"
                               style="margin: 0px">{{ destacado ? 'Contenido destacado' : 'Contenido No destacado'
                            }}</label>
                    </div>
                    <div class="divider"></div>
                    <div class="ui toggle checkbox" style="margin-top: 16px">
                        <input v-model="payperview" type="checkbox">
                        <label class="ui header small grey"
                               style="margin: 0px">{{ payperview ? 'Disponible como Pay-Per-View' : 'No Disponible como Pay-Per-View'
                            }}</label>
                    </div>
                </div>
                <div class="row" v-if="payperview" style="padding: 16px">
                    <div class="ui text container">
                        <div class="ui labeled small input">
                            <div class="ui basic label">Precio</div>
                            <input type="number" min="0" v-model="precio"
                                   placeholder="Ingrese el Precio del contenido...">
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="loading" class="ui center aligned text container" style="padding: 50px">
                <div class="ui active loader huge" style="opacity: 0.3;"></div>
            </div>
        </div>
        <div class="ui bottom fixed pointing secondary menu" style="border: 0px">
            <div class="ui basic center aligned segment paperviu-dark"
                 style="width: 100%">
                <button @click="$emit('recargarInfo')" class="ui button inverted basic"><i class="refresh icon"></i>Recargar
                </button>
                <button @click="actualizarEDPP" v-if="!loading" class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8"><i
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
                estado: false,
                destacado: false,
                payperview: false,
                precio: 0
            }
        },
        computed: {
            contenidos() {
                return this.$store.state.contenidosModList;
            },
            contenidoActual() {
                return this.contenidos.find(c => c.id == this.contenido);
            },
            actualizarEDPPURL() {
                return this.$store.state.baseUrl + "contenidos/edpp?id=" + this.contenido + "&estado=" + this.estado + "&destacado=" + this.destacado + "&payperview=" + this.payperview + "&precio=" + this.precio;
            }
        },
        mounted() {
            this.cargarInfo();
        },
        methods: {
            cargarInfo() {
                if (this.contenidoActual !== undefined) {
                    if (this.contenidoActual.info !== undefined) {
                        this.estado = this.contenidoActual.info.estado;
                        this.destacado = this.contenidoActual.info.destacado;
                        this.payperview = this.contenidoActual.info.payperview;
                        var precio = this.contenidoActual.info.precio;
                        if (precio !== null)
                            this.precio = precio;
                    }
                }
            },
            actualizarEDPP() {
                var _this = this;
                $.ajax({
                    type: 'PUT',
                    url: _this.actualizarEDPPURL,
                    success: function (response) {
                        if (response !== undefined) {
                            if (response === true || response === "true") {
                                _this.actualizarInfo();
                                _this.mostrarExitoActualizar();
                            } else {
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
                this.contenidoActual.info.estado = this.estado;
                this.contenidoActual.info.destacado = this.destacado;
                this.contenidoActual.info.payperview = this.payperview;
                this.contenidoActual.info.precio = this.precio;
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
                    this.cargarInfo();
                }
            }
        }
    }
</script>