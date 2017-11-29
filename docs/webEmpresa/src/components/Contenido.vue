<template>
    <div>
        <div id="menu2" class="ui secondary pointing large menu paperviu-dark inverted"
             style="margin: 0; border: 0">
            <div class="ui container">
                <a :class="{'active border-bottom-paperviu-sky': mostrarFiltros}" class="ui item"
                   @click="mostrarFiltros = !mostrarFiltros"
                   style="border-bottom-width: 3px; padding: 8px; margin: 0">
                    <i class="filter large icon"
                       :class="{'text-paperviu-sky': mostrarFiltros}"></i>{{mostrarFiltros ? 'Ocultar filtros' : 'Mostrar filtros'}}
                </a>
                <div class="right menu">
                    <div @click="mostrarNuevo = !mostrarNuevo"
                         class="ui active border-bottom-paperviu-sky paperviu-d7 hover-paperviu-sky item"
                         style="cursor: pointer; padding: 13px; margin: 0">
                        <i class="add icon"></i>Crear contenido
                    </div>
                </div>
            </div>
        </div>
        <div class="row border-bottom-paperviu-sky" v-show="mostrarNuevo" style="background-color: #e5ecf3">
            <div class="ui right aligned text container" style="padding: 20px">
                <div class="ui secondary menu pointing" style="margin: 0; border: 0">
                    <h1 class="ui header text-paperviu-sky" style="margin: 0">Contenido nuevo</h1>
                    <div class="right menu">
                        <i @click="mostrarNuevo = !mostrarNuevo" class="close icon link red large"
                           style="margin-top: 2px"></i>
                    </div>
                </div>
                <div class="ui fluid labeled input" style="padding: 10px; margin-top: 10px">
                    <div class="ui basic label">T&iacute;tulo</div>
                    <input v-model="titulo" type="text" placeholder="Ingrese el titulo...">
                </div>
                <div class="ui fluid labeled input" style="padding: 10px">
                    <div class="ui basic label">Tipo</div>
                    <select id="tipo" v-model="tipo" class="ui fluid dropdown" style="width: 100%">
                        <option v-for="tipo in tiposList" :value="tipo.nombre">{{ tipo.nombre }}</option>
                        <option value="" selected disabled>Seleccione un tipo...</option>
                    </select>
                </div>
                <div class="row" style="padding: 10px">
                    <button @click="crearContenido"
                            class="ui large button paperviu-d7 text-paperviu-e8 hover-paperviu-dark">Crear contenido
                    </button>
                </div>
            </div>
        </div>
        <div id="listado" class="ui stackable two column grid" style="margin: 0">
            <div v-show="mostrarFiltros" class="three wide column"
                 style="padding-right: 0px; background-color: #e5ecf3">
                <div class="ui secondary pointing vertical fluid menu">
                    <div class="ui accordion" style="margin: 0px">
                        <h2 class="active title header text-paperviu-dark large" style="margin: 0px">
                            <i class="search text-paperviu-sky icon" style="margin-right: 7px"></i>Buscar
                        </h2>
                        <div class="active content" style="padding: 0">
                            <div class="ui item border-right-paperviu-sky"
                                 style="background-color: #dce5ef; border-right-width: 3px">
                                <div class="ui fluid transparent input large icon focus text-paperviu-dark"
                                     style="padding: 0">
                                    <i @click="listarContenidos(1)" class="search icon text-paperviu-sky link"></i>
                                    <input style="height: 30px" @keyup.enter="listarContenidos(1)" v-model="filtro"
                                           type="text"
                                           placeholder="Buscar por titulo...">
                                </div>
                            </div>
                        </div>
                        <h2 class="title header text-paperviu-dark large" style="margin: 0px">
                            <i class="sitemap text-paperviu-sky icon" style="margin-right: 7px"></i>Tipos
                        </h2>
                        <div class="content">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                    style="padding: 10px"
                                    v-for="tipo in tiposList"
                                    :class="{'active text-paperviu-sky border-right-paperviu-sky': tipoFiltro === tipo.nombre}"
                                    @click="tipoFiltro = tipo.nombre; listarContenidos(1);"
                                >{{ tipo.nombre }}</h4>
                            </div>
                        </div>
                        <h2 class="title header text-paperviu-dark large" style="margin: 0px">
                            <i class="tags text-paperviu-sky icon" style="margin-right: 7px"></i>Categorias
                        </h2>
                        <div class="content">
                            <div class="ui selection list">
                                <h4 class="ui item hover-border-paperviu-sky text-paperviu-dark hover-text-paperviu-sky"
                                    style="padding: 10px"
                                    v-for="cat in categoriasList"
                                    :class="{'active text-paperviu-sky': categoriaFiltro === cat.nombre}"
                                    @click="categoriaFiltro = cat.nombre; listarContenidos(1);"
                                >{{ cat.nombre }}</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="padding-left: 30px; padding-right: 30px"
                 :class="{'sixteen wide column': !mostrarFiltros, 'thirteen wide column': mostrarFiltros}">
                <div class="ui secondary menu">
                    <div class="ui tag icon small labels">
                        <div v-show="tipoFiltro !== ''" class="ui label paperviu-sky"
                             style="background-color: #f1f5f9">
                            <i @click="tipoFiltro = ''; listarContenidos(1);"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ tipoFiltro }}</span>
                        </div>
                        <div v-show="categoriaFiltro !== ''" class="ui paperviu-sky label">
                            <i @click="categoriaFiltro = ''; listarContenidos(1);"
                               class="remove link text-paperviu-e8 large icon"
                               style="margin-right: 5px"></i>
                            <span class="ui detail header inverted"
                                  style="margin: 0">{{ categoriaFiltro }}</span>
                        </div>
                    </div>
                </div>
                <div class="ui stackable two column grid container">
                    <paperviu-contenido-item
                            v-for="(contenido, index) in contenidosList"
                            :key="index"
                            :id="contenido.id"
                            :titulo="contenido.titulo"
                            :tipo="contenido.tipo"
                            :valoracion="contenido.valoracion"
                            :imagen="contenido.imagen"
                            :fecha="contenido.fecha"
                            :estado="contenido.estado"
                            :estadoAdmin="contenido.estadoAdmin"
                            @verModificacion="mostrarMod(contenido.id, contenido.tipo)"
                    ></paperviu-contenido-item>
                </div>
                <infinite-loading ref="infiniteLoading" style="padding: 50px" @infinite="infiniteHandler">
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
        <div class="ui row" id="mod" style="padding-bottom: 60px; display: none">
            <paperviu-contenido-mod
                    v-if="modificarContenido"
                    :contenido="idContenidoActual"
                    :tipo="tipoContenidoActual"
                    @volver="mostrarListado"
            ></paperviu-contenido-mod>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                mostrarNuevo: false,
                pagina: 1,
                filtro: '',
                categoriaFiltro: '',
                tipoFiltro: '',
                titulo: '',
                tipo: '',
                mostrarFiltros: false,
                idContenidoActual: '',
                tipoContenidoActual: '',
                modificarContenido: false,
            }
        },
        computed: {
            getCategoriasURL() {
                return this.$store.state.baseUrl + "categorias";
            },
            cargarTiposURL() {
                return this.$store.state.baseUrl + "tipos/all";
            },
            listarContenidosURL() {
                return this.$store.state.baseUrl + "contenidos?contenido=" + this.filtro + "&tipo=" + this.tipoFiltro + "&categoria=" + this.categoriaFiltro + "&pagina=" + this.pagina + "&empresa=" + this.empresa.nombre + "&empresaLike=false";
            },
            crearContenidoURL() {
                return this.$store.state.baseUrl + "contenidos?titulo=" + this.titulo + "&empresa=" + this.empresa.nombre + "&tipo=" + this.tipo;
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
            empresa() {
                return this.$store.state.empresa;
            }
        },
        mounted() {
            document.title = 'Contenidos';
            this.$store.commit('setVistaActual', 'Contenidos');
            this.$store.commit('setContenidosList', []);
            $('.ui.dropdown').dropdown();
            $('.ui.accordion').accordion();
            if (this.categoriasList.length === 0) this.cargarCategorias();
            if (this.tiposList.length === 0) this.cargarTipos();
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarContenidosURL, function (response) {
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
            mostrarMod(contenido, tipo) {
                this.idContenidoActual = contenido;
                this.tipoContenidoActual = tipo;
                this.modificarContenido = true;
                $('#listado').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#mod').transition('fade in');
                    }
                });
                $('#menu2').transition('fade out');
            },
            mostrarListado() {
                var _this = this;
                $('#mod').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#listado').transition('fade in');
                        _this.modificarContenido = false;
                        _this.listarContenidos(1);
                        document.title = 'Contenidos';
                    }
                });
                $('#menu2').transition('fade in');
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
            crearContenido() {
                var _this = this;
                if (this.tipo === '' || this.titulo === '') this.mostrarAlertContendio();
                else {
                    this.mostrarCreandoContenido();
                    $.post(this.crearContenidoURL, function (response) {
                        if (response !== undefined) {
                            if (response > 0) _this.crearCarpetaDropbox(response);
                            else _this.mostrarErrorCrearContenido();
                        } else _this.mostrarErrorCrearContenido();
                    }).fail(function () {
                        _this.mostrarErrorCrearContenido();
                    });
                }
            },
            listarContenidos(pagina) {
                if (pagina !== undefined) this.pagina = pagina;
                this.$store.commit('setContenidosList', []);
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            crearCarpetaDropbox(id) {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesCreateFolderV2({
                    path: '/Aplicaciones/contenidos/' + id
                }).then(function (response) {
                    _this.mostrarContenidoCreado();
                    _this.mostrarNuevo = false;
                    _this.listarContenidos(1);
                });
            },
            mostrarAlertContendio() {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>Debes ingresar el t&iacute;tulo y el tipo!</h3>", noty.warning);
            },
            mostrarContenidoCreado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Contenido creado!</h3>", noty.success);
            },
            mostrarCreandoContenido() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Creando contenido...</h3>", noty.info);
            },
            mostrarErrorCrearContenido() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo crear el contenido.</h3>", noty.error);
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>
<style>

</style>