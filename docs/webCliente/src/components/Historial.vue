<template>
    <div>
        <div class="ui text container" style="padding: 30px">
            <div class="ui row border-left-paperviu-sky paperviu-d7">
                <div class="row" style="padding: 30px">
                    <h1 class="ui left ribbon label big inverted paperviu-sky"
                        style="width: auto;margin-left: -15px">
                        <i class="history icon"></i>Historial de Reproducci&oacute;n</h1>
                </div>
                <div class="ui basic segment" style="margin: 0; padding-top: 0">
                    <div class="ui relaxed link items" style="padding: 16px">
                        <template v-for="rep in getReproducciones">
                            <div class="ui item" style="background-color: #e2eaf2; padding: 12px">
                                <div class="content">
                                    <div class="ui secondary menu">
                                        <div class="ui item">
                                            <a class="ui header text-paperviu-dark large"
                                               style="margin: 0">{{ rep.titulo
                                                }}</a>
                                        </div>
                                        <div class="ui item right" style="margin: 0">
                                            <button :id="rep.idRep"
                                                    @click="cambiarEstadoRep(rep.idRep)"
                                                    class="ui circular paperviu-d7 hover-paperviu-dark text-paperviu-e8 icon button">
                                                <i class="trash icon"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div class="meta">
                                    <span class="ui header text-paperviu-dark" style="font-weight: 500"><i
                                            class="calendar text-paperviu-sky icon"
                                            style="margin-right: 10px"></i>{{rep.fecha}}</span>
                                    </div>
                                    <div class="meta">
                                    <span class="ui header text-paperviu-dark" style="font-weight: 500"><i
                                            class="clock text-paperviu-sky icon" style="margin-right: 10px"></i>Dejado a los: {{ rep.tiempo
                                        }}s.</span>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>
                    <infinite-loading ref="infiniteLoading"
                                      style="padding: 20px"
                                      @infinite="listarReproducciones">
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
</template>
<script>
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                pagina: 1,
                repActual: ''
            }
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            getReproducciones() {
                return this.$store.state.reproducciones;
            },
            listarReproduccionesURL() {
                return this.$store.state.baseUrl + "reproducciones?username=" + this.usuario.username + "&pagina=" + this.pagina;
            },
            cambiarEstadoRepURL() {
                return this.$store.state.baseUrl + "reproducciones?idRep=" + this.repActual;
            }
        },
        mounted() {
            if (this.$store.state.vistaActual !== "Historial") this.$store.commit('setVistaActual', 'Historial');
            this.$store.commit('setReproducciones', []);
        },
        methods: {
            listarReproducciones($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarReproduccionesURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var reproducciones = [];
                                $.each(response, function (index, rep) {
                                    var fecha = new Date(rep.fechaHora);
                                    reproducciones.push({
                                        idRep: rep.id,
                                        idVideo: rep.idVideo,
                                        idContenido: rep.idContenido,
                                        tiempo: rep.minuto,
                                        titulo: rep.titulo,
                                        fecha: fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear() + " " + fecha.getHours() + ":" + fecha.getMinutes()
                                    });
                                });
                                _this.$store.state.reproducciones = _this.$store.state.reproducciones.concat(reproducciones);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } $state.complete();
                    });
                }, 1000);
            },
            cambiarEstadoRep(idRep) {
                this.repActual = idRep;
                var _this = this;
                $.ajax({
                    url: _this.cambiarEstadoRepURL,
                    type: 'PUT',
                    success: function (data) {
                        _this.$store.commit('quitarReproduccion', idRep);
                    }
                });

            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>