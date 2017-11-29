<template>
    <div>
        <div id="nuevo" class="row" style="display: none; padding-bottom: 100px">
            <div class="row"
                 style="border-bottom-width: 4px;margin: 0; background-color: #3e444a">
                <div class="ui text container" style="padding: 15px">
                    <div class="ui header inverted" style="font-size: 27px; font-weight: 500">
                        <button @click="mostrarListado" style="font-size: 30px"
                                class="ui circular icon inverted basic button"><i
                                class="left text-paperviu-sky chevron icon"></i></button>
                        Crear tipo de contenido
                    </div>
                </div>
            </div>
            <div class="ui text container paperviu-e8 border-left-paperviu-sky" style="margin: 0">
                <h3 class="ui left ribbon label big inverted paperviu-dark" style="margin-top: 20px; margin-left: 15px">
                    <i class="info icon"></i>Informaci&oacute;n del tipo de contenido</h3>
                <div class="row" style="padding: 16px">
                    <div class="ui toggle checkbox" style="margin: 0; padding: 5px">
                        <input v-model="enVivo" type="checkbox">
                        <label class="ui header text-paperviu-d7"
                               style="margin: 0; padding-top: 0">{{ enVivo ? 'Utilizado para Streaming de contenidos en directo.' : 'No utilizado para Streaming de contenidos en directo.'
                            }}</label>
                    </div>
                    <div class="ui fluid small input labeled" style="padding: 7px; margin-top: 10px">
                        <div class="ui basic right pointing label">Nombre</div>
                        <input v-model="nombre" type="text" placeholder="Ingrese el nombre del tipo...">
                    </div>
                    <div class="ui reply form" style="padding: 7px">
                        <div class="field">
                        <textarea style="min-height: 100px; max-width: 100%; min-width: 100%; max-height: 100px"
                                  maxlength="1024" placeholder="Escriba una descripcion para el tipo..."
                                  v-model="descripcion"></textarea>
                        </div>
                    </div>
                </div>
            </div>
            <div class="ui text container paperviu-e8 border-left-paperviu-sky">
                <h3 class="ui left ribbon label big inverted paperviu-dark" style="margin-top: 20px; margin-left: 15px">
                    <i class="tags icon"></i>Atributos</h3>
                <div class="ui relaxed items">
                    <template v-for="atributo in atributosNuevo">
                        <div class="item paperviu-e4" style="padding: 16px">
                            <div class="middle aligned content">
                                <div class="ui labeled action fluid small input">
                                    <div class="ui basic label right pointing"><span
                                            class="ui header text-paperviu-dark small">Atributo:</span>
                                    </div>
                                    <input type="text" v-model="atributo.clave"
                                           placeholder="Ingrese el nombre o clave del atributo...">
                                    <i @click="quitarAtributoNuevo(atributo.id)"
                                       style="margin-left: 10px; margin-top: 6px"
                                       class="remove grey inverted link circular icon"></i>
                                </div>
                            </div>
                        </div>
                    </template>
                </div>
                <div @click="agregarAtributoNuevo" class="ui center aligned basic segment paperviu-e8 hover-paperviu-e4"
                     style="padding: 30px; cursor: pointer;">
                    <h4 class="ui icon header text-paperviu-sky" style="margin: 0px"><i class="add icon"></i></h4>
                    <h1 class="ui sub header huge text-paperviu-dark" style="margin: 0px">Agregar atributo</h1>
                </div>
            </div>
            <div class="ui bottom fixed one item secondary menu large pointing border-bottom-paperviu-sky"
                 style="padding: 5px; background-color: #f1f5f9">
                <div class="ui item">
                    <button @click="agregarTipo"
                            class="ui button paperviu-sky large hover-paperviu-63 text-paperviu-e8"><i
                            class="save icon"></i>Confirmar
                    </button>
                </div>
            </div>
        </div>
        <div id="listado" class="ui stackable grid" style="margin: 0">
            <div class="four wide column paperviu-e8" style="padding: 0">
                <div class="ui secondary pointing vertical fluid menu">
                    <div @click="mostrarNuevo"
                         class="ui active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8 hover-paperviu-dark item"
                         style="cursor: pointer; padding: 20px">
                        <i class="add large icon" style="margin-top: 3px"></i><span
                            style="font-weight: 500; color: inherit; font-size: 20px;">Crear tipo</span>
                    </div>
                    <div class="ui active border-bottom-paperviu-sky paperviu-e4 item">
                        <div class="ui transparent icon input big" style="padding: 5px">
                            <i @click="listarTipos" class="search link icon"></i>
                            <input style="height: 30px" v-model="filtro"
                                   @keyup.enter="listarTipos"
                                   placeholder="Buscar tipos..." type="text">
                        </div>
                    </div>
                    <template v-for="tipo in tiposList">
                        <a @click="nombreMod = tipo.nombre; descripcionMod = tipo.descripcion; getAtributos();"
                           class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                           style="padding: 16px">
                            <h2 class="ui header" style="color: inherit; font-weight: 500">{{tipo.nombre}}</h2>
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
            <div class="twelve wide column">
                <div class="ui container" style="padding: 16px">
                    <h1 class="ui header text-paperviu-d7">{{nombreMod}}</h1>
                    <div v-show="nombreMod !== ''" class="row">
                        <button id="eliminarBtn"
                                class="ui left attached button paperviu-d7 text-paperviu-e4 hover-paperviu-dark"><i
                                class="trash icon"></i>Eliminar
                        </button>
                        <button @click="modificarTipo"
                                class="ui right attached button paperviu-sky text-paperviu-e4 hover-paperviu-63"><i
                                class="save icon"></i>Guardar
                        </button>
                    </div>
                    <div id="eliminarPopup" class="ui popup flowing transition hidden" style="padding: 0">
                        <div class="ui secondary pointing border-bottom-paperviu-sky menu" style="margin: 0">
                            <h3 class="ui header text-paperviu-d7"
                                style="margin-top: 8px; margin-left: 15px; margin-right: 5px">
                                &iquest;Confirmar?</h3>
                            <a @click="nombreEliminar = nombreMod; eliminarTipo();"
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
                    <div class="row border-left-paperviu-sky" style="margin-top: 16px">
                        <template v-for="atributo in atributosMod">
                            <div class="row paperviu-e8" style="padding: 16px">
                                <div class="middle aligned content">
                                    <div class="ui labeled action fluid input">
                                        <div class="ui basic label right pointing"><span
                                                class="ui header text-paperviu-dark small">Atributo:</span>
                                        </div>
                                        <input v-if="!atributo.created" type="text" v-model="atributo.clave"
                                               placeholder="Ingrese el nombre o clave del atributo...">
                                        <input v-else readonly type="text" v-model="atributo.clave"
                                               placeholder="Ingrese el nombre o clave del atributo...">
                                        <i v-if="!atributo.created" @click="quitarAtributoMod(atributo.id)"
                                           style="margin-left: 10px; margin-top: 6px"
                                           class="remove grey inverted link circular icon"></i>
                                        <i :id="atributo.id"
                                           @click="popupEliminarAtributo(atributo.id, atributo.id + 'popup')"
                                           v-if="atributo.created" style="margin-left: 10px; margin-top: 6px"
                                           class="trash paperviu-d7 hover-paperviu-dark inverted link circular icon"></i>
                                    </div>
                                    <div :id="atributo.id + 'popup'" class="ui popup flowing transition hidden"
                                         style="padding: 0">
                                        <div class="ui secondary pointing border-bottom-paperviu-sky menu"
                                             style="margin: 0">
                                            <h3 class="ui header text-paperviu-d7"
                                                style="margin-top: 8px; margin-left: 15px; margin-right: 5px">
                                                &iquest;Confirmar?</h3>
                                            <a @click="eliminarAtributo(atributo.clave, atributo.id)"
                                               class="ui item hover-paperviu-e8" style="margin: 0"><span
                                                    class="ui header text-paperviu-sky">Eliminar</span></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        <div @click="agregarAtributoMod" v-show="nombreMod !== ''"
                             class="ui center aligned basic segment paperviu-e8 hover-paperviu-e4"
                             style="padding: 30px; cursor: pointer; margin: 0">
                            <h4 class="ui icon header text-paperviu-sky" style="margin: 0px"><i class="add icon"></i>
                            </h4>
                            <h1 class="ui sub header huge text-paperviu-dark" style="margin: 0px">Agregar atributo</h1>
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
                atributosNuevo: [],
                atributosMod: [],
                atributosNuevoClaveList: [],
                atributosModClaveList: [],
                enVivo: false,
                descripcionMod: '',
                nombreEliminar: '',
                tiposList: [],
                pagina: 1,
                filtro: ''
            }
        },
        mounted() {
            document.title = 'Tipos de contenido';
            this.$store.commit('setVistaActual', 'Tipos');
            this.tiposList = [];
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            $('#eliminarBtn').popup({
                popup: $('#eliminarPopup'),
                inline: true,
                on: 'click'
            }).popup('show');
        },
        computed: {
            agregarTipoURL() {
                return this.$store.state.baseUrl + "tipos?nombre=" + this.nombre + "&descripcion=" + this.descripcion + "&envivo=" + this.enVivo;
            },
            agregarAtributosURL() {
                return this.$store.state.baseUrl + "atributos?atributos=" + this.atributosNuevoClaveList + "&tipo=" + this.nombre;
            },
            modificarTipoURL() {
                return this.$store.state.baseUrl + "tipos?nombre=" + this.nombreMod + "&descripcion=" + this.descripcionMod;
            },
            eliminarTipoURL() {
                return this.$store.state.baseUrl + "tipos/" + this.nombreEliminar;
            },
            cargarTipoURL() {
                return this.$store.state.baseUrl + "tipos?pagina=" + this.pagina + "&filtro=" + this.filtro;
            },
            getAtributosURL() {
                return this.$store.state.baseUrl + "atributos/" + this.nombreMod;
            },
            modificarAtributosURL() {
                return this.$store.state.baseUrl + "atributos?atributos=" + this.atributosModClaveList + "&tipo=" + this.nombreMod;
            },
            eliminarAtributoURL() {
                return this.$store.state.baseUrl + "atributos?tipo=" + this.nombreMod + "&clave=";
            }
        },
        methods: {
            popupEliminarAtributo(id, popup) {
                $('#' + id).popup({
                    popup: $('#' + popup),
                    inline: true,
                    on: 'click'
                }).popup('show');
            },
            agregarAtributoNuevo() {
                this.atributosNuevo.push({
                    id: this.atributosNuevo.length + 1,
                    clave: ''
                });
            },
            quitarAtributoNuevo(id) {
                this.atributosNuevo = this.atributosNuevo.filter(function (item) {
                    return item.id !== id;
                });
            },
            agregarAtributoMod() {
                this.atributosMod.push({
                    id: this.atributosMod.length + 1,
                    clave: '',
                    created: false
                });
            },
            quitarAtributoMod(id) {
                this.atributosMod = this.atributosMod.filter(function (item) {
                    return item.id !== id;
                });
            },
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.cargarTipoURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                $.each(response, function (index, tipo) {
                                    _this.tiposList.push({
                                        nombre: tipo.nombre,
                                        descripcion: tipo.descripcion,
                                        enVivo: tipo.enVivo
                                    });
                                });
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            agregarTipo() {
                if (this.nombre !== '') {
                    var _this = this;
                    this.mostrarInfo("Creando tipo de contenido...");
                    $.post(this.agregarTipoURL, function (response) {
                        if (response === true || response === "true") {
                            if (_this.atributosNuevo.length > 0) _this.agregarAtributos();
                            else {
                                _this.mostrarExito("Tipo de contenido creado!");
                                _this.atributosNuevo = [];
                                _this.atributosNuevoClaveList = [];
                                _this.nombre = '';
                                _this.descripcion = '';
                                _this.enVivo = false;
                                _this.mostrarListado();
                            }
                        }
                        else _this.mostrarError("No se pudo crear el tipo de contenido");
                    }).fail(function () {
                        _this.mostrarError("No se pudo crear el tipo de contenido");
                    });
                } else this.mostrarAlertaCrearTipo();
            },
            modificarTipo() {
                if (this.nombreMod !== '') {
                    var _this = this;
                    this.mostrarInfo("Actualizando tipo de contenido...");
                    $.ajax({
                        type: 'PUT',
                        url: _this.modificarTipoURL,
                        success: function (response) {
                            if (response === true || response === "true") _this.mostrarExito("Tipo de contenido actualizado!");
                            else _this.mostrarError("No se pudo actualizar el tipo de contenido");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo actualizar el tipo de contenido");
                        }
                    });
                    this.modificarAtributos();
                }
            },
            eliminarTipo() {
                var _this = this;
                this.mostrarInfo("Eliminando tipo de contenido...");
                $.ajax({
                    type: 'DELETE',
                    url: _this.eliminarTipoURL,
                    success: function (response) {
                        if (response === true || response === "true") {
                            _this.nombreEliminar = '';
                            _this.nombreMod = '';
                            _this.descripcionMod = '';
                            $('#eliminarBtn').popup('hide');
                            _this.atributosMod = [];
                            _this.atributosNuevoClaveList = [];
                            _this.mostrarExito("Tipo de contenido eliminado!");
                            _this.listarTipos();
                        } else _this.mostrarError("No se pudo eliminar el tipo de contenido");
                    },
                    error: function () {
                        _this.mostrarError("No se pudo eliminar el tipo de contenido");
                    }
                });
            },
            agregarAtributos() {
                var _this = this;
                $.each(this.atributosNuevo, function (index, atributo) {
                    if (atributo.clave !== undefined && atributo.clave !== '') _this.atributosNuevoClaveList.push(atributo.clave);
                });
                if (this.atributosNuevoClaveList.length > 0) {
                    _this.mostrarInfo("Agregando atributos al tipo de contenido...");
                    $.post(_this.agregarAtributosURL, function (response) {
                        if (response === true || response === "true") {
                            _this.atributosNuevo = [];
                            _this.atributosNuevoClaveList = [];
                            _this.nombre = '';
                            _this.descripcion = '';
                            _this.enVivo = false;
                            _this.mostrarListado();
                            _this.mostrarExito("Atributos agregados!");
                        }
                        else _this.mostrarError("No se pudo agregar los atributos al tipo de contenido");
                    }).fail(function () {
                        _this.mostrarError("No se pudo agregar los atributos al tipo de contenido");
                    });
                }
            },
            modificarAtributos() {
                var _this = this;
                $.each(this.atributosMod, function (index, atributo) {
                    if (!atributo.created && atributo.clave !== undefined && atributo.clave !== '') _this.atributosModClaveList.push(atributo.clave);
                });
                if (this.atributosModClaveList.length > 0) {
                    _this.mostrarInfo("Modificando atributos...");
                    $.ajax({
                        type: 'PUT',
                        url: _this.modificarAtributosURL,
                        success: function (response) {
                            if (response === true || response === "true") {
                                _this.mostrarExitoNotKiller("Atributos modificados!");
                                _this.getAtributos();
                            } else _this.mostrarError("No se pudo modificar los atributos");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo modificar los atributos");
                        }
                    });
                }
            },
            eliminarAtributo(clave, id) {
                if (clave !== undefined && clave !== '' && this.nombreMod !== '') {
                    this.mostrarInfo("Eliminando atributo...");
                    var _this = this;
                    $.ajax({
                        type: 'DELETE',
                        url: _this.eliminarAtributoURL + clave,
                        success: function (response) {
                            if (response === true || response === "true") {
                                _this.mostrarExito("Atributo eliminado!");
                                _this.quitarAtributoMod(id);
                            } else _this.mostrarError("No se pudo eliminar el atributo");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo eliminar el atributo");
                        }
                    });
                }
            },
            getAtributos() {
                if (this.nombreMod !== '') {
                    var _this = this;
                    $.get(this.getAtributosURL, function (response) {
                        if (response !== undefined) {
                            _this.atributosMod = [];
                            $.each(response, function (index, atributo) {
                                _this.atributosMod.push({
                                    clave: atributo.atributoPK.clave,
                                    id: _this.atributosMod.length + 1,
                                    created: true
                                });
                            });
                        }
                    });
                }
            },
            mostrarNuevo() {
                $('#listado').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#nuevo').transition('fade in');
                    }
                });
                $('#menu2').transition('fade out');
            },
            mostrarListado() {
                var _this = this;
                $('#nuevo').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        _this.listarTipos();
                        $('#listado').transition('fade in');
                    }
                });
                $('#menu2').transition('fade in');
            },
            listarTipos() {
                this.pagina = 1;
                this.tiposList = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            mostrarExito(mensaje) {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i> " + mensaje + "</h3>", noty.success);
            },
            mostrarExitoNotKiller(mensaje) {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i> " + mensaje + "</h3>", noty.successNotKiller);
            },
            mostrarError(mensaje) {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i> " + mensaje + "</h3>", noty.error);
            },
            mostrarInfo(mensaje) {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i> " + mensaje + "</h3>", noty.info);
            },
            mostrarAlertaCrearTipo() {
                this.$noty.warning("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>El nombre no puede ser vac&iacute;o!</h3>", noty.warning);
            },
        },
        components: {
            InfiniteLoading
        }
    }
</script>