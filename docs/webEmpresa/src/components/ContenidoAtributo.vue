<template>
    <div>
        <div class="row paperviu-e8" style="padding: 30px; padding-bottom: 80px">
            <div class="ui text container" v-if="!loading">
                <div class="ui left aligned text container" style="padding: 30px">
                    <template v-for=" atr in atributos">
                        <div class="ui row border-left-paperviu-sky" style="padding: 10px; background-color: #dce5ef">
                            <h4 class="ui basic ribbon paperviu-dark label inverted header" style="margin: 0px">
                                {{atr.clave}}</h4>
                            <div class="ui fluid small focus input" style="padding-top: 10px">
                                <input type="text" placeholder="Ingrese el valor del atributo..."
                                       v-model="atr.valor">
                            </div>
                        </div>
                    </template>
                </div>
            </div>
            <div v-if="loading" class="ui center aligned basic segment" style="padding: 100px">
                <div class="ui active loader huge" style="opacity: 0.5"></div>
            </div>
        </div>
        <div class="ui bottom fixed pointing secondary menu" style="border: 0px">
            <div class="ui basic center aligned segment paperviu-dark"
                 style="width: 100%">
                <button @click="$emit('recargarAtributos')" class="ui button inverted basic"><i class="refresh icon"></i>Recargar
                </button>
                <button @click="agregarAtributos" v-if="!loading"
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
        props: ['contenido', 'loading', 'tipo'],
        data() {
            return {
                tipoActual: '',
                atributos: [],
                valoresArray: ''
            }
        },
        computed: {
            contenidos() {
                return this.$store.state.contenidosModList;
            },
            contenidoActual() {
                return this.contenidos.find(c => c.id == this.contenido);
            },
            getAtributos() {
                return this.contenidoActual.atributos;
            },
            agregarAtributosURL() {
                return this.$store.state.baseUrl + "contenidos/atributos?atributos=" + this.valoresArray + "&idContenido=" + this.contenido;
            }
        },
        methods: {
            cargarAtributos() {
                if (this.contenidoActual !== undefined) {
                    if (this.contenidoActual.atributos !== undefined) {
                        this.atributos = this.contenidoActual.atributos;
                    }
                }
            },
            agregarAtributos() {
                this.mostrarActualizandoAtributos();
                var atr;
                var valores = '';
                for (atr of this.atributos) {
                    valores += atr.valor + ','
                }
                this.valoresArray = valores.substring(0, valores.length - 1);
                var _this = this;
                $.ajax({
                    type: 'PUT',
                    url: _this.agregarAtributosURL,
                    success: function (response) {
                        if (response !== undefined) {
                            if (response === true || response === "true") {
                                _this.mostrarAtributosActualizados();
                            } else {
                                _this.mostrarErrorActualizandoAtributos();
                            }
                        } else {
                            _this.mostrarErrorActualizandoAtributos();
                        }
                    },
                    error: function () {
                        _this.mostrarErrorActualizandoAtributos();
                    }
                });
            },
            mostrarActualizandoAtributos() {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Actualizando Atributos...</h3>", noty.info);
            },
            mostrarAtributosActualizados() {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Atributos Actualizados!</h3>", noty.success);
            },
            mostrarErrorActualizandoAtributos() {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Error al Actualizar Atributos!</h3>", noty.error);
            }
        },
        mounted() {
            this.cargarAtributos();
        },
        watch: {
            loading(newValue, oldValue) {
                if (newValue === false) {
                    this.cargarAtributos();
                }
            }
        }
    }
</script>