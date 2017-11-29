<template>
    <div>
        <div id="menu2" class="ui secondary pointing large menu inverted border-bottom-paperviu-sky"
             style="border-left-style: none; border-right-style: none;margin: 0; background-color: #3e444a">
            <div class="ui container">
                <div class="ui active border-bottom-paperviu-sky paperviu-d7 item">
                    <div class="ui transparent icon input inverted large" style="padding: 5px">
                        <i @click="listarClientes(1)" class="search link icon"></i>
                        <input style="height: 30px" v-model="filtro"
                               @keyup.enter="listarClientes(1)"
                               placeholder="Buscar clientes..." type="text">
                    </div>
                </div>
            </div>
        </div>
        <div class="ui center aligned container" style="margin-top: 30px">
            <table class="ui very basic very padded table">
                <thead>
                <tr>
                    <th class="ui header text-paperviu-dark centered">Estado</th>
                    <th class="ui header text-paperviu-dark centered">Username</th>
                    <th class="ui header text-paperviu-dark centered">Email</th>
                    <th class="ui header text-paperviu-dark centered">Nombre</th>
                    <th class="ui header text-paperviu-dark centered">Apellido</th>
                </tr>
                </thead>
                <tbody>
                <template v-for="usu in this.$store.state.usuariosList">
                    <tr class="ui centered header small text-paperviu-dark hover-paperviu-e8" style="font-weight: 200">
                        <td>
                            <div class="ui toggle checkbox">
                                <input v-model="usu.estado" type="checkbox"
                                       @click="cambiarEstado(usu.username, !usu.estado)"> <label></label>
                            </div>
                        </td>
                        <td>{{ usu.username.trim() }}</td>
                        <td>{{ usu.email.trim() }}</td>
                        <td>{{ usu.nombre.trim() }}</td>
                        <td>{{ usu.apellido.trim() }}</td>
                    </tr>
                </template>
                </tbody>
            </table>
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
</template>
<script>
    import {noty} from '../noty';
    import InfiniteLoading from 'vue-infinite-loading';

    export default {
        data() {
            return {
                pagina: 1,
                filtro: '',
                usernameActual: '',
                estadoActual: ''
            }
        },
        computed: {
            listarClientesURL() {
                return this.$store.state.baseUrl + "usuarios?usuario=" + this.filtro + "&tipo=1&pagina=" + this.pagina;
            },
            cambiarEstadoURL() {
                return this.$store.state.baseUrl + "usuarios/estado?username=" + this.usernameActual + "&estado=" + this.estadoActual;
            }
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Clientes');
            document.title = 'Clientes';
            this.$store.commit('setUsuariosList', []);
        },
        methods: {
            infiniteHandler($state) {
                var _this = this;
                setTimeout(() => {
                    $.get(_this.listarClientesURL, function (response) {
                        if (response !== undefined) {
                            if (response.length >= 1) {
                                var usuarios = [];
                                $.each(response, function (index, usuario) {
                                    usuarios.push({
                                        id: index,
                                        nombre: usuario.nombre,
                                        apellido: usuario.apellido,
                                        email: usuario.email,
                                        username: usuario.username,
                                        estado: usuario.estado
                                    });
                                });
                                _this.$store.state.usuariosList = _this.$store.state.usuariosList.concat(usuarios);
                                $state.loaded();
                                _this.pagina += 1;
                            } else $state.complete();
                        } else $state.complete();
                    });
                }, 1000);
            },
            listarClientes(pagina) {
                if (pagina !== undefined) this.pagina = pagina;
                this.$store.commit('setUsuariosList', []);
                this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset');
            },
            cambiarEstado(username, estado) {
                this.usernameActual = username;
                this.estadoActual = estado;
                var _this = this;
                $.ajax({
                    url: _this.cambiarEstadoURL,
                    type: 'PUT',
                    success: function (response) {
                        if (response !== undefined) {
                            if (response === true || response === "true") _this.mostrarEstadoCambiado();
                            else _this.mostrarEstadoCambiado();
                        } else _this.mostrarEstadoCambiado();
                    },
                    error: function () {
                        _this.mostrarErrorCambiarEstado();
                    }
                });
            },
            mostrarEstadoCambiado() {
                this.$noty.success("<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>Estado actualizado!</h3>", noty.success);
            },
            mostrarErrorCambiarEstado() {
                this.$noty.error("<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>No se pudo actualizar el estado.</h3>", noty.error);
            }
        },
        components: {
            InfiniteLoading
        }
    }
</script>