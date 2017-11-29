<template>
    <div>
        <div class="ui grid container border-left-paperviu-sky paperviu-e8" style="margin-top: 60px">
            <div class="sixteen wide column" style="padding: 0">
                <div class="row">
                    <div class="ui left ribbon paperviu-dark fluid label"
                         style="padding: 0; margin-left: 12px;">
                        <div class="ui secondary menu pointing inverted" style="margin: 0; padding: 0; border: 0">
                            <h3 class="ui header inverted"
                                style="margin-top: 7px; margin-bottom: 0; margin-left: 10px; margin-right: 16px"><i
                                    class="history icon text-paperviu-sky"></i>Estad&iacute;sticas por contenido en el tiempo.
                            </h3>
                            <div class="right menu">
                                <a @click="desde = ''; hasta = ''; getEstadisticasContendidosEmpresaByDate();"
                                   class="ui small text-paperviu-d7 item"
                                   style="margin: 0; padding: 7px">
                                    <i class="refresh icon large text-paperviu-sky"></i><span class="ui header inverted"
                                                                                              style="margin: 0">Recargar</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui secondary stackable pointing menu" style="padding:0; margin: 0; border: 0">
                    <div class="right menu">
                        <div class="ui item" style="margin: 0">
                            <div class="ui input">
                                <flat-pickr
                                        v-model="desde"
                                        placeholder="Reproducciones desde..."
                                        :config="config">
                                </flat-pickr>
                            </div>
                        </div>
                        <div class="ui item" style="margin: 0">
                            <div class="ui input">
                                <flat-pickr
                                        v-model="hasta"
                                        placeholder="Reproducciones hasta..."
                                        :config="config">
                                </flat-pickr>
                            </div>
                        </div>
                        <a @click="getEstadisticasContendidosEmpresaByDate" style="margin-right: 10px"
                           class="ui small text-paperviu-d7 item">
                            <i class="search icon large text-paperviu-sky"></i><span class="ui header text-paperviu-d7"
                                                                                     style="margin: 0">Buscar</span>
                        </a>
                    </div>
                </div>
            </div>
            <vue-chart
                    chart-type="ColumnChart"
                    style="width: inherit; min-height: 350px"
                    :columns="estadisticasContenidosEmpresa.columns"
                    :rows="estadisticasContenidosEmpresa.rows"
                    :options="estadisticasContenidosEmpresa.options"
            ></vue-chart>
        </div>
        <div class="ui stackable two column grid container" style="margin-top: 50px">
            <div class="column">
                <div class="row paperviu-e8 border-left-paperviu-sky">
                    <div class="ui left ribbon label paperviu-dark header text-paperviu-e8"
                         style="padding-top: 5px; padding-bottom: 5px; margin-left: 15px; margin-top: 10px">
                        <i class="play icon"></i>Reproducciones totales.
                    </div>
                    <div class="row" style="padding-left: 20px; padding-top: 20px; margin-bottom: 0; padding-bottom: 0">
                        <div class="ui statistic">
                            <div class="ui value header text-paperviu-sky" style="margin: 0">
                                {{reproduccionesByContenidos.total}}
                            </div>
                            <div class="label text-paperviu-dark">Total</div>
                        </div>
                    </div>
                    <div class="ui center aligned basic segment" style="margin-top: 0">
                        <vue-chart
                                chart-type="PieChart"
                                style="width: inherit; min-height: 350px"
                                :columns="reproduccionesByContenidos.columns"
                                :rows="reproduccionesByContenidos.rows"
                                :options="reproduccionesByContenidos.options"
                        ></vue-chart>
                    </div>
                </div>
            </div>
            <div class="column">
                <div class="row paperviu-e8 border-left-paperviu-sky">
                    <div class="ui left ribbon label paperviu-dark header text-paperviu-e8"
                         style="padding-top: 5px; padding-bottom: 5px; margin-left: 15px; margin-top: 10px">
                        <i class="star icon"></i>Valoraciones recibidas.
                    </div>
                    <div class="row" style="padding-left: 20px; padding-top: 20px">
                        <div class="ui statistic">
                            <div class="ui value header text-paperviu-sky" style="margin: 0">
                                {{valoracionesByContenido.total}}
                            </div>
                            <div class="label text-paperviu-dark">Total</div>
                        </div>
                    </div>
                    <div class="ui center aligned basic segment" style="margin-top: 0">
                        <vue-chart
                                chart-type="PieChart"
                                style="width: inherit; min-height: 350px"
                                :columns="valoracionesByContenido.columns"
                                :rows="valoracionesByContenido.rows"
                                :options="valoracionesByContenido.options"
                        ></vue-chart>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';
    import flatPickr from 'vue-flatpickr-component';

    export default {
        data() {
            return {
                desde: '',
                hasta: '',
                estadisticasContenidosEmpresa: {
                    columns: [{
                        'type': 'string',
                        'label': 'Contenido'
                    }, {
                        'type': 'number',
                        'label': 'Reproducciones'
                    }, {
                        'type': 'number',
                        'label': 'Valoraciones'
                    }, {
                        'type': 'number',
                        'label': 'Favoritos'
                    }, {
                        'type': 'number',
                        'label': 'Comentarios'
                    }],
                    rows: [],
                    options: {
                        backgroundColor: '#e8eff4',
                        height: 350,
                        chartArea: {top: 20, width: '100%', height: '100%', right: 30, bottom: 50, left: 70},
                        legend: {position: 'bottom'},
                    }
                },
                contenidoActual: '',
                reproduccionesByContenidos: {
                    columns: [{
                        'type': 'string',
                        'label': 'Contenido'
                    }, {
                        'type': 'number',
                        'label': 'Reproducciones'
                    }],
                    rows: [],
                    options: {
                        backgroundColor: '#e8eff4',
                        height: 350,
                        chartArea: {top: 20, width: '100%', height: '100%', right: 30, bottom: 50, left: 70},
                        legend: {position: 'bottom'},
                    },
                    total: 0
                },
                valoracionesByContenido: {
                    columns: [{
                        'type': 'string',
                        'label': 'Valoracion'
                    }, {
                        'type': 'number',
                        'label': 'Cantidad'
                    }],
                    rows: [],
                    options: {
                        backgroundColor: '#e8eff4',
                        height: 350,
                        chartArea: {top: 20, width: '100%', height: '100%', right: 30, bottom: 50, left: 70},
                        legend: {position: 'bottom'},
                    },
                    total: 0
                },
                contenidos: [],
                config: {
                    altFormat: 'M	j, Y',
                    altInput: true,
                    dateFormat: "d/m/Y",
                }
            }
        },
        mounted() {
            document.title = 'Reportes';
            this.$store.commit('setVistaActual', 'Reportes');
            $('.ui.dropdown').dropdown();
            this.getReproduccionesByContenidoEmpresa();
            this.getValoracionesByContenidoEmpresa();
            this.getEstadisticasContendidosEmpresaByDate();
        },
        computed: {
            empresa() {
                return this.$store.state.empresa;
            },
            getReproduccionesByContenidosEmpresaURL() {
                return this.$store.state.baseUrl + "reportes/reproducciones/empresas/" + this.empresa.nombre;
            },
            getValoracionesByContenidosEmpresaURL() {
                return this.$store.state.baseUrl + "reportes/valoraciones/empresas/" + this.empresa.nombre;
            },
            getContenidosByEmpresaURL() {
                return this.$store.state.baseUrl + "contenidos/empresa/" + this.empresa.nombre;
            },
            getEstadisticasContenidoURL() {
                return this.$store.state.baseUrl + "reportes/estadisticas/contenido/";
            },
            getEstadisticasContenidoEmpresaByDateURL() {
                return this.$store.state.baseUrl + "reportes/estadisticas/contenidos?empresa=" + this.empresa.nombre + "&desde=" + this.desde + "&hasta=" + this.hasta;
            }
        },
        methods: {
            getReproduccionesByContenidoEmpresa() {
                if (this.empresa.nombre !== '') {
                    var _this = this;
                    $.get(this.getReproduccionesByContenidosEmpresaURL, function (response) {
                        if (response !== undefined) {
                            var total = 0;
                            _this.reproduccionesByContenidos.rows = [];
                            $.each(response, function (index, reproduccion) {
                                var row = [];
                                row.push(reproduccion.titulo);
                                row.push(Number(reproduccion.cantidad));
                                total += Number(reproduccion.cantidad || 0);
                                _this.reproduccionesByContenidos.rows.push(row);
                            });
                            _this.reproduccionesByContenidos.total = total;
                        }
                    });
                }
            },
            getValoracionesByContenidoEmpresa() {
                if (this.empresa.nombre !== '') {
                    var _this = this;
                    $.get(this.getValoracionesByContenidosEmpresaURL, function (response) {
                        if (response !== undefined) {
                            var total = 0;
                            _this.valoracionesByContenido.rows = [];
                            $.each(response, function (index, val) {
                                var row = [];
                                row.push("Valoracion " + val.valoracion);
                                row.push(Number(val.cantidad || 0));
                                _this.valoracionesByContenido.rows.push(row);
                                total += Number(val.cantidad || 0);
                            });
                            _this.valoracionesByContenido.total = total;
                        }
                    });
                }
            },
            getEstadisticasContendidosEmpresaByDate() {
                var _this = this;
                if (this.empresa.nombre !== '') {
                    $.get(this.getEstadisticasContenidoEmpresaByDateURL, function (response) {
                        if (response !== undefined) {
                            _this.estadisticasContenidosEmpresa.rows = [];
                            $.each(response, function (index, contenido) {
                                var row = [];
                                row.push(contenido.titulo);
                                row.push(Number(contenido.reproducciones));
                                row.push(Number(contenido.valoraciones));
                                row.push(Number(contenido.favoritos));
                                row.push(Number(contenido.comentarios));
                                _this.estadisticasContenidosEmpresa.rows.push(row);
                            });
                        }
                    });
                }
            }
        },
        components: {
            flatPickr
        }
    }
</script>