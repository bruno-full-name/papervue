<template>
    <div>
        <div class="ui stackable grid" style="margin: 0">
            <div class="ui four wide center aligned column paperviu-e8" style="padding: 0; height: inherit">
                <div class="ui stackable one column grid" style="padding: 0; margin: 0">
                    <div class="column" style="padding: 0">
                        <div class="ui statistic" style="padding-top: 10px">
                            <div class="label">
                                <span class="ui sub header text-paperviu-d7" style="font-size: 20px; font-weight: 500;">Disponible para cobrar</span>
                            </div>
                            <div v-show="!loadingCobro" class="value" style="padding: 20px">
                                <h1 class="ui header text-paperviu-63" style="font-weight: 500; font-size: 50px">
                                    {{totalCobro}}</h1>
                            </div>
                        </div>
                    </div>
                    <div v-show="!loadingCobro && totalCobro !== 0"
                         class="column text-paperviu-d7 paperviu-e4 border-left-paperviu-sky hover-text-paperviu-sky"
                         style="cursor: pointer; padding: 20px">
                        <button @click="realizarCobro" class="ui big compact button paperviu-d7 hover-paperviu-dark text-paperviu-e8">
                            <i class="paypal icon"></i>Cobrar
                        </button>
                    </div>
                    <div v-show="loadingCobro" class="row" style="padding: 50px; margin: 0">
                        <div class="ui active loader large"></div>
                    </div>
                </div>
                <div class="ui statistic border-top-paperviu-sky" style="padding-top: 10px; margin: 0">
                    <div class="label">
                        <span class="ui sub header text-paperviu-d7" style="font-size: 20px; font-weight: 500;">Cobros anteriores</span>
                    </div>
                </div>
                <div class="ui secondary pointing vertical fluid menu">
                    <template v-for="retiro in retiros">
                        <div
                                class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                                style="padding: 16px">
                            <h2 class="ui header" style="color: inherit; font-weight: 500">{{retiro.fecha}}</h2>
                            <h2 class="ui header" style="color: inherit; font-weight: 500">{{retiro.monto}}</h2>
                        </div>
                    </template>
                </div>
                <infinite-loading ref="infiniteLoading"
                                  style="padding: 30px"
                                  @infinite="infiniteHandler">
                    <div slot="no-more">
                        <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                class="search icon text-paperviu-sky"></i>No hay m&aacute;s cobros.
                        </div>
                    </div>
                    <div slot="no-results">
                        <div class="ui icon header text-paperviu-d7" style="opacity: 0.6"><i
                                class="search icon text-paperviu-sky"></i>No hay cobros que mostrar.
                        </div>
                    </div>
                </infinite-loading>
            </div>
            <div class="ui twelve wide column" style="margin: 0; padding: 0">
                <div class="row paperviu-e8" style="padding: 10px; margin: 0">
                    <h1 class="ui heder text-paperviu-d7"
                        style="margin-left: 20px; padding-left: 10px; font-weight: 500;">
                        Reproducciones desde el &uacute;ltmo retiro</h1>
                </div>
                <vue-chart
                        chart-type="ColumnChart"
                        style="width: 100%; min-height: 370px"
                        :columns="estadisticasContenidosEmpresa.columns"
                        :rows="estadisticasContenidosEmpresa.rows"
                        :options="estadisticasContenidosEmpresa.options"
                ></vue-chart>
            </div>
        </div>
        <div class="ui center aligned text container" style="padding: 20px">
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                loadingCobro: true,
                totalCobro: 0,
                retiros: [],
                pagina: 1,
                estadisticasContenidosEmpresa: {
                    columns: [{
                        'type': 'string',
                        'label': 'Contenido'
                    }, {
                        'type': 'number',
                        'label': 'Reproducciones'
                    }],
                    rows: [],
                    options: {
                        backgroundColor: '#f1f5f9',
                        height: 350,
                        chartArea: {top: 20, width: '100%', height: '100%', right: 30, bottom: 50, left: 70},
                        legend: {position: 'bottom'},
                    }
                },
            }
        },
        computed: {
            empresa() {
                return this.$store.state.empresa;
            },
            username() {
                return this.$store.state.username;
            },
            getEstadisticasCobrosEmpresaURL() {
                return this.$store.state.baseUrl + "reportes/estadisticas/pagos/" + this.empresa.nombre;
            },
            getTotalCobroURL() {
                return this.$store.state.baseUrl + "reportes/pagos/" + this.empresa.nombre;
            },
            getListadoCobrosURL() {
                return this.$store.state.baseUrl + "retiros?empresa=" + this.empresa.nombre + "&pagina=" + this.pagina;
            },
            realizarCobroURL() {
                return this.$store.state.baseUrl + "pagos?empresa=" + this.empresa.nombre;
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Retiros');
            document.title = 'Retiros';
            this.getTotalCobro();
            this.getEstadisticasCobrosEmpresa();
        },
        methods: {
            getEstadisticasCobrosEmpresa() {
                var _this = this;
                if (this.empresa.nombre !== '') {
                    $.get(this.getEstadisticasCobrosEmpresaURL, function (response) {
                        if (response !== undefined) {
                            _this.estadisticasContenidosEmpresa.rows = [];
                            $.each(response, function (index, contenido) {
                                var row = [];
                                row.push(contenido.titulo);
                                row.push(Number(contenido.reproducciones));
                                _this.estadisticasContenidosEmpresa.rows.push(row);
                            });
                        }
                    });
                }
            },
            getTotalCobro() {
                if (this.empresa.nombre !== '') {
                    var _this = this;
                    $.get(this.getTotalCobroURL, function (response) {
                        if (response !== undefined) {
                            _this.totalCobro = response;
                            _this.loadingCobro = false;
                        }
                    });
                }
            },
            realizarCobro() {
                if (this.empresa.nombre !== '') {
                    var _this = this;
                    $.ajax({
                        type: 'PUT',
                        url: _this.realizarCobroURL,
                        success: function (response) {
                            if (response === 1 || response === "1") _this.mostrarExito("Retiro efectuado con exito!");
                            else if (response === -2 || response === "-2") _this.mostrarError("La empresa no tiene asociado un email de cuenta de PayPal. Puede realizar esto en Perfil");
                            else if (respose === -3 || response === "-3") _this.mostrarAlerta("No hay saldo que retirar");
                            else if (response === -4 || response === "-4") _this.mostrarError("No se pudo efectuar el pago. Por favor vuelve a intentar...");
                            else _this.mostrarError("Error al efectuar el pago");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo enviar la solicitud. Por favor vuelve a intentar...");
                        }
                    });
                }
            },
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.getListadoCobrosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var retiros = [];
                                $.each(response, function (index, retiro) {
                                    var fecha = new Date(retiro.fecha);
                                    retiros.push({
                                        fecha: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear() + "  " + fecha.getHours() + ":" + fecha.getMinutes(),
                                        monto: retiro.monto
                                    });
                                });
                                _this.retiros = _this.retiros.concat(retiros);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    }).fail(function () {
                        _this.infiniteHandler($state);
                    });
                }, 1000);
            },
            mostrarAlerta(mensaje) {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>" + mensaje + "</h3>", noty.warning);
            },
            mostrarExito(mensaje) {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i> " + mensaje + "</h3>", noty.success);
            },
            mostrarError(mensaje) {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i> " + mensaje + "</h3>", noty.error);
            },
            mostrarInfo(mensaje) {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i> " + mensaje + "</h3>", noty.info);
            },
        },
        components: {
            InfiniteLoading
        }
    }
</script>