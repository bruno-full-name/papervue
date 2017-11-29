<template>
    <div>
        <div id="contenidos" class="ui stackable grid">
            <div v-show="mostrarFiltros" class="three wide column"
                 style="padding-right: 0; padding-top: 20px; padding-left: 30px; background-color: #3e444a">
                <div class="ui secondary pointing vertical fluid large menu">
                    <a class="ui title item"
                       @click="destacadoFiltro = false; payperviewFiltro = false; listarContenidos(1)"
                       :class="{'active text-paperviu-sky border-top-paperviu-sky': !destacadoFiltro && !payperviewFiltro, 'hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky': destacadoFiltro || payperviewFiltro}">Todos</a>
                    <a class="ui title item" @click="destacadoFiltro = !destacadoFiltro; listarContenidos(1)"
                       :class="{'active text-paperviu-sky border-top-paperviu-sky': destacadoFiltro, 'hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky': !destacadoFiltro}">Destacados</a>
                    <a class="ui title item" @click="payperviewFiltro = !payperviewFiltro; listarContenidos(1)"
                       :class="{'active text-paperviu-sky border-top-paperviu-sky': payperviewFiltro, 'hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky': !payperviewFiltro}">Pay Per View</a>
                    <div class="ui accordion" style="margin: 0">
                        <h2 class="active title header text-paperviu-sky large" style="margin: 0">
                            <i class="dropdown icon"></i>Empresas
                        </h2>
                        <div class="active content" style="padding: 0">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky"
                                    style="padding: 10px; font-weight: 600; margin-left: 10px"
                                    v-for="empresa in getEmpresas"
                                    :class="{'active text-paperviu-sky': empresaFiltro === empresa}"
                                    @click="listarConEmpresa(empresa)"
                                >{{ empresa }}</h4>
                            </div>
                        </div>
                        <h2 class="active title header text-paperviu-sky large" style="margin: 0">
                            <i class="dropdown icon"></i>Tipos
                        </h2>
                        <div class="content">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky"
                                    style="padding: 10px; font-weight: 600; margin-left: 10px"
                                    v-for="tipo in getTipos"
                                    :class="{'active text-paperviu-sky': tipoFiltro === tipo.nombre}"
                                    @click="listarConTipo(tipo.nombre)"
                                >{{ tipo.nombre }}</h4>
                            </div>
                        </div>
                        <h2 class="active title header text-paperviu-sky large" style="margin: 0">
                            <i class="dropdown icon"></i>Categorias
                        </h2>
                        <div class="content">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-e8 hover-text-paperviu-sky"
                                    style="padding: 10px; font-weight: 600; margin-left: 10px"
                                    v-for="cat in getCategorias"
                                    :class="{'active text-paperviu-sky': categoriaFiltro === cat.nombre}"
                                    @click="listarConCategoria(cat.nombre)"
                                >{{ cat.nombre }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="{'thirteen wide column': mostrarFiltros, 'sixteen wide column': !mostrarFiltros}"
                 style="padding-left: 0">
                <div class="ui row" style="background-color: #3e444a">
                    <div class="ui center aligned text container" style="padding-top: 16px;">
                        <div class="ui fluid icon left icon inverted transparent input paperviu-dark border-bottom-paperviu-sky"
                             style="padding: 7px; margin-top: -16px;">
                            <i @click="listarContenidos(1)" class="search link icon" style="margin-left: 10px"></i>
                            <input style="height: 30px" v-model="filtro" @keyup.enter="listarContenidos(1)" type="text"
                                   placeholder="Buscar contenidos...">
                        </div>
                        <div class="ui secondary pointing inverted menu" style="border: 0; margin: 5px">
                            <a @click="mostrarFiltros = !mostrarFiltros"
                               :class="{'active border-bottom-paperviu-sky': mostrarFiltros}"
                               class="ui item">
                                <i :class="{'text-paperviu-sky': mostrarFiltros}"
                                   class="filter icon"></i>{{ mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros' }}
                            </a>
                            <div class="right menu">
                                <div class="ui item" style="padding: 0">
                                    <div class="ui tag icon tiny labels">
                                        <div v-show="tipoFiltro !== ''" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="listarConTipo('')"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">{{ tipoFiltro }}</span>
                                        </div>
                                        <div v-show="categoriaFiltro !== ''" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="listarConCategoria('')"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">{{ categoriaFiltro }}</span>
                                        </div>
                                        <div v-show="empresaFiltro !== ''" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="listarConEmpresa('')"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">{{ empresaFiltro }}</span>
                                        </div>
                                        <div v-show="destacadoFiltro" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="listarConDestacado(false)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">Destacados</span>
                                        </div>
                                        <div v-show="payperviewFiltro" class="ui label"
                                             style="background-color: #f1f5f9">
                                            <i @click="listarConPayPerView(false)"
                                               class="remove link text-paperviu-sky large icon"
                                               style="margin-right: 5px; background-color: #f1f5f9"></i>
                                            <span class="ui detail header text-paperviu-dark"
                                                  style="margin: 0">Pay-Per-View</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="ui stackable two column grid container" style="padding: 20px">
                    <paperviu-contenido-item
                            v-for="(contenido, index) in getContenidos"
                            :key="index"
                            :id="contenido.id"
                            :titulo="contenido.titulo"
                            :empresa="contenido.empresa"
                            :tipo="contenido.tipo"
                            :valoracion="contenido.valoracion"
                            :imagen="contenido.imagen"
                            @valorandoContenido="mostrarValorandoContenido"
                            @contenidoValorado="getPromedioValoraciones(contenido.id)"
                            @errorValorarContenido="mostrarErrorValorarContenido"
                            @favoritoAgregado="mostrarFavoritoAgregado"
                            @agregandoFavorito="mostrarAgregandoFavorito"
                            @errorAgregarFavorito="mostrarErrorAgregarFavorito"
                            @favoritoEliminado="mostrarFavoritoEliminado"
                            @eliminandoFavorito="mostrarEliminandoFavorito"
                            @errorEliminarFavorito="mostrarErrorEliminarFavorito"
                    ></paperviu-contenido-item>
                </div>
                <infinite-loading ref="infiniteLoading"
                                  style="padding: 50px"
                                  @infinite="infiniteHandler">
                    <div slot="no-more">
                        <div class="ui center aligned text container">
                            <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay m&aacute;s resultados.
                            </div>
                        </div>
                    </div>
                    <div slot="no-results">
                        <div class="ui center aligned text container">
                            <div class="ui icon header text-paperviu-e8" style="opacity: 0.6"><i
                                    class="search icon text-paperviu-sky"></i>No hay resultados que mostrar.
                            </div>
                        </div>
                    </div>
                </infinite-loading>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        props: {
            search: {
                type: String,
                default: ''
            },
            tipoSearch: {
                type: String,
                default: ''
            },
            categoriaSearch: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                filtro: '',
                tipoFiltro: '',
                categoriaFiltro: '',
                empresaFiltro: '',
                destacadoFiltro: false,
                payperviewFiltro: false,
                pagina: 1,
                mostrarFiltros: false
            }
        },
        computed: {
            getContenidos() {
                return this.$store.state.contenidosList;
            },
            getContenidosURL() {
                return this.$store.state.baseUrl + "contenidos/webcliente?contenido=" + this.filtro + "&tipo=" + this.tipoFiltro + "&categoria=" + this.categoriaFiltro + "&pagina=" + this.pagina + "&empresa=" + this.empresaFiltro + "&destacado=" + this.destacadoFiltro + "&payperview=" + this.payperviewFiltro;
            },
            getTipos() {
                return this.$store.state.tiposList;
            },
            getCategorias() {
                return this.$store.state.categoriasList;
            },
            getEmpresas() {
                return this.$store.state.empresasList;
            },
            getEmpresasURL() {
                return this.$store.state.baseUrl + "empresas/all";
            },
            getPromedioValoracionesURL() {
                return this.$store.state.baseUrl + "valoraciones/prom/";
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Explorar');
            document.title = 'Explorar';
            if (this.getContenidos.length > 0) this.$store.commit('setContenidos', []);
            this.filtro = this.search;
            this.tipoFiltro = this.tipoSearch;
            this.categoriaFiltro = this.categoriaSearch;
            if (this.getEmpresas.length === 0) this.listarEmpresas();
            $('.ui.accordion').accordion();
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(this.getContenidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var contenidos = [];
                                $.each(response, function (index, contenido) {
                                    contenidos.push({
                                        id: contenido.id,
                                        tipo: contenido.tipo,
                                        titulo: contenido.titulo,
                                        imagen: contenido.imagen,
                                        fecha: contenido.fecha,
                                        empresa: contenido.empresa,
                                        valoracion: contenido.valoracion
                                    });
                                });
                                _this.$store.state.contenidosList = _this.$store.state.contenidosList.concat(contenidos);
                                $state.loaded();
                                _this.pagina += 1;
                            } else {
                                $state.complete();
                            }
                        }
                    });
                }, 1000);
            },
            listarContenidos(pagina) {
                if (pagina !== undefined) {
                    this.pagina = pagina;
                }
                this.$store.commit('setContenidos', []);
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            listarEmpresas() {
                var _this = this;
                $.get(this.getEmpresasURL, function (response) {
                    if (response !== undefined) {
                        var empresas = [];
                        $.each(response, function (index, empresa) {
                            empresas.push(empresa.nombre);
                        });
                        _this.$store.commit('setEmpresas', empresas);
                    }
                });
            },
            getPromedioValoraciones(idContenido) {
                this.mostrarContenidoValorado();
                var _this = this;
                $.get(this.getPromedioValoracionesURL + idContenido, function (response) {
                    if (response !== undefined) {
                        _this.contenidoActual(idContenido).valoracion = response;
                        if (_this.$store.state.contenidoActual.id === idContenido) _this.$store.state.contenidoActual.valoracion = response;
                    }
                });
            },
            listarConTipo(tipo) {
                if (tipo !== undefined) {
                    this.tipoFiltro = tipo;
                    this.listarContenidos(1);
                }
            },
            listarConCategoria(categoria) {
                if (categoria !== undefined) {
                    this.categoriaFiltro = categoria;
                    this.listarContenidos(1);
                }
            },
            listarConEmpresa(empresa) {
                if (empresa !== undefined) {
                    this.empresaFiltro = empresa;
                    this.listarContenidos(1);
                }
            },
            listarConDestacado(destacado) {
                this.destacadoFiltro = destacado;
                this.listarContenidos(1);
            },
            listarConPayPerView(payperview) {
                this.payperviewFiltro = payperview;
                this.listarContenidos(1);
            },
            mostrarContenidoValorado() {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Contenido valorado!</h3>", noty.success);
            },
            mostrarValorandoContenido() {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Valorando contenido...</h3>", noty.info);
            },
            mostrarErrorValorarContenido() {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido valorar el contenido...</h3>", noty.error);
            },
            mostrarFavoritoAgregado() {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Contenido agregado a favoritos!</h3>", noty.success);
            },
            mostrarAgregandoFavorito() {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Agregando contenido a favoritos...</h3>", noty.info);
            },
            mostrarErrorAgregarFavorito() {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido agregar el favorito.</h3>", noty.error);
            },
            mostrarFavoritoEliminado() {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Contenido eliminado de favoritos!</h3>", noty.success);
            },
            mostrarEliminandoFavorito() {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Eliminando contenido de favoritos...</h3>", noty.info);
            },
            mostrarErrorEliminarFavorito() {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se ha podido eliminar el favorito.</h3>", noty.error);
            },
            contenidoActual(id) {
                return this.getContenidos.find(c => c.id == id);
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>
<style>
    .list-item {
        display: block;
        margin-right: 10px;
    }

    .list-enter-active, .list-leave-active {
        transition: all 0.3s;
    }

    .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */
    {
        opacity: 0;
        transform: translateY(30px);
    }
</style>