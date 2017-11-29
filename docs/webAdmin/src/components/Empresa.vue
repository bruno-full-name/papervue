<template>
    <div>
        <div id="listado" class="ui stackable grid" style="margin: 0">
            <div class="four wide column paperviu-e8" style="padding: 0">
                <div class="ui secondary pointing vertical fluid menu">
                    <div @click="mostrarNueva"
                         class="ui active border-bottom-paperviu-sky paperviu-d7 text-paperviu-e8 hover-paperviu-dark item"
                         style="cursor: pointer; padding: 20px">
                        <i class="add large icon" style="margin-top: 3px"></i><span
                            style="font-weight: 500; color: inherit; font-size: 20px;">Crear empresa</span>
                    </div>
                    <div class="ui active border-bottom-paperviu-sky paperviu-e4 item">
                        <div class="ui transparent icon input big" style="padding: 5px">
                            <i @click="listarEmpresas(1)" class="search link icon"></i>
                            <input style="height: 30px" v-model="filtro"
                                   @keyup.enter="listarEmpresas(1)"
                                   placeholder="Buscar empresas..." type="text">
                        </div>
                    </div>
                    <template v-for="empresa in empresas">
                        <a @click="empresaActual = empresa; getEmpresa();"
                           class="ui item text-paperviu-d7 hover-text-paperviu-sky hover-border-paperviu-sky hover-paperviu-e4"
                           style="padding: 16px">
                            <h2 class="ui header" style="color: inherit; font-weight: 500">{{empresa}}</h2>
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
            <div class="twelve wide column" style="padding: 0; margin: 0">
                <div v-show="empresa.nombre !== ''" class="row">
                    <div v-if="empresa.imagenSrc === ''" class="bkg3">
                        <div class="transp5"></div>
                    </div>
                    <div v-else :style="{backgroundImage: 'url(' + empresa.imagenSrc + ')'}" class="bkg4">
                        <div class="transp5"></div>
                    </div>
                </div>
                <div v-show="empresa.nombre !== ''" class="row" style="padding: 20px">
                    <h1 class="ui header text-paperviu-d7" style="margin: 0">{{empresa.nombre}}</h1>
                    <h2 class="ui header text-paperviu-sky" style="margin: 0; font-weight: 500">{{empresa.link}}</h2>
                </div>
                <div v-show="empresa.nombre !== ''" class="row" style="padding-left: 20px">
                    <div class="ui toggle checkbox">
                        <input @change="cambiarEstado" v-model="empresa.estado" type="checkbox">
                        <label class="text-paperviu-d7"
                               style="font-size: 20px">{{empresa.estado ? 'Empresa habilitada' : 'Empresa deshabilitada'}}</label>
                    </div>
                </div>
                <div class="row" style="padding: 25px">
                    <h3 v-show="empresa.username !== ''" class="ui header text-paperviu-d7" style="margin: 0"><i
                            class="user outline circle text-paperviu-sky icon"></i>{{empresa.username}}</h3>
                    <h3 v-show="empresa.email !== ''" class="ui header text-paperviu-d7" style="margin-top: 16px;"><i
                            class="at text-paperviu-sky icon"></i>{{empresa.email}}</h3>
                </div>
            </div>
        </div>
        <div class="row" id="nueva"
             style="display: none; padding-bottom: 80px; margin-top: 2px">
            <div class="row" style="background-color: #3e444a">
                <div class="ui text container" style="padding: 20px">
                    <div class="ui header inverted" style="font-size: 27px; font-weight: 500">
                        <button @click="mostrarListado" style="font-size: 30px"
                                class="ui circular icon inverted basic button"><i
                                class="left text-paperviu-sky chevron icon"></i></button>
                        Crear Empresa
                    </div>
                </div>
            </div>
            <div class="ui text container paperviu-e8 border-left-paperviu-sky">
                <div class="row" style="padding: 30px">
                    <h3 class="ui left ribbon label big inverted paperviu-dark"
                        style="margin-left: -15px">
                        <i class="image icon"></i>Imagen de Portada</h3>
                </div>
                <div class="ui center aligned basic segment" style="padding: 0; margin: 0">
                    <VueImgInputer v-model="imagen" size="large" icon="img"
                                   placeholder="Seleccione o arrastre una imagen de portada..."
                                   style="background-color: #e8eef5"></VueImgInputer>
                </div>
                <div class="row" style="padding: 30px">
                    <h3 class="ui left ribbon label big inverted paperviu-dark"
                        style="width: auto;margin-left: -15px">
                        <i class="info icon"></i>Informaci&oacute;n de la Empresa</h3>
                </div>
                <div class="ui basic segment"
                     style="margin: 0; padding-top: 0; padding-left: 16px; padding-right: 16px">
                    <div class="ui toggle checkbox"
                         style="margin-top: 16px; padding-left: 16px; padding-right: 16px">
                        <input v-model="estadoEmpresa" type="checkbox">
                        <label class="ui header text-paperviu-dark"
                               style="margin: 0px">{{ estadoEmpresa ? 'Habilitada' : 'Deshabilitada' }}</label>
                    </div>
                    <div class="ui fluid labeled input"
                         style="margin-top: 16px; padding-left: 16px; padding-right: 16px">
                        <div class="ui basic label">Nombre</div>
                        <input v-model="nombreEmpresa" type="text"
                               placeholder="Ingrese el nombre de la empresa generadora...">
                    </div>
                    <div class="ui fluid labeled input"
                         style="margin-top: 16px; padding-left: 16px; padding-right: 16px">
                        <div class="ui basic label">Sitio web</div>
                        <input v-model="linkEmpresa" type="text"
                               placeholder="Ingrese un link al sitio web de la empresa...">
                    </div>
                    <div class="ui fluid labeled input"
                         style="margin-top: 16px; padding-left: 16px; padding-right: 16px">
                        <div class="ui basic label">Email</div>
                        <input v-model="emailEmpresa" type="email" placeholder="Ingrese el email de la empresa...">
                    </div>
                </div>
                <div class="row" style="padding: 30px">
                    <h3 class="ui left ribbon label big inverted paperviu-dark"
                        style="width: auto;margin-left: -15px">
                        <i class="user icon"></i>Informaci&oacute;n de Autenticaci&oacute;n</h3>
                </div>
                <div class="ui basic segment" style="padding-top: 0">
                    <div class="ui fluid labeled input"
                         style="padding-left: 16px; padding-right: 16px">
                        <div class="ui basic label">Username</div>
                        <input v-model="usernameEmpresa" type="text"
                               placeholder="Ingrese username o nombre de usuario con cual ingresar...">
                    </div>
                    <div class="ui fluid labeled input"
                         style="margin-top: 16px; padding-left: 16px; padding-right: 16px">
                        <div class="ui basic label">Password</div>
                        <input v-model="passwordEmpresa" type="password"
                               placeholder="Ingrese password con el cual autenticarse...">
                    </div>
                </div>
                <div class="ui bottom fixed secondary menu">
                    <div class="ui basic center aligned segment border-bottom-paperviu-sky"
                         style="width: 100%; background-color: #f1f5f9">
                        <button @click="crearEmpresa"
                                class="ui button paperviu-sky hover-paperviu-63 text-paperviu-e8"><i
                                class="save icon"></i>Confirmar
                        </button>
                    </div>
                </div>
            </div>
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
                imagen: Object,
                nombreEmpresa: '',
                linkEmpresa: '',
                emailEmpresa: '',
                usernameEmpresa: '',
                passwordEmpresa: '',
                estadoEmpresa: true,
                filtro: '',
                pagina: 1,
                empresaActual: '',
                empresas: [],
                empresa: {
                    nombre: '',
                    link: '',
                    imagen: '',
                    username: '',
                    email: '',
                    estado: false,
                    imagenSrc: ''
                }
            }
        },
        computed: {
            altaEmpresaURL() {
                return this.$store.state.baseUrl + 'empresas?nombre=' + this.nombreEmpresa + "&link=" + this.linkEmpresa + "&username=" + this.usernameEmpresa + "&password=" + this.passwordEmpresa + "&email=" + this.emailEmpresa + "&estado=" + this.estadoEmpresa;
            },
            guardarImagenURL() {
                return this.$store.state.baseUrl + "empresas/imagen?nombre=" + this.nombreEmpresa + "&imagen=";
            },
            listarEmpresasURL() {
                return this.$store.state.baseUrl + "empresas?filtro=" + this.filtro + "&pagina=" + this.pagina;
            },
            getEmpresaURL() {
                return this.$store.state.baseUrl + "empresas/";
            },
            getEmpresas() {
                return this.$store.state.empresasList;
            },
            getEmpresaURL() {
                return this.$store.state.baseUrl + "empresas/" + this.empresaActual;
            },
            cambiarEstadoURL() {
                return this.$store.state.baseUrl + "empresas/estado?nombre=" + this.empresa.nombre + "&estado=" + this.empresa.estado;
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Empresas');
            this.$store.commit('setEmpresasList', []);
            document.title = 'Empresas';
            this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarEmpresasURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var empresas = [];
                                $.each(response, function (index, empresa) {
                                    empresas.push(empresa);
                                });
                                _this.empresas = _this.empresas.concat(empresas);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            listarEmpresas(pagina) {
                if (pagina !== undefined) this.pagina = pagina;
                this.empresas = [];
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            mostrarNueva() {
                $('#listado').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#nueva').transition('fade in');
                    }
                });
                $('#menu2').transition('fade out');
                this.usernameEmpresa = '';
                this.passwordEmpresa = '';
            },
            mostrarListado() {
                $('#nueva').transition({
                    animation: 'fade out',
                    onComplete: function () {
                        $('#listado').transition('fade in');
                    }
                });
                $('#menu2').transition('fade in');
                this.nombreEmpresa = '';
                this.linkEmpresa = '';
                this.usernameEmpresa = '';
                this.passwordEmpresa = '';
                this.imagen = Object;
            },
            guardarImagen() {
                if (this.imagen !== Object) {
                    this.mostrarGuardandoImagen();
                    var dpb = new Dropbox({accessToken: dropbox.token});
                    var _this = this;
                    dpb.filesUpload({
                        path: '/Aplicaciones/empresas/' + _this.nombreEmpresa + _this.imagen.name.substring(_this.imagen.name.lastIndexOf('.'), _this.imagen.name.length),
                        contents: _this.imagen,
                        mute: true,
                        mode: {'.tag': 'overwrite'}
                    }).then(function (response) {
                        var x = JSON.parse(JSON.stringify(response));
                        $.ajax({
                            url: _this.guardarImagenURL + x.name,
                            type: 'PUT',
                            success: function (data) {
                                if (data === true || data === "true") {
                                    _this.mostrarImagenGuardada();
                                    _this.nombreEmpresa = '';
                                    _this.passwordEmpresa = '';
                                    _this.usernameEmpresa = '';
                                    _this.passwordEmpresa = '';
                                    _this.emailEmpresa = '';
                                    _this.linkEmpresa = '';
                                    _this.mostrarListado();
                                    _this.listarEmpresas(1);
                                } else _this.mostrarErrorGuardarImagen();
                            },
                            error: function (xhr, status, errorData) {
                                _this.mostrarErrorGuardarImagen();
                            }
                        });
                    }).catch(function (error) {
                        _this.mostrarErrorGuardarImagen();
                    });
                }
            },
            getEmpresa() {
                if (this.empresaActual !== "") {
                    var _this = this;
                    $.get(this.getEmpresaURL, function (response) {
                        if (response !== undefined) {
                            _this.empresa.nombre = response.nombre;
                            _this.empresa.link = response.link;
                            _this.empresa.email = response.usuario.email;
                            _this.empresa.username = response.usuario.username;
                            _this.empresa.estado = response.estado;
                            _this.empresa.imagen = response.imagen;
                            _this.empresa.imagenSrc = '';
                            _this.getImagen();
                        }
                    });
                }
            },
            crearEmpresa() {
                this.mostrarCreandoEmpresa();
                var _this = this;
                $.post(this.altaEmpresaURL, function (response) {
                    if (response === true || response === "true") {
                        _this.mostrarEmpresaCreada();
                        if (_this.imagen !== Object) _this.guardarImagen();
                        else {
                            _this.nombreEmpresa = '';
                            _this.passwordEmpresa = '';
                            _this.usernameEmpresa = '';
                            _this.passwordEmpresa = '';
                            _this.emailEmpresa = '';
                            _this.linkEmpresa = '';
                            _this.mostrarListado();
                            _this.listarEmpresas(1);
                        }
                    } else _this.mostrarErrorCrearEmpresa();
                }).fail(function () {
                    _this.mostrarErrorCrearEmpresa();
                });
            },
            cambiarEstado() {
                if (this.empresa.nombre !== '') {
                    var _this = this;
                    _this.mostrarInfo("Actualizando estado...");
                    $.ajax({
                        url: _this.cambiarEstadoURL,
                        type: 'PUT',
                        success: function (response) {
                            if (response === true || response === "true") _this.mostrarExito("Estado actualizado!");
                            else _this.mostrarError("No se pudo actualizar el estado");
                        },
                        error: function () {
                            _this.mostrarError("No se pudo actualizar el estado");
                        }
                    });
                }
            },
            getImagen() {
                if (this.empresa.imagen !== null && this.empresa.imagen !== "null" && this.empresa.imagen !== "") {
                    var _this = this;
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesGetTemporaryLink({path: '/Aplicaciones/empresas/' + this.empresa.imagen})
                        .then(function (response) {
                            if (response !== undefined && response.link !== undefined && response.link !== "") {
                                _this.empresa.imagenSrc = response.link;
                            }
                        });
                }
            },
            mostrarCreandoEmpresa() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Creando empresa...</h3>", noty.info);
            },
            mostrarEmpresaCreada() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Empresa creada correctamente!</h3>", noty.success);
            },
            mostrarErrorCrearEmpresa() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo crear la empresa.</h3>", noty.error);
            },
            mostrarGuardandoImagen() {
                this.$noty.info("<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>Guardando imagen...</h3>", noty.info);
            },
            mostrarImagenGuardada() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Imagen guardada!</h3>", noty.success);
            },
            mostrarErrorGuardarImagen() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo guardar la imagen.</h3>", noty.error);
            },
            mostrarEstadoCambiado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Estado actualizado!</h3>", noty.success);
            },
            mostrarErrorCambiarEstado() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo actualizar el estado.</h3>", noty.error);
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