<template>
    <div class="ui item column">
        <div class="content">
            <div class="bkg3" v-if="imagenSrc === ''">
                <div class="transp5"></div>
            </div>
            <div class="bkg4" v-else-if="imagenSrc !== ''" :style="{backgroundImage: 'url(' + imagenSrc + ')'}">
                <div class="transp5"></div>
            </div>
            <div class="row border-top-paperviu-sky"
                 style="padding-top: 16px; padding-right: 16px; padding-left: 16px; background-color: #e8eef5">
                <h1 @click="$router.push('reproducir?cont=' + id)"
                    class="ui title header text-paperviu-d7 hover-text-paperviu-sky massive item"
                    style="margin-top: 0; cursor: pointer; margin-bottom: 7px">{{ titulo }}</h1>
                <div class="meta" style="margin-top: 7px">
                    <span class="ui sub header text-paperviu-dark huge" style="font-weight: 500"><i
                            class="tag text-paperviu-d7 icon"></i>{{ tipo || 'Desconocido' }}</span>
                </div>
                <div class="meta" style="margin-top: 8px">
                    <span class="ui sub header text-paperviu-dark huge" style="font-weight: 500"><i
                            class="calendar text-paperviu-d7 icon"></i>{{ fecha || 'Desconocido' }}</span>
                </div>
                <div class="meta" style="margin-top: 7px">
                    <span class="ui sub header text-paperviu-dark huge" style="font-weight: 500"><i
                            class="user circle outline text-paperviu-d7 icon"></i>{{ empresa || 'Desconocido' }}</span>
                </div>
                <div class="ui secondary borderless pointing relaxed menu" style="border: 0">
                    <div class="ui item" style="margin: 0">
                        <div :id="id" class="ui huge star rating"></div>
                    </div>
                    <div class="ui item" style="margin: 0">
                        <div :id="id + 'fav'" class="ui huge heart rating"></div>
                    </div>
                    <a :id="id + 'popupBtn'" @click="popupCompartir(id + 'popupBtn', id + 'popup')" class="ui item text-paperviu-63 hover-text-paperviu-sky" style="margin: 0"><i class="share large icon"></i></a>
                </div>
            </div>
            <div :id="id + 'popup'" class="ui transition hidden basic flowing popup paperviu-e8" style="margin: 0; padding: 5px">
                <paperviu-compartir :titulo="titulo" :idContenido="id"></paperviu-compartir>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';

    export default {
        data() {
            return {
                puntajeActual: 0,
                imagenSrc: ''
            }
        },
        props: ['id', 'titulo', 'fecha', 'tipo', 'empresa', 'valoracion', 'imagen'],
        computed: {
            agregarValoracionURL() {
                return this.$store.state.baseUrl + "valoraciones?idCont=" + this.id + "&username=" + this.usuario.username + "&puntaje=" + this.puntajeActual;
            },
            usuario() {
                return this.$store.state.usuario;
            },
            agregarFavoritoURL() {
                return this.$store.state.baseUrl + "favoritos?idCont=" + this.id + "&username=" + this.usuario.username;
            },
            quitarFavoritoURL() {
                return this.$store.state.baseUrl + "favoritos/" + this.favoritoActual.id;
            },
            getFavoritos() {
                return this.$store.state.favoritosList;
            },
            isFavorito() {
                return this.getFavoritos.find(fav => fav.idContenido === this.id) !== undefined;
            },
            favoritoActual() {
                return this.getFavoritos.find(fav => fav.idContenido === this.id);
            }
        },
        mounted() {
            var _this = this;
            if (this.imagen !== undefined && this.imagen !== null && this.imagen !== "null" && this.imagen !== "") this.getImagen();
            $('#' + this.id)
                .rating({enable: true, maxRating: 5})
                .rating('set rating', this.valoracion || 0)
                .rating('setting', 'onRate', function (value) {
                    _this.puntajeActual = value;
                    _this.$emit('valorandoContenido');
                    $.post(_this.agregarValoracionURL, function (response) {
                        if (response !== undefined) {
                            if (response === true || response === "true") _this.$emit('contenidoValorado');
                            else _this.$emit('errorValorarContenido');
                        } else _this.$emit('errorValorarContenido');
                    }).fail(function () {
                        _this.$emit('errorValorarContenido');
                    });
                });
            $('#' + this.id + 'fav')
                .rating({enable: true, maxRating: 1})
                .rating('set rating', this.isFavorito ? 1 : 0)
                .rating('setting', 'onRate', function (value) {
                    if (_this.isFavorito) {
                        _this.$emit('eliminandoFavorito');
                        $.ajax({
                            type: 'DELETE',
                            url: _this.quitarFavoritoURL,
                            success: function (response) {
                                if (response !== undefined) {
                                    if (response === true || response === "true") {
                                        _this.$emit('favoritoEliminado');
                                        _this.$store.commit('quitarFavorito', _this.favoritoActual.id);
                                    }
                                    else _this.$emit('errorEliminarFavorito');
                                } else _this.$emit('errorEliminarFavorito');
                            },
                            error: function () {
                                _this.$emit('errorEliminarFavorito');
                            }
                        });
                    } else {
                        _this.$emit('agregandoFavorito');
                        $.post(_this.agregarFavoritoURL, function (response) {
                            if (response !== undefined) {
                                if (response.id !== undefined && response.id !== "") {
                                    _this.$emit('favoritoAgregado');
                                    _this.$store.commit('agregarFavorito', {
                                        id: response.id,
                                        titulo: _this.titulo,
                                        idContenido: _this.id
                                    });
                                } else _this.$emit('errorAgregarFavorito');
                            }
                        }).fail(function () {
                            _this.$emit('errorAgregarFavorito');
                        });
                    }
                });
        },
        methods: {
            popupCompartir(id, popup) {
                $('#' + id).popup({
                    popup: $('#' + popup),
                    inline: true,
                    on: 'click'
                }).popup('show');
            },
            getImagen() {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + this.id + '/' + this.imagen})
                    .then(function (response) {
                        if (response !== undefined && response.link !== undefined && response.link !== "") {
                            _this.imagenSrc = response.link;
                        }
                    });
            },
        }
    }
</script>