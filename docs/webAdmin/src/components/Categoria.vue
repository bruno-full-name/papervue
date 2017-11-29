<template>
    <div>
        <div class="ui stackable grid" style="margin: 0">
            <div class="four wide column paperviu-e8" style="padding: 0">
                <div class="ui secondary pointing vertical fluid menu">
                    <div @click="mostrarNueva = !mostrarNueva"
                         class="ui active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8 hover-paperviu-dark item"
                         style="cursor: pointer; padding: 20px">
                        <i class="add large icon" style="margin-top: 3px"></i><span
                            style="font-weight: 500; color: inherit; font-size: 20px;">Crear categor&iacute;a</span>
                    </div>
                    <div class="ui active border-bottom-paperviu-sky paperviu-e4 item">
                        <div class="ui transparent icon input big" style="padding: 5px">
                            <i @click="cargarCategorias" class="search link icon"></i>
                            <input style="height: 30px" v-model="filtro"
                                   @keyup.enter="cargarCategorias"
                                   placeholder="Buscar categorias..." type="text">
                        </div>
                    </div>
                    <template v-for="categoria in categoriasList">
                        <a @click="nombreMod = categoria.nombre; descripcionMod = categoria.descripcion"
                           class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                           style="padding: 16px">
                            <h2 class="ui header" style="color: inherit; font-weight: 500">{{categoria.nombre}}</h2>
                        </a>
                    </template>
                </div>
                <infinite-loading ref="infiniteLoading"
                                  style="padding: 30px"
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
            <div class="twelve wide column" style="padding: 0">
                <div class="row" v-if="mostrarNueva" style="background-color: #e5ecf3">
                    <div class="ui right aligned text container" style="padding: 20px">
                        <div class="ui secondary menu pointing" style="margin: 0; border: 0">
                            <h2 class="ui header text-paperviu-d7" style="margin: 0">Categor&iacute;a nueva</h2>
                            <div class="right menu">
                                <i @click="mostrarNueva = !mostrarNueva" class="close icon link red large"
                                   style="margin-top: 2px"></i>
                            </div>
                        </div>
                        <div class="ui fluid small input labeled" style="padding: 7px; margin-top: 10px">
                            <div class="ui basic right pointing label">Nombre</div>
                            <input v-model="nombre" type="text" placeholder="Ingrese el nombre de la categoria...">
                        </div>
                        <div class="ui reply form" style="padding: 7px">
                            <div class="field">
                        <textarea style="min-height: 100px; max-width: 100%; min-width: 100%; max-height: 100px"
                                  maxlength="1024" placeholder="Escriba una descripcion para el tipo..."
                                  v-model="descripcion"></textarea>
                            </div>
                        </div>
                        <button style="margin-top: 10px" @click="agregarCategoria"
                                class="ui large button paperviu-d7 text-paperviu-e8 hover-paperviu-dark">Crear categoria
                        </button>
                    </div>
                </div>
                <div class="row" style="padding: 20px">
                    <h1 class="ui header text-paperviu-d7">{{nombreMod}}</h1>
                    <div v-show="nombreMod !== ''" class="row">
                        <button id="eliminarBtn"
                                class="ui left attached button paperviu-d7 text-paperviu-e4 hover-paperviu-dark"><i
                                class="trash icon"></i>Eliminar
                        </button>
                        <button @click="modificarCategoria"
                                class="ui right attached button paperviu-sky text-paperviu-e4 hover-paperviu-63"><i
                                class="save icon"></i>Guardar
                        </button>
                    </div>
                    <div id="eliminarPopup" class="ui popup flowing transition hidden" style="padding: 0">
                        <div class="ui secondary pointing border-bottom-paperviu-sky menu" style="margin: 0">
                            <h3 class="ui header text-paperviu-d7"
                                style="margin-top: 8px; margin-left: 15px; margin-right: 5px">
                                &iquest;Confirmar?</h3>
                            <a @click="nombreEliminar = nombreMod; eliminarCategoria();"
                               class="ui item hover-paperviu-e8" style="margin: 0"><span
                                    class="ui header text-paperviu-sky">Eliminar</span></a>
                        </div>
                    </div>
                    <div class="ui reply form" style="margin-top: 16px" v-show="nombreMod !== ''">
                        <div class="field">
                        <textarea
                                style="min-height: 100px; max-width: 100%; min-width: 100%; max-height: 100px"
                                maxlength="1024" placeholder="Escriba una descripcion para el tipo..."
                                v-model="descripcionMod"></textarea>
                        </div>
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
                nombre: '',
                descripcion: '',
                nombreMod: '',
                descripcionMod: '',
                nombreEliminar: '',
                categoriasList: [],
                pagina: 1,
                filtro: '',
                mostrarNueva: false
            }
        },
        mounted() {
            document.title = 'Categorias';
            this.$store.commit('setVistaActual', 'Categorias');
            this.categoriasList = [];
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            $('#eliminarBtn').popup({
                popup: $('#eliminarPopup'),
                inline: true,
                on: 'click'
            }).popup('show');
        },
        computed: {
            agregarCategoriaURL() {
                return this.$store.state.baseUrl + "categorias?nombre=" + this.nombre + "&descripcion=" + this.descripcion;
            },
            modificarCategoriaURL() {
                return this.$store.state.baseUrl + "categorias?nombre=" + this.nombreMod + "&descripcion=" + this.descripcionMod;
            },
            eliminarCategoriaURL() {
                return this.$store.state.baseUrl + "categorias/" + this.nombreEliminar;
            },
            cargarCategoriasURL() {
                return this.$store.state.baseUrl + "categorias/pag?pagina=" + this.pagina + "&filtro=" + this.filtro;
            }
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.cargarCategoriasURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, categoria) {
                                    _this.categoriasList.push({
                                        nombre: categoria.nombre,
                                        descripcion: categoria.descripcion
                                    });
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            agregarCategoria() {
                if (this.nombre !== '') {
                    var _this = this;
                    this.mostrarInfo("Agregando categoria...");
                    $.post(this.agregarCategoriaURL, function (response) {
                        if (response === true || response === "true") {
                            _this.cargarCategorias();
                            _this.nombre = '';
                            _this.descripcion = '';
                            _this.mostrarNueva = false;
                            _this.mostrarExito("Categoria agregada!");
                        }
                        else _this.mostrarError("No se pudo agregar la categoria");
                    }).fail(function () {
                        _this.mostrarError("No se pudo agregar la categoria");
                    });
                } else this.mostrarAlertaCrearCategoria();
            },
            modificarCategoria() {
                var _this = this;
                this.mostrarInfo("Actualizando categoria...");
                $.ajax({
                    type: 'PUT',
                    url: _this.modificarCategoriaURL,
                    success: function (response) {
                        if (response === true || response === "true") _this.mostrarExito("Categoria actualizada!");
                        else _this.mostrarError("No se pudo actualizar la categoria");
                    },
                    error: function () {
                        _this.mostrarError("No se pudo actualizar la categoria");
                    }
                });
            },
            eliminarCategoria() {
                var _this = this;
                this.mostrarInfo("Eliminando categoria...");
                $.ajax({
                    type: 'DELETE',
                    url: _this.eliminarCategoriaURL,
                    success: function (response) {
                        if (response === true || response === "true") {
                            $('#eliminarBtn').popup('hide');
                            _this.nombreEliminar = '';
                            _this.nombreMod = '';
                            _this.descripcionMod = '';
                            _this.mostrarExito("Categoria eliminada!");
                            _this.cargarCategorias();
                        } else _this.mostrarError("No se pudo eliminar la categoria");
                    },
                    error: function () {
                        _this.mostrarError("No se pudo eliminar la categoria");
                    }
                });
            },
            cargarCategorias() {
                this.pagina = 1;
                this.categoriasList = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            mostrarAlertaCrearCategoria() {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>El nombre no puede ser vac&iacute;o!</h3>", noty.warning);
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