<template>
    <div class="paperviu-dark">
        <div class="ui basic segment secondary" id="menu2" style="padding: 1px; margin: 0; background-color: #3e444a">
            <div class="ui container">
                <h3 class="ui header inverted"
                    style="margin-bottom: 0; margin-top: 3px; margin-left: 16px; padding: 5px"><i
                        class="payment icon text-paperviu-sky"></i>Suscripciones</h3>
            </div>
        </div>
        <div v-show="!suscripto" class="ui container">
            <div class="ui row border-left-paperviu-sky paperviu-d7" style="margin-top: 30px">
                <h1 class="ui left ribbon label big inverted paperviu-sky"
                    style="margin-left: 13px; margin-top: 10px">
                    <i class="add to cart icon"></i>Suscribirse a Papervue
                </h1>
                <div class="ui center aligned text container" style="padding: 40px">
                    <h1 class="ui sub header huge inverted" style="padding: 20px">
                        selecciona el tipo de suscripci&oacute;n</h1>
                    <div class="ui center aligned stackable three column grid" style="margin: 0">
                        <div @click="monto = 5; opcion = 'Semanal';"
                             :class="{'paperviu-dark border-bottom-paperviu-sky': opcion === 'Semanal'}"
                             class="column hover-paperviu-dark" style="padding: 30px; cursor:pointer;">
                            <div class="ui large statistic">
                                <div class="ui sub header text-paperviu-e4" style="margin: 0">
                                    USD
                                </div>
                                <div class="ui header value text-paperviu-sky" style="margin: 0">5
                                </div>
                                <div class="ui header text-paperviu-e4" style="margin: 0">
                                    Semanal
                                </div>
                            </div>
                        </div>
                        <div @click="monto = 10; opcion = 'Mensual';"
                             :class="{'paperviu-dark border-bottom-paperviu-sky': opcion === 'Mensual'}"
                             class="column hover-paperviu-dark" style="padding: 30px; cursor:pointer;">
                            <div class="ui large statistic">
                                <div class="ui sub header text-paperviu-e4" style="margin: 0">
                                    USD
                                </div>
                                <div class="ui header value text-paperviu-sky" style="margin: 0">10
                                </div>
                                <div class="ui header text-paperviu-e4" style="margin: 0">Mensual</div>
                            </div>
                        </div>
                        <div @click="monto = 100; opcion = 'Anual';"
                             :class="{'paperviu-dark border-bottom-paperviu-sky': opcion === 'Anual'}"
                             class="column hover-paperviu-dark" style="padding: 30px; cursor:pointer;">
                            <div class="ui large statistic">
                                <div class="ui sub header text-paperviu-e4" style="margin: 0">
                                    USD
                                </div>
                                <div class="ui header value text-paperviu-sky" style="margin: 0">100
                                </div>
                                <div class="ui header text-paperviu-e4" style="margin: 0">Anual</div>
                            </div>
                        </div>
                    </div>
                    <div v-show="selec" class="row" style="padding-top: 40px">
                        <div id="btnPaypal"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="suscripto && suscripcion.tipo !== ''" class="ui container" style="padding: 10px">
            <div class="ui row border-left-paperviu-sky paperviu-d7" style="margin-top: 30px">
                <h1 class="ui left ribbon label big inverted paperviu-sky"
                    style="margin-left: 13px; margin-top: 10px">
                    <i class="payment icon"></i>Suscripci&oacute;n Actual</h1>
                <div class="row" style="padding: 30px">
                    <h3 class="ui header text-paperviu-e4"><i
                            class="checkmark icon text-paperviu-sky"></i>{{suscripcion.tipo}}</h3>
                    <h3 class="ui header text-paperviu-e4"><i
                            class="calendar icon text-paperviu-sky"></i>{{suscripcion.diasRestantes > 1 ? suscripcion.diasRestantes + ' dias restantes.' : suscripcion.diasRestantes + 'dia restante'}}
                    </h3>
                    <div class="ui secondary menu">
                        <div class="ui item">
                            <h3 class="ui header text-paperviu-e4" style="margin: 0">
                                <span class="text-paperviu-sky">Inicio</span><br>{{suscripcion.fechaInicio}}</h3>
                        </div>
                        <div class="right menu">
                            <div class="ui item">
                                <h3 class="ui header text-paperviu-e4" style="margin: 0">
                                    <span class="text-paperviu-sky">Fin</span><br>{{suscripcion.fechaFin}}</h3>
                            </div>
                        </div>
                    </div>
                    <div class="ui inverted green indicating progress">
                        <div class="bar">
                            <div class="progress"></div>
                        </div>
                        <div class="label text-paperviu-e8">Progreso de la suscripci&oacute;n actual</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="ui stackable two column grid container" style="padding-bottom: 50px">
            <div class="column" style="padding: 20px">
                <div class="ui row border-left-paperviu-sky paperviu-d7" style="margin-top: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="margin-left: 13px; margin-top: 10px">
                        <i class="cart icon"></i>Contenidos pagados</h1>
                    <div class="row" style="padding: 30px">
                        <template v-for="pago in pagos">
                            <div class="row paperviu-e4 border-left-paperviu-sky"
                                 style="padding: 5px; margin-bottom: 10px">
                                <h2 @click="$router.push('reproducir?cont=' + pago.idContenido)"
                                    class="ui header text-paperviu-d7 hover-text-paperviu-sky"
                                    style="margin: 0; padding: 3px;cursor: pointer;">
                                    {{pago.titulo}}
                                </h2>
                                <h3 class="ui header text-paperviu-dark"
                                    style="margin: 0; font-weight: 500; padding: 3px">
                                    <i class="calendar icon" style="font-size: 19px; margin-top: -7px"></i>{{pago.fecha}}
                                </h3>
                                <h3 class="ui header text-paperviu-dark"
                                    style="margin: 0; font-weight: 500; padding: 3px">
                                    <i class="dollar icon" style="font-size: 19px; margin-top: -7px"></i>{{pago.precio}}
                                </h3>
                            </div>
                        </template>
                        <infinite-loading ref="infiniteLoadingPagos"
                                          style="padding: 10px"
                                          @infinite="listarPagos">
                            <div slot="no-more">
                                <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                        class="search icon text-paperviu-sky"></i>No hay m&aacute;s resultados.
                                </div>
                            </div>
                            <div slot="no-results">
                                <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                        class="search icon text-paperviu-sky"></i>No hay resultados que mostrar.
                                </div>
                            </div>
                        </infinite-loading>
                    </div>
                </div>
            </div>
            <div class="column" style="padding: 20px">
                <div class="ui row border-left-paperviu-sky paperviu-d7" style="margin-top: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="margin-left: 13px; margin-top: 10px">
                        <i class="history icon"></i>Historial de suscripciones</h1>
                    <div class="row" style="padding: 30px">
                        <template v-for="suscripcion in suscripciones">
                            <div class="row paperviu-e4 border-left-paperviu-sky"
                                 style="padding: 10px; margin-bottom: 10px">
                                <div class="row">
                                    <div class="ui header text-paperviu-sky large"
                                         style="margin: 0">
                                        {{suscripcion.tipo}}
                                    </div>
                                </div>
                                <h3 class="ui header text-paperviu-dark" style="margin: 0; font-weight: 500;">
                                    {{suscripcion.fechaInicio}}
                                    <span><i class="right angle icon"></i>{{suscripcion.fechaFin}}</span><br>
                                </h3>
                            </div>
                        </template>
                        <infinite-loading ref="infiniteLoadingSuscripciones"
                                          style="padding: 10px"
                                          @infinite="listarSuscripciones">
                            <div slot="no-more">
                                <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                        class="search icon text-paperviu-sky"></i>No hay m&aacute;s resultados.
                                </div>
                            </div>
                            <div slot="no-results">
                                <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                        class="search icon text-paperviu-sky"></i>No hay resultados que mostrar.
                                </div>
                            </div>
                        </infinite-loading>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                monto: 0,
                opcion: '',
                selec: false,
                tokenPago: '',
                payerIdPago: '',
                paymentIdPago: '',
                paginaSuscripciones: 1,
                paginaPagos: 1,
                suscripciones: [],
                pagos: [],
                suscripcion: {
                    tipo: '',
                    fechaInicio: '',
                    fechaFin: '',
                    porcentaje: 0,
                    diasRestantes: 0
                }
            }
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            suscripto() {
                return this.$store.state.suscripto;
            },
            agregarSuscripcionURL() {
                return this.$store.state.baseUrl + "suscripciones?username=" + this.usuario.username + "&tipo=" + this.opcion + "&token=" + this.tokenPago + "&payerId=" + this.payerIdPago + "&paymentId=" + this.paymentIdPago;
            },
            listarSuscripcionesURL() {
                return this.$store.state.baseUrl + "suscripciones/all?username=" + this.usuario.username + "&pagina=" + this.paginaSuscripciones;
            },
            getSuscripcionActualURL() {
                return this.$store.state.baseUrl + "suscripciones/actual/" + this.usuario.username;
            },
            listarPagosURL() {
                return this.$store.state.baseUrl + "pagos/user?username=" + this.usuario.username + "&pagina=" + this.paginaPagos;
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Suscripciones');
            document.title = 'Suscripciones';
            this.cargarPayPal();
            this.getSuscripcionActual();
            this.suscripciones = [];
            this.pagos = [];
            this.$refs.infiniteLoadingSuscripciones.$emit('$InfiniteLoading:reset');
            this.$refs.infiniteLoadingPagos.$emit('$InfiniteLoading:reset');
        },
        methods: {
            listarSuscripciones($state) {
                if (this.usuario.username !== '') {
                    var _this = this;
                    setTimeout(() => {
                        $.get(this.listarSuscripcionesURL, function (response) {
                            if (response !== undefined) {
                                if (response.length >= 1) {
                                    var suscripciones = [];
                                    $.each(response, function (index, suscripcion) {
                                        var inicio = new Date(suscripcion.fechaInicio);
                                        var fin = new Date(suscripcion.fechaFin);
                                        suscripciones.push({
                                            fechaInicio: inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear(),
                                            fechaFin: fin.getDate() + "/" + (fin.getMonth() + 1) + "/" + fin.getFullYear(),
                                            tipo: suscripcion.tipo
                                        });
                                    });
                                    _this.suscripciones = _this.suscripciones.concat(suscripciones);
                                    $state.loaded();
                                    _this.paginaSuscripciones += 1;
                                } else $state.complete();
                            } else $state.complete();
                        });
                    }, 800);
                }
            },
            listarPagos($state) {
                if (this.usuario.username !== '') {
                    var _this = this;
                    setTimeout(() => {
                        $.get(this.listarPagosURL, function (response) {
                            if (response !== undefined) {
                                if (response.length >= 1) {
                                    var pagos = [];
                                    $.each(response, function (index, pago) {
                                        pagos.push({
                                            idContenido: pago.idCont,
                                            titulo: pago.titulo,
                                            fecha: pago.fechaPago,
                                            precio: pago.precio
                                        });
                                    });
                                    _this.pagos = _this.pagos.concat(pagos);
                                    $state.loaded();
                                    _this.paginaPagos += 1;
                                } else $state.complete();
                            } else $state.complete();
                        });
                    }, 800);
                }
            },
            getSuscripcionActual() {
                if (this.usuario.username !== '' && this.suscripto) {
                    var _this = this;
                    $.get(this.getSuscripcionActualURL, function (suscripcion) {
                        if (suscripcion !== undefined) {
                            var inicio = new Date(suscripcion.fechaInicio);
                            var fin = new Date(suscripcion.fechaFin);
                            _this.suscripcion.fechaInicio = inicio.getDate() + "/" + (inicio.getMonth() + 1) + "/" + inicio.getFullYear();
                            _this.suscripcion.fechaFin = fin.getDate() + "/" + (fin.getMonth() + 1) + "/" + fin.getFullYear();
                            _this.suscripcion.tipo = suscripcion.tipo;
                            _this.suscripcion.diasRestantes = Number(suscripcion.diasRestantes);
                            _this.suscripcion.porcentaje = Number(suscripcion.porcentajeTranscurrido);
                            $('.ui.progress').progress({
                                percent: Number(suscripcion.porcentajeTranscurrido)
                            });
                        }
                    });
                }
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
            mostrarAlerta(mensaje) {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>" + mensaje + "</h3>", noty.warning);
            },
            cargarPayPal() {
                if (this.usuario.username !== '') {
                    var _this = this;
                    paypal.Button.render({
                        env: 'sandbox',
                        client: {
                            sandbox: 'AWL0KlWCTKdUorF0R4d_BD5yQXK42R_q953m3oC4-pH3NX6OylxBDzqfQneksBK_pTmaqbFo_hhtH_69'
                        },
                        commit: true,
                        payment: function (data, actions) {
                            return actions.payment.create({
                                payment: {transactions: [{amount: {total: _this.monto, currency: 'USD'}}]}
                            });
                        },
                        onAuthorize: function (data, actions) {
                            return actions.payment.execute().then(function () {
                                _this.tokenPago = data.paymentToken;
                                _this.payerIdPago = data.payerID;
                                _this.paymentIdPago = data.paymentID;
                                $.post(_this.agregarSuscripcionURL, function (resp) {
                                    if (resp !== undefined && resp === true) {
                                        _this.mostrarExito("Suscripcion " + _this.opcion + " creada!");
                                        _this.$store.commit('setSuscripto', true);
                                        _this.getSuscripcionActual();
                                        _this.suscripciones = [];
                                        _this.$refs.infiniteLoadingSuscripciones.$emit('$InfiniteLoading:reset');
                                    } else _this.mostrarError("No se pudo crear la suscripcion");
                                }).fail(function () {
                                    _this.mostrarError("No se pudo crear la suscripcion");
                                });
                            });
                        }
                    }, '#btnPaypal');
                }
            }
        },
        watch: {
            opcion(newValue, oldValue) {
                if (newValue !== '') this.selec = true;
                else this.selec = false;
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>