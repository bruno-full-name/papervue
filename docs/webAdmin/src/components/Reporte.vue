<template>
    <div>
        <div class="row" style="background-color: #3e444a">
            <div class="ui secondary pointing three item stackable menu">
                <a @click="opcion = 1;"
                   :class="{'active border-bottom-paperviu-sky paperviu-dark':opcion === 1, 'hover-paperviu-d7': opcion !== 1}"
                   class="ui item text-paperviu-e8">
                    <span class="ui header" style="margin: 0; color: inherit; font-size: 20px; font-weight: 500">Reportes de la plataforma</span>
                </a>
                <a @click="opcion = 2;"
                   :class="{'active border-bottom-paperviu-sky paperviu-dark':opcion === 2, 'hover-paperviu-d7': opcion !== 2}"
                   class="ui item text-paperviu-e8">
                    <span class="ui header" style="margin: 0; color: inherit; font-size: 20px; font-weight: 500">Reportes por empresa</span>
                </a>
                <a @click="opcion = 3;"
                   :class="{'active border-bottom-paperviu-sky paperviu-dark':opcion === 3, 'hover-paperviu-d7': opcion !== 3}"
                   class="ui item text-paperviu-e8">
                    <span class="ui header" style="margin: 0; color: inherit; font-size: 20px; font-weight: 500">Reportes por contenido</span>
                </a>
            </div>
        </div>
        <div v-show="opcion === 1" class="row">
            <div class="row">
                <div class="ui stackable grid" style="margin: 0">
                    <div class="row paperviu-e4" style="margin: 0">
                        <h2 class="ui header text-paperviu-d7"
                            style="font-weight: 500; margin-left: 16px; margin-bottom: 0">
                            <i class="history icon text-paperviu-sky"></i>Reproducciones en el tiempo
                        </h2>
                    </div>
                    <div class="row" style="padding: 0">
                        <div class="center aligned four wide column paperviu-e8">
                            <div class="ui fluid labeled icon input" style="margin-top: 16px">
                                <div class="ui basic tag right pointing text-paperviu-dark label"
                                     style="margin-right: -1px">Desde
                                </div>
                                <flat-pickr
                                        v-model="desde"
                                        placeholder="Reproducciones desde..."
                                        :config="config">
                                </flat-pickr>
                                <i class="calendar icon text-paperviu-sky"></i>
                            </div>
                            <div class="ui fluid labeled icon input" style="margin-top: 16px; margin-bottom: 10px">
                                <div class="ui basic tag right pointing text-paperviu-dark label"
                                     style="margin-right: -1px">Hasta
                                </div>
                                <flat-pickr
                                        v-model="hasta"
                                        placeholder="Reproducciones hasta..."
                                        :config="config">
                                </flat-pickr>
                                <i class="calendar icon text-paperviu-sky"></i>
                            </div>
                            <div @click="getReproduccionesAllEmpresas();" class="ui item hover-paperviu-e4"
                                 style="padding: 30px; cursor:pointer;">
                                <h3 class="ui header text-paperviu-d7"><i class="search icon text-paperviu-sky"></i>Buscar
                                </h3>
                            </div>
                            <div @click="desde = ''; hasta = ''; getReproduccionesAllEmpresas();"
                                 class="ui item hover-paperviu-e4" style="padding: 20px; cursor:pointer;">
                                <h4 class="ui header text-paperviu-d7"><i class="refresh icon text-paperviu-sky"></i>Recargar
                                </h4>
                            </div>
                            <div class="ui statistic small item" style="padding: 10px">
                                <div class="label text-paperviu-dark paperviu-e8">Total:</div>
                                <div class="ui value header text-paperviu-sky" style="margin: 0">
                                    {{reproduccionesEmpresas.total}}
                                </div>
                            </div>
                        </div>
                        <div class="twelve wide column paperviu-e8">
                            <vue-chart
                                    style="min-height: 400px"
                                    chart-type="ColumnChart"
                                    :columns="reproduccionesEmpresas.columns"
                                    :rows="reproduccionesEmpresas.rows"
                                    :options="reproduccionesEmpresas.options"
                            ></vue-chart>
                        </div>
                    </div>
                    <div class="row paperviu-e4 border-bottom-paperviu-dark">
                        <h2 class="ui header text-paperviu-dark"
                            style="font-weight: 500; margin-left: 16px; margin-bottom: 0">
                            <i class="history icon text-paperviu-sky"></i>Ingreso de usuarios por ubicaci&oacute;n
                        </h2>
                    </div>
                    <div class="row" style="padding: 0">
                        <vue-chart
                                chart-type="GeoChart"
                                style="width: inherit; min-height: 400px"
                                :columns="columnsMapa"
                                :rows="ciudades"
                                :options="optionsMapa"
                        ></vue-chart>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="opcion === 2" class="row">
            <div class="ui stackable grid" style="margin: 0">
                <div class="four wide column paperviu-e8" style="padding: 0">
                    <div class="ui secondary pointing vertical fluid menu">
                        <div class="ui active border-bottom-paperviu-sky paperviu-e4 item">
                            <div class="ui transparent icon input big" style="padding: 5px">
                                <i @click="listarEmpresas" class="search link icon"></i>
                                <input style="height: 30px" v-model="empresaFiltro"
                                       @keyup.enter="listarEmpresas"
                                       placeholder="Buscar empresas..." type="text">
                            </div>
                        </div>
                        <template v-for="empresa in empresas">
                            <a @click="empresaActual = empresa; desdeEmpresa = ''; hastaEmpresa = '';getEstadisticasContendidosEmpresaByDate();"
                               class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                               style="padding: 16px">
                                <h2 class="ui header" style="color: inherit; font-weight: 500">{{empresa}}</h2>
                            </a>
                        </template>
                    </div>
                    <infinite-loading ref="infiniteLoadingEmpresaReporte"
                                      style="padding: 30px"
                                      @infinite="infiniteHandlerEmpresa">
                        <div slot="no-more">
                            <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay m&aacute;s resultados.
                            </div>
                        </div>
                        <div slot="no-results">
                            <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay resultados que mostrar.
                            </div>
                        </div>
                    </infinite-loading>
                </div>
                <div class="twelve wide column" v-show="empresaActual !== ''"
                     style="padding-top: 0; padding-right: 0; padding-left: 5px">
                    <div class="ui secondary menu paperviu-e4">
                        <div class="ui item" style="margin-left: 16px">
                            <h2 class="ui header text-paperviu-dark">{{empresaActual}}</h2>
                        </div>
                        <div class="right menu">
                            <div class="ui item" style="margin: 0">
                                <div class="ui input">
                                    <flat-pickr
                                            v-model="desdeEmpresa"
                                            placeholder="Resultados desde..."
                                            :config="config">
                                    </flat-pickr>
                                </div>
                            </div>
                            <div class="ui item" style="margin: 0">
                                <div class="ui input">
                                    <flat-pickr
                                            v-model="hastaEmpresa"
                                            placeholder="Resultados hasta..."
                                            :config="config">
                                    </flat-pickr>
                                </div>
                            </div>
                            <a @click="getEstadisticasContendidosEmpresaByDate" style="margin-right: 10px"
                               class="ui small text-paperviu-d7 item">
                                <i class="search icon large text-paperviu-sky"></i><span
                                    class="ui header text-paperviu-d7"
                                    style="margin: 0">Buscar</span>
                            </a>
                        </div>
                    </div>
                    <vue-chart
                            chart-type="ColumnChart"
                            style="width: 100%; min-height: 400px"
                            :columns="estadisticasContenidosEmpresa.columns"
                            :rows="estadisticasContenidosEmpresa.rows"
                            :options="estadisticasContenidosEmpresa.options"
                    ></vue-chart>
                </div>
            </div>
        </div>
        <div v-show="opcion === 3" class="row">
            <div class="ui stackable grid" style="margin: 0">
                <div class="four wide column paperviu-e8" style="padding: 0">
                    <div class="ui secondary pointing vertical fluid menu">
                        <div class="ui active border-bottom-paperviu-sky paperviu-e4 item">
                            <div class="ui transparent icon input big" style="padding: 5px">
                                <i @click="listarContenidos" class="search link icon"></i>
                                <input style="height: 30px" v-model="contenidoFiltro"
                                       @keyup.enter="listarContenidos"
                                       placeholder="Buscar contenidos..." type="text">
                            </div>
                        </div>
                        <template v-for="cont in contenidos">
                            <a @click="contenido.titulo = cont.titulo; contenido.id = cont.id; getEstadisticasContenido()"
                               class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                               style="padding: 16px">
                                <h2 class="ui header" style="color: inherit; font-weight: 500">{{cont.titulo}}</h2>
                            </a>
                        </template>
                    </div>
                    <infinite-loading ref="infiniteLoadingContenidoReporte"
                                      style="padding: 30px"
                                      @infinite="infiniteHandlerContenido">
                        <div slot="no-more">
                            <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay m&aacute;s resultados.
                            </div>
                        </div>
                        <div slot="no-results">
                            <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay resultados que mostrar.
                            </div>
                        </div>
                    </infinite-loading>
                </div>
                <div v-show="contenido.id !== ''" class="twelve wide column" style="padding-top: 0; padding-left: 5px">
                    <div class="ui secondary menu grid paperviu-e4">
                        <div class="row" style="padding: 0">
                            <div class="ui item" style="margin-left: 16px">
                                <h2 class="ui header text-paperviu-dark">{{contenido.titulo}}</h2>
                            </div>
                        </div>
                        <div class="row" style="padding: 0">
                            <div class="ui item">
                                <div class="ui horizontal statistic small item" style="padding: 0">
                                    <div class="label text-paperviu-d7 paperviu-e4">Reproducciones
                                    </div>
                                    <div class="ui value header text-paperviu-sky" style="margin: 0">
                                        {{estadisticasContenido.totalReproducciones}}
                                    </div>
                                </div>
                            </div>
                            <div class="ui item">
                                <div class="ui horizontal statistic small item" style="padding: 0">
                                    <div class="label text-paperviu-d7 paperviu-e4">Valoraciones</div>
                                    <div class="ui value header text-paperviu-sky" style="margin: 0">
                                        {{estadisticasContenido.totalValoraciones}}
                                    </div>
                                </div>
                            </div>
                            <div class="ui item">
                                <div class="ui horizontal statistic small item" style="padding: 0">
                                    <div class="label text-paperviu-d7 paperviu-e4">Favoritos</div>
                                    <div class="ui value header text-paperviu-sky" style="margin: 0">
                                        {{estadisticasContenido.totalFavoritos}}
                                    </div>
                                </div>
                            </div>
                            <div class="ui item">
                                <div class="ui horizontal statistic small item" style="padding: 0">
                                    <div class="label text-paperviu-d7 paperviu-e4">Comentarios</div>
                                    <div class="ui value header text-paperviu-sky" style="margin: 0">
                                        {{estadisticasContenido.totalComentarios}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <vue-chart
                            chart-type="ColumnChart"
                            style="width: 100%; min-height: 400px"
                            :columns="estadisticasContenido.columns"
                            :rows="estadisticasContenido.rows"
                            :options="estadisticasContenido.options"
                    ></vue-chart>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {googleMaps} from '../dropbox_token';
    import InfiniteLoading from 'vue-infinite-loading';
    import {noty} from '../noty';
    import flatPickr from 'vue-flatpickr-component';

    export default {
        data() {
            return {
                opcion: 1,
                reproduccionesEmpresas: {
                    columns: [
                        {
                            'type': 'string',
                            'label': 'Empresa'
                        },
                        {
                            'type': 'number',
                            'label': 'Reproducciones'
                        }
                    ],
                    rows: [],
                    options: {
                        backgroundColor: '#ebf1f6',
                        height: 400,
                        legend: {position: 'none'},
                        bar: {groupWidth: "30%"},
                        chartArea: {top: 20, width: '90%', height: '100%', right: 20, bottom: 40, left: 20},
                        vAxis: {format: 'short'}
                    },
                    total: 0
                },
                desde: '',
                hasta: '',
                desdeEmpresa: '',
                hastaEmpresa: '',
                empresaActual: '',
                contenidoActual: '',
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
                        backgroundColor: '#f1f5f9',
                        height: 400,
                        chartArea: {top: 30, width: '100%', height: '100%', right: 30, bottom: 50, left: 70},
                        legend: {position: 'top'},
                    }
                },
                estadisticasContenido: {
                    columns: [{
                        'type': 'string',
                        'label': 'Fecha'
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
                        backgroundColor: '#f1f5f9',
                        height: 400,
                        chartArea: {top: 20, width: '100%', height: '100%', right: 20, bottom: 50, left: 30},
                        legend: {position: 'bottom'},
                    },
                    totalValoraciones: 0,
                    totalFavoritos: 0,
                    totalReproducciones: 0,
                    totalComentarios: 0
                },
                config: {
                    altFormat: 'M	j, Y',
                    altInput: true,
                    dateFormat: "d/m/Y",
                },
                optionsMapa: {
                    displayMode: 'markers',
                    backgroundColor: '#6eb0c0',
                    colorAxis: {
                        colors: ['yellow', 'red']
                    }
                },
                columnsMapa: [{
                    'type': 'string',
                    'label': 'Ciudad'
                }, {
                    'type': 'number',
                    'label': 'Inicios de sesion'
                }],
                ciudades: [],
                empresas: [],
                empresaFiltro: '',
                paginaEmpresa: 1,
                contenidos: [],
                contenidoFiltro: '',
                paginaContenido: 1,
                contenido: {
                    id: '',
                    titulo: ''
                }
            }
        },
        computed: {
            getReproduccionesAllEmpresasURL() {
                return this.$store.state.baseUrl + "reportes/reproducciones/allEmpresas?desde=" + this.desde + "&hasta=" + this.hasta;
            },
            getEmpresasURL() {
                return this.$store.state.baseUrl + "empresas?filtro=" + this.empresaFiltro + "&pagina=" + this.paginaEmpresa;
            },
            getEstadisticasContenidosEmpresaByDateURL() {
                return this.$store.state.baseUrl + "reportes/estadisticas/contenidos?empresa=" + this.empresaActual + "&desde=" + this.desdeEmpresa + "&hasta=" + this.hastaEmpresa;
            },
            getEstadisticasContenidoURL() {
                return this.$store.state.baseUrl + "reportes/estadisticas/contenido/" + this.contenido.id;
            },
            getContenidosURL() {
                return this.$store.state.baseUrl + "contenidos/titulos?pagina=" + this.paginaContenido + "&filtro=" + this.contenidoFiltro;
            },
            getSesionesURL() {
                return this.$store.state.baseUrl + "sesiones";
            }
        },
        mounted() {
            this.cargarMapa();
            this.$store.commit('setVistaActual', 'Reportes');
            document.title = 'Reportes';
            this.getReproduccionesAllEmpresas();
            $('.ui.dropdown').dropdown();
        },
        methods: {
            getReproduccionesAllEmpresas() {
                var _this = this;
                $.get(this.getReproduccionesAllEmpresasURL, function (response) {
                    if (response !== undefined) {
                        var totalReproducciones = 0;
                        _this.reproduccionesEmpresas.rows = [];
                        $.each(response, function (index, empresa) {
                            var total = 0;
                            $.each(empresa.reproducciones, function (index, reproduccion) {
                                total += Number(reproduccion.cantidad);
                            });
                            var row = [];
                            row.push(empresa.empresa);
                            row.push(total);
                            _this.reproduccionesEmpresas.rows.push(row);
                            totalReproducciones += total;
                        });
                        _this.reproduccionesEmpresas.total = totalReproducciones;
                    }
                });
            },
            listarEmpresas() {
                this.paginaEmpresa = 1;
                this.empresas = [];
                this.$refs.infiniteLoadingEmpresaReporte.$emit('$InfiniteLoading:reset');
            },
            infiniteHandlerEmpresa($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.getEmpresasURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var empresas = [];
                                $.each(response, function (index, empresa) {
                                    empresas.push(empresa);
                                });
                                _this.empresas = _this.empresas.concat(empresas);
                                $state.loaded();
                                _this.paginaEmpresa += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            infiniteHandlerContenido($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.getContenidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var contenidos = [];
                                $.each(response, function (index, contenido) {
                                    contenidos.push({
                                        id: contenido[0],
                                        titulo: contenido[1]
                                    });
                                });
                                _this.contenidos = _this.contenidos.concat(contenidos);
                                $state.loaded();
                                _this.paginaContenido += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            getEstadisticasContenido() {
                if (this.contenido.id !== '') {
                    var _this = this;
                    $.get(this.getEstadisticasContenidoURL, function (response) {
                        if (response !== undefined) {
                            var totalValoraciones = 0;
                            var totalReproducciones = 0;
                            var totalFavoritos = 0;
                            var totalComentarios = 0;
                            _this.estadisticasContenido.rows = [];
                            $.each(response, function (index, estadistica) {
                                var fecha = new Date(estadistica.fecha);
                                var row = [];
                                row.push(fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear());
                                row.push(Number(estadistica.reproducciones || 0));
                                row.push(Number(estadistica.valoraciones || 0));
                                row.push(Number(estadistica.favoritos || 0));
                                row.push(Number(estadistica.comentarios || 0));
                                totalValoraciones += estadistica.valoraciones;
                                totalReproducciones += estadistica.reproducciones;
                                totalFavoritos += estadistica.favoritos;
                                totalComentarios += estadistica.comentarios;
                                _this.estadisticasContenido.rows.push(row);
                            });
                            _this.estadisticasContenido.totalValoraciones = totalValoraciones;
                            _this.estadisticasContenido.totalFavoritos = totalFavoritos;
                            _this.estadisticasContenido.totalReproducciones = totalReproducciones;
                            _this.estadisticasContenido.totalComentarios = totalComentarios;
                        }
                    });
                }
            },
            getEstadisticasContendidosEmpresaByDate() {
                var _this = this;
                $.get(this.getEstadisticasContenidosEmpresaByDateURL, function (response) {
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
            },
            listarContenidos() {
                this.paginaContenido = 1;
                this.contenidos = [];
                this.$refs.infiniteLoadingContenidoReporte.$emit('$InfiniteLoading:reset');
            },
            cargarMapa() {
                var _this = this;
                $.get(this.getSesionesURL, function (resp) {
                    if (resp !== undefined) {
                        for (var r of resp) {
                            _this.ciudades.push([
                                r.ciudad + "," + r.pais,
                                r.cantidad
                            ]);
                        }
                    }
                });

            }
        },
        watch: {
            opcion(newValue, oldValue) {
                if (newValue !== oldValue) {
                    if (newValue === 2) {
                        if (this.empresas.length === 0) this.listarEmpresas();
                        this.empresaActual = '';
                    } else if (newValue === 3) {
                        if (this.contenidos.length === 0) this.listarContenidos();
                        this.contenido.id = '';
                        this.contenido.titulo = '';
                    }
                }
            }
        },
        components: {
            flatPickr,
            InfiniteLoading
        }
    }
</script>