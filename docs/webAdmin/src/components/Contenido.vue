<template>
    <div>
        <div id="menu2" class="ui secondary pointing large menu inverted border-bottom-paperviu-sky"
             style="border-left-style: none; border-right-style: none;margin: 0; background-color: #3e444a">
            <div class="ui container">
                <a :class="{active: mostrarFiltros}" class="ui item" @click="mostrarFiltros = !mostrarFiltros"
                   style="margin-bottom: -7px; border-bottom-width: 4px">
                    <i class="filter large icon"></i>Filtrar
                </a>
                <div class="ui active border-bottom-paperviu-sky paperviu-d7 item">
                    <div class="ui transparent icon input inverted large" style="padding: 5px">
                        <i @click="cargarContenidos" class="search link icon"></i>
                        <input style="height: 30px" v-model="filtro"
                               @keyup.enter="cargarContenidos()"
                               placeholder="Buscar contenidos..." type="text">
                    </div>
                </div>
            </div>
        </div>
        <div class="ui stackable two column grid" style="margin: 0">
            <div v-show="mostrarFiltros" class="four wide column"
                 style="padding-right: 0px; background-color: #e5ecf3">
                <div class="ui secondary pointing vertical fluid menu">
                    <div class="ui accordion" style="margin: 0px">
                        <h2 class="active title header text-paperviu-dark large" style="margin: 0">
                            <i class="dropdown icon"></i>Empresas
                        </h2>
                        <div class="active content" style="padding: 0">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                    style="padding: 10px; font-weight: 300; margin-left: 10px"
                                    v-for="empresa in getEmpresas"
                                    :class="{'active text-paperviu-sky border-right-paperviu-sky': empresaFiltro === empresa}"
                                    @click="empresaFiltro = empresa; cargarContenidos();"
                                >{{ empresa }}</h4>
                            </div>
                        </div>
                        <h2 class="active title header text-paperviu-dark large" style="margin: 0px">
                            <i class="dropdown icon"></i>Tipos
                        </h2>
                        <div class="content">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                    style="padding: 10px"
                                    v-for="tipo in tiposList"
                                    :class="{'active text-paperviu-sky border-right-paperviu-sky': tipoFiltro === tipo.nombre}"
                                    @click="tipoFiltro = tipo.nombre; cargarContenidos();"
                                >{{ tipo.nombre }}</h4>
                            </div>
                        </div>
                        <h2 class="active title header text-paperviu-dark large" style="margin: 0px">
                            <i class="dropdown icon"></i>Categorias
                        </h2>
                        <div class="content">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                    style="padding: 10px"
                                    v-for="cat in categoriasList"
                                    :class="{'active text-paperviu-sky': categoriaFiltro === cat.nombre}"
                                    @click="categoriaFiltro = cat.nombre; cargarContenidos();"
                                >{{ cat.nombre }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding-left: 30px; padding-right: 30px"
                 :class="{'sixteen wide column': !mostrarFiltros, 'twelve wide column': mostrarFiltros}">
                <div class="ui secondary menu">
                    <div class="ui tag icon small labels">
                        <div v-show="tipoFiltro !== ''" class="ui label paperviu-sky"
                             style="background-color: #f1f5f9">
                            <i @click="tipoFiltro = ''; cargarContenidos();"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ tipoFiltro }}</span>
                        </div>
                        <div v-show="categoriaFiltro !== ''" class="ui paperviu-sky label">
                            <i @click="categoriaFiltro = ''; cargarContenidos();"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ categoriaFiltro }}</span>
                        </div>
                        <div v-show="empresaFiltro !== ''" class="ui paperviu-sky label">
                            <i @click="empresaFiltro = ''; cargarContenidos();"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ empresaFiltro }}</span>
                        </div>
                    </div>
                </div>
                <div class="ui stackable two column grid container">
                    <paperviu-contenido-item
                            v-for="(contenido, index) in contenidosList"
                            :key="index"
                            :id="contenido.id"
                            :titulo="contenido.titulo"
                            :empresa="contenido.empresa"
                            :tipo="contenido.tipo"
                            :valoracion="contenido.valoracion"
                            :imagen="contenido.imagen"
                            :fecha="contenido.fecha"
                            :estado="contenido.estado"
                            :estadoAdmin="contenido.estadoAdmin"
                    ></paperviu-contenido-item>
                </div>
                <infinite-loading ref="infiniteLoading"
                                  style="padding: 50px"
                                  @infinite="infiniteHandler">
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
        </div>
    </div>
</template>
<script>
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                filtro: '',
                tipoFiltro: '',
                categoriaFiltro: '',
                empresaFiltro: '',
                mostrarFiltros: false,
                pagina: 1,
                contenidoIdActual: '',
                contenidoEstadoActual: ''
            }
        },
        computed: {
            cargarContenidosURL() {
                return this.$store.state.baseUrl + "contenidos?contenido=" + this.filtro + "&tipo=" + this.tipoFiltro + "&categoria=" + this.categoriaFiltro + "&pagina=" + this.pagina + "&empresa=" + this.empresaFiltro + "&empresaLike=true";
            },
            getCategoriasURL() {
                return this.$store.state.baseUrl + "categorias";
            },
            cargarTiposURL() {
                return this.$store.state.baseUrl + "tipos/all";
            },
            contenidosList() {
                return this.$store.state.contenidosList;
            },
            tiposList() {
                return this.$store.state.tiposList;
            },
            categoriasList() {
                return this.$store.state.categoriasList;
            },
            cambiarEstadoURL() {
                return this.$store.state.baseUrl + "contenidos/estadoAdmin?id=" + this.contenidoIdActual + "&estadoAdmin=" + this.contenidoEstadoActual;
            },
            getEmpresas() {
                return this.$store.state.empresas;
            },
            getEmpresasURL() {
                return this.$store.state.baseUrl + "empresas/all";
            },
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Contenidos');
            document.title = 'Contenidos';
            $('.ui.accordion').accordion();
            if (this.categoriasList.length === 0) this.cargarCategorias();
            if (this.getEmpresas.length === 0) this.listarEmpresas();
            if (this.tiposList.length === 0) this.cargarTipos();
            this.$store.commit('setContenidosList', []);
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.cargarContenidosURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var contenidos = [];
                                $.each(response, function (index, dt) {
                                    contenidos.push({
                                        id: dt.contenido.id,
                                        estado: dt.contenido.estado,
                                        estadoAdmin: dt.contenido.estadoAdmin,
                                        fecha: dt.contenido.fecha,
                                        tipo: dt.contenido.tipo.nombre,
                                        titulo: dt.contenido.titulo,
                                        empresa: dt.empresa,
                                        valoracion: dt.valoracion,
                                        imagen: dt.contenido.portada
                                    });
                                });
                                _this.$store.state.contenidosList = _this.$store.state.contenidosList.concat(contenidos);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            cargarContenidos() {
                this.pagina = 1;
                this.$store.commit('setContenidosList', []);
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            cargarCategorias() {
                var _this = this;
                $.ajax({
                    url: _this.getCategoriasURL,
                    type: 'GET',
                    success: function (response) {
                        if (response !== undefined) {
                            var categorias = [];
                            $.each(response, function (index, categoria) {
                                categorias.push({
                                    nombre: categoria.nombre,
                                    descripcion: categoria.descripcion
                                });
                            });
                            _this.$store.commit('setCategorias', categorias);
                        }
                    }
                });
            },
            cargarTipos() {
                var _this = this;
                $.get(_this.cargarTiposURL, function (res) {
                    var tipos = [];
                    $.each(res, function (index, tipo) {
                        tipos.push({
                            nombre: tipo.nombre,
                            link: tipo.descripcion
                        });
                    });
                    _this.$store.commit('setTiposList', tipos);
                });
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
            cambiarEstado(id, estado) {
                this.contenidoIdActual = id;
                this.contenidoEstadoActual = estado;
                var _this = this;
                $.ajax({
                        url: _this.cambiarEstadoURL,
                        type: 'PUT',
                        success: function (response) {
                            if (response !== undefined) {
                            }
                        }
                    }
                );
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>