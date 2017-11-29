<template>
    <div style="background-color: #3e444a">
        <div class="row paperviu-sky border-bottom-paperviu-dark"
             style="margin-top: -3px">
            <div class="bkg3">
                <div class="transp7">
                    <div class="ui center aligned text container" style="padding: 40px">
                        <img src="src/assets/paperviu-darkblue.png" style="height: 60px">
                        <div class="row" style="padding: 30px">
                            <div class="ui transparent icon big inverted fluid input paperviu-63" style="padding: 5px">
                                <input @keyup.enter="$router.push('explorar?cont=' + filtro); filtro = ''" v-model="filtro"
                                       style="height: 40px; margin-left: 10px" type="text" placeholder="Buscar contenidos...">
                                <i @click="$router.push('explorar?cont=' + filtro); filtro = ''" class="search link icon"
                                   style="margin-right: 10px"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="mostrarDestacados" class="row border-bottom-paperviu-sky">
            <flickity ref="flickity" :options="flickityOptions">
                <paperviu-contenido-destacado
                        class="carousel-cell"
                        v-for="(contenido, index) in contenidosDestacados"
                        :key="index"
                        :titulo="contenido.titulo"
                        :imagen="contenido.imagen"
                        :id="contenido.id"
                        :empresa="contenido.empresa"
                        :tipo="contenido.tipo"
                        :valoracion="contenido.valoracion"
                ></paperviu-contenido-destacado>
            </flickity>
        </div>
        <div v-show="reproduccion.idVideo !== '' && reproduccion.idContenido !== ''" class="row" style="padding: 50px">
            <div class="ui two column stackable grid container paperviu-dark" style="margin: 0">
                <div class="column border-left-paperviu-sky">
                    <div class="ui left ribbon label paperviu-sky">
                        <h3 class="text-paperviu-e8"><i class="clock icon text-paperviu-e4"></i>Seguir viendo</h3>
                    </div>
                    <h1 v-if="reproduccion.idVideo === 0 || reproduccion.idVideo === '0'"
                        @click="$router.push('reproducir?cont=' + reproduccion.idContenido + '&offset=' + reproduccion.tiempo)"
                        class="ui header inverted hover-text-paperviu-sky"
                        style="padding-left: 10px; font-size: 45px; font-weight: 500; margin: 0; cursor: pointer">
                        {{reproduccion.titulo}}</h1>
                    <h1 v-else
                        @click="$router.push('reproducir?cont=' + reproduccion.idContenido + '&offset=' + reproduccion.tiempo + '&video=' + reproduccion.idVideo)"
                        class="ui header inverted hover-text-paperviu-sky"
                        style="padding-left: 10px; font-size: 45px; font-weight: 500; margin: 0; cursor: pointer">
                        {{reproduccion.titulo}}</h1>
                    <h2 class="ui header text-paperviu-e8"
                        style="padding-left: 10px; margin: 0; font-weight: 500">
                        {{reproduccion.fecha}}</h2>
                </div>
                <div class="column">
                    <div v-if="reproduccion.imagenSrc === ''" class="bkg3">
                        <div class="transp5"></div>
                    </div>
                    <div v-else :style="{backgroundImage: 'url(' + reproduccion.imagenSrc + ')'}" class="bkg4">
                        <div class="transp5"></div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="recomendaciones.length > 0" class="row">
            <flickity ref="flickity" :options="flickityOptions2">
                <paperviu-contenido-item
                        class="carousel-cell2"
                        v-for="(recomendacion, index) in recomendaciones"
                        :key="index"
                        :id="recomendacion.id"
                        :titulo="recomendacion.titulo"
                        :empresa="recomendacion.empresa"
                        :tipo="recomendacion.tipo"
                        :valoracion="recomendacion.valoracion"
                        :imagen="recomendacion.imagen"
                        :fecha="recomendacion.fecha"
                ></paperviu-contenido-item>
            </flickity>
        </div>
        <div v-if="getTipos.length > 0" class="ui container" style="margin-top: 50px">
            <h1 class="ui header text-paperviu-e8" style="padding: 20px"><i
                    class="sitemap icon text-paperviu-sky"></i>Buscar contenidos por tipo.</h1>
        </div>
        <div v-if="getTipos.length > 0" class="row paperviu-dark border-top-paperviu-sky">
            <flickity ref="flickity" :options="flickityOptions3">
                <template v-for="tipo in getTipos">
                    <div @click="$router.push('explorar?tipo=' + tipo.nombre)"
                         class="ui item text-paperviu-e8 hover-text-paperviu-sky hover-paperviu-d7 carousel-cell3"
                         style="padding: 50px; cursor: pointer">
                        <h1 class="ui header vertically centered"
                            style="color: inherit; font-weight: 500; font-size: 35px; padding: 50px">
                            {{tipo.nombre}}</h1>
                    </div>
                </template>
            </flickity>
        </div>
        <div v-if="getCategorias.length > 0" class="ui container" style="margin-top: 50px">
            <h1 class="ui header text-paperviu-e8" style="padding: 20px"><i
                    class="tags icon text-paperviu-sky"></i>Buscar contenidos por categor&iacute;a.</h1>
        </div>
        <div v-if="getCategorias.length > 0" class="row paperviu-dark border-top-paperviu-sky">
            <flickity v-if="getTipos.length > 0" ref="flickity" :options="flickityOptions3">
                <template v-for="cat in getCategorias">
                    <div @click="$router.push('explorar?cat=' + cat.nombre)"
                         class="ui item text-paperviu-e8 hover-text-paperviu-sky hover-paperviu-d7 carousel-cell3"
                         style="padding: 50px; cursor: pointer">
                        <h1 class="ui header vertically centered"
                            style="color: inherit; font-weight: 500; font-size: 35px; padding: 50px">{{cat.nombre}}</h1>
                    </div>
                </template>
            </flickity>
        </div>
    </div>
</template>
<script>
    import Flickity from 'vue-flickity';
    import {dropbox} from '../dropbox_token';

    export default {
        data() {
            return {
                mostrarDestacados: false,
                flickityOptions: {
                    initialIndex: 1,
                    prevNextButtons: true,
                    cellSelector: '.carousel-cell',
                    wrapAround: true,
                    autoPlay: true
                },
                flickityOptions2: {
                    initialIndex: 1,
                    prevNextButtons: true,
                    cellSelector: '.carousel-cell2',
                    wrapAround: true,
                    autoPlay: true,
                    groupCells: '80%',
                    cellAlign: 'center',
                    pageDots: false
                },
                flickityOptions3: {
                    initialIndex: 1,
                    prevNextButtons: true,
                    cellSelector: '.carousel-cell3',
                    wrapAround: true,
                    autoPlay: true,
                    groupCells: 2,
                    cellAlign: 'center',
                    pageDots: false
                },
                recomendaciones: [],
                reproduccion: {
                    titulo: '',
                    idContenido: '',
                    idVideo: '',
                    tiempo: '',
                    fecha: '',
                    imagen: '',
                    imagenSrc: ''
                },
                filtro: ''
            }
        },
        mounted() {
            document.title = "Inicio";
            this.$store.commit('setVistaActual', 'Inicio');
            this.$store.commit('setContenidosDestacados', []);
            this.getContenidosDestacados();
            this.reproduccion = {
                titulo: '',
                idContenido: '',
                idVideo: '',
                tiempo: '',
                fecha: '',
                imagen: '',
                imagenSrc: ''
            };
            this.getUltimaReproduccion();
            this.getRecomendaciones();
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            getTipos() {
                return this.$store.state.tiposList;
            },
            getCategorias() {
                return this.$store.state.categoriasList;
            },
            contenidosDestacados() {
                return this.$store.state.contenidosDestacados;
            },
            getContenidosDestacadosURL() {
                return this.$store.state.baseUrl + "contenidos/destacados";
            },
            getUltimaReproduccionURL() {
                return this.$store.state.baseUrl + "reproducciones/ultima/" + this.usuario.username;
            },
            getRecomendacionesURL() {
                return this.$store.state.baseUrl + "recomendaciones?username=" + this.usuario.username;
            }
        },
        methods: {
            getRecomendaciones() {
                if (this.usuario.username !== '') {
                    var _this = this;
                    $.get(this.getRecomendacionesURL, function (response) {
                        if (response !== undefined) {
                            $.each(response, function (index, contenido) {
                                var fecha = new Date(contenido.fecha);
                                _this.recomendaciones.push({
                                    id: contenido.id,
                                    tipo: contenido.tipo,
                                    titulo: contenido.titulo,
                                    imagen: contenido.imagen,
                                    fecha: fecha.getDate() + "/" + (fecha.getMonth() + 1) + "/" + fecha.getFullYear(),
                                    empresa: contenido.empresa,
                                    valoracion: contenido.valoracion
                                });
                            });
                        }
                    });
                }
            },
            getContenidosDestacados() {
                var _this = this;
                $.get(this.getContenidosDestacadosURL, function (response) {
                    if (response !== undefined) {
                        var contenidos = [];
                        $.each(response, function (index, contenido) {
                            contenidos.push({
                                id: contenido.id,
                                titulo: contenido.titulo,
                                imagen: contenido.imagen,
                                valoracion: contenido.valoracion,
                                empresa: contenido.empresa,
                                tipo: contenido.tipo
                            });
                        });
                        _this.$store.commit('setContenidosDestacados', contenidos);
                        _this.mostrarDestacados = true;
                    }
                });
            },
            getUltimaReproduccion() {
                if (this.usuario.username !== '') {
                    var _this = this;
                    $.get(this.getUltimaReproduccionURL, function (response) {
                        if (response !== undefined && response !== null && response !== "null") {
                            var fecha = new Date(response.fechaHora);
                            var f = fecha.getDate() + "/" + (fecha.getMonth() + 1) + "  " + fecha.getHours() + ":" + fecha.getMinutes();
                            _this.reproduccion.idContenido = response.idCont;
                            _this.reproduccion.tiempo = Number(response.minuto);
                            _this.reproduccion.fecha = f;
                            _this.reproduccion.titulo = response.titulo;
                            _this.reproduccion.idVideo = response.idVideo;
                            _this.reproduccion.imagen = response.imagen;
                            if (response.imagen !== undefined && response.imagen !== null && response.imagen !== "null" && response.imagen !== "") _this.getImagen();
                        }
                    });
                }
            },
            getImagen() {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + _this.reproduccion.idContenido + '/' + _this.reproduccion.imagen})
                    .then(function (response) {
                        if (response !== undefined && response.link !== undefined && response.link !== "") {
                            _this.reproduccion.imagenSrc = response.link;
                        }
                    });
            },
        },
        components: {
            Flickity
        }
    }
</script>
<style>
    .carousel-cell {
        width: 100%; /* full width */
        height: 600px; /* height of carousel */
    }

    .carousel-cell2 {
        width: 50%;
        height: 400px; /* height of carousel */
    }

    .carousel-cell3 {
        width: 50%;
        height: 250px; /* height of carousel */
    }

    .flickity-page-dots {
        bottom: 15px;
    }

    /* white circles */
    .flickity-page-dots .dot {
        width: 12px;
        height: 12px;
        opacity: 1;
        background: transparent;
        border: 2px solid white;
    }

    /* fill-in selected dot */
    .flickity-page-dots .dot.is-selected {
        background: white;
    }
</style>