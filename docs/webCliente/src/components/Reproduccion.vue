<template>
    <div>
        <div id="videosSidebar" class="ui secondary vertical menu borderless inverted right sidebar"
             style="background-color: #3e444a">
            <template v-for="video in contenidoActual.videos">
                <a @click="reproducirVideo(video.ruta, video.id, video.tipo)"
                   class="ui item hover-paperviu-dark"
                   style="margin: 0; padding: 16px">
                    <span class="ui header text-paperviu-sky" style="margin: 0; padding: 0;">{{ video.numero + "."
                        }}</span>
                    <span class="ui header inverted" style="font-weight: 500">{{video.titulo}}</span>
                </a>
            </template>
        </div>
        <div v-if="contenidoActual.enVivo" id="chatSidebar"
             class="ui secondary vertical menu borderless inverted right big sidebar"
             style="background-color: #3e444a">
            <paperviu-chat :idContenido="idContenido"></paperviu-chat>
        </div>
        <div class="pusher" style="padding-bottom: 50px">
            <div id="reproductor" class="row" style="background-color: #3e444a">
                <div class="ui blurring dimmable basic segment" style="padding: 0">
                    <div v-if="contenidoActual.payperview" :class="{active: puedeVerPago === false}" class="ui dimmer">
                        <div class="ui center aligned text container"
                             style="padding: 50px">
                            <img src="src/assets/paperviu-skyblue.png" style="height: 60px">
                            <h1 class="ui inverted header" style="margin: 0">Contenido Pay-Per-View.</h1>
                            <h2 class="ui inverted header text-paperviu-e4" style="margin: 0; font-weight: 500;">
                                Debes pagar este contenido en particular.</h2>
                        </div>
                    </div>
                    <div v-if="!contenidoActual.payperview" :class="{active: puedeVerSuscripcion === false}"
                         class="ui dimmer">
                        <div class="ui center aligned text container"
                             style="padding: 50px">
                            <img src="src/assets/paperviu-skyblue.png" style="height: 60px">
                            <h1 class="ui inverted header" style="margin: 0">Suscripci&oacute;n requerida</h1>
                            <h2 class="ui inverted header text-paperviu-e4" style="margin: 0; font-weight: 500;">
                                Debes suscribirte para poder ver este contenido.</h2>
                            <button @click="$router.push('suscripciones')" class="ui huge compact inverted basic button"
                                    style="margin-top: 20px">
                                <i class="signup icon"></i>Suscribirme
                            </button>
                        </div>
                    </div>
                    <div class="ui container" style="margin-right: 0">
                        <VueMediaElement></VueMediaElement>
                    </div>
                </div>
            </div>
            <div v-if="contenidoActual.imagenSrc === ''">
                <div class="transp4 border-top-paperviu-sky">
                    <div class="ui container massive">
                        <div class="ui secondary menu" style="margin: 0">
                            <div class="right right floated menu">
                                <button v-if="contenidoActual.videos.length > 0 && (this.puedeVerSuscripcion || this.puedeVerPago)"
                                        @click="toggleVideosSidebar"
                                        class="ui button attached paperviu-sky text-paperviu-e7 large"><i
                                        class="list icon"></i>Videos
                                </button>
                                <button v-if="contenidoActual.enVivo && (this.puedeVerSuscripcion || this.puedeVerPago)"
                                        @click="toggleChatSidebar"
                                        class="ui button attached paperviu-sky text-paperviu-e7 large"><i
                                        class="comments icon"></i>Chat
                                </button>
                            </div>
                        </div>
                        <h1 class="ui header inverted" style="font-size: 45px; margin: 0">
                            {{ contenidoActual.titulo}}</h1>
                    </div>
                </div>
            </div>
            <div v-else :style="{backgroundImage: 'url(' + contenidoActual.imagenSrc + ')'}" class="bkg2"
                 style="margin: 0; padding: 0">
                <div class="transp4 border-top-paperviu-sky" style="margin-top: 0px">
                    <div class="ui container massive">
                        <div class="ui secondary menu" style="margin: 0">
                            <div class="right right floated menu">
                                <button v-if="contenidoActual.videos.length > 0 && (this.puedeVerSuscripcion || this.puedeVerPago)"
                                        @click="toggleVideosSidebar"
                                        class="ui button attached paperviu-sky text-paperviu-e7 large"><i
                                        class="list icon"></i>Videos
                                </button>
                                <button v-if="contenidoActual.enVivo && (this.puedeVerSuscripcion || this.puedeVerPago)"
                                        @click="toggleChatSidebar"
                                        class="ui button attached paperviu-sky text-paperviu-e7 large"><i
                                        class="comments icon"></i>Chat
                                </button>
                            </div>
                        </div>
                        <h1 class="ui header inverted" style="font-size: 45px; margin-top: 0; margin-left: 20px">
                            {{ contenidoActual.titulo}}</h1>
                    </div>
                </div>
            </div>
            <div class="row paperviu-dark">
                <div class="ui stackable two column relaxed grid container" style="padding: 20px">
                    <div class="column" style="padding: 0">
                        <div class="row border-top-paperviu-sky" style="background-color: #f1f5f9">
                            <div class="ui row" style="padding: 16px; margin-top: 10px">
                                <h3 class="ui header text-paperviu-sky">
                                    <i :class="{star: contenidoActual.valoracion === '', frown: contenidoActual.valoracion < 3, meh: contenidoActual.valoracion === 3, smile: contenidoActual.valoracion > 3}"
                                       class="icon text-paperviu-d7"></i>Valoraci&oacute;n
                                </h3>
                                <div id="promedio" class="ui huge star rating" style="margin-left: 16px"></div>
                            </div>
                            <div v-show="contenidoActual.descripcion !== undefined && contenidoActual.descripcion !== ''"
                                 class="ui row" style="padding: 16px">
                                <h3 class="ui header text-paperviu-sky"><i class="quote left text-paperviu-d7 icon"></i>Descripci&oacute;n
                                </h3>
                                <h3 class="ui header text-paperviu-dark"
                                    style="font-weight: 500; padding: 10px; margin: 0">
                                    {{ contenidoActual.descripcion || '' }}</h3>
                            </div>
                        </div>
                        <div v-show="contenidoActual.payperview" class="row border-top-paperviu-sky"
                             style="background-color: #f1f5f9; margin-top: 20px">
                            <div class="ui row" style="padding: 16px; margin-top: 10px">
                                <h3 class="ui header text-paperviu-sky"><i class="checkmark icon text-paperviu-d7"></i>Pay-Per-View
                                </h3>
                            </div>
                            <div class="ui row" style="padding: 16px">
                                <h3 class="ui header text-paperviu-sky"><i
                                        class="dollar text-paperviu-d7 icon"></i>{{ contenidoActual.precio }}
                                </h3>
                                <div v-show="!contenidoActual.pago" id="btnPaypal"></div>
                            </div>
                        </div>
                        <div v-show="contenidoActual.categorias.length !== 0" class="ui row border-top-paperviu-sky"
                             style="padding: 16px; background-color: #f1f5f9; margin-top: 20px">
                            <h3 class="ui header text-paperviu-sky"><i class="tags text-paperviu-d7 icon"></i>Categor&iacute;as
                            </h3>
                            <div class="ui tag labels">
                                <div class="ui basic label text-paperviu-dark"
                                     v-for="categoria in contenidoActual.categorias">{{ categoria }}
                                </div>
                            </div>
                        </div>
                        <div v-show="contenidoActual.actores.length !== 0" class="ui row border-top-paperviu-sky"
                             style="padding: 16px; background-color: #f1f5f9; margin-top: 20px">
                            <h3 class="ui header text-paperviu-sky"><i class="users text-paperviu-d7 icon"></i>Actores
                            </h3>
                            <div class="ui labels">
                                <div class="ui basic label text-paperviu-dark large"
                                     v-for="actor in contenidoActual.actores">{{ actor }}
                                </div>
                            </div>
                        </div>
                        <div v-show="contenidoActual.directores.length !== 0" class="ui row border-top-paperviu-sky"
                             style="padding: 16px; background-color: #f1f5f9; margin-top: 20px">
                            <h3 class="ui header text-paperviu-sky"><i class="users text-paperviu-d7 icon"></i>Directores
                            </h3>
                            <div class="ui labels">
                                <div class="ui basic label text-paperviu-dark large"
                                     v-for="director in contenidoActual.directores">{{ director }}
                                </div>
                            </div>
                        </div>
                        <div class="row border-top-paperviu-sky" style="background-color: #f1f5f9; margin-top: 20px">
                            <div class="ui row" style="padding: 16px">
                                <h3 class="ui header text-paperviu-sky"><i
                                        class="user outline circle text-paperviu-d7 icon"></i>Empresa</h3>
                                <h3 class="ui header text-paperviu-dark"
                                    style="font-weight: 500; padding: 10px; margin: 0">
                                    {{ contenidoActual.empresa || '' }}</h3>
                            </div>
                            <div class="ui row" style="padding: 16px">
                                <h3 class="ui header text-paperviu-sky"><i class="calendar text-paperviu-d7 icon"></i>Fecha
                                </h3>
                                <h3 class="ui header text-paperviu-dark"
                                    style="font-weight: 500; padding: 10px; margin: 0">
                                    {{ contenidoActual.fecha || 'Desconocido...' }}</h3>
                            </div>
                        </div>
                        <div v-show="contenidoActual.atributos.length !== 0" class="row border-top-paperviu-sky"
                             style="background-color: #f1f5f9; margin-top: 20px">
                            <div class="ui row" style="padding: 16px">
                                <h3 class="ui header text-paperviu-sky"><i
                                        class="info circle text-paperviu-d7 icon"></i>Informaci&oacute;n Adicional</h3>
                                <div class="row" style="padding: 20px">
                                    <template v-for="atributo in contenidoActual.atributos">
                                        <div class="row border-left-paperviu-sky"
                                             style="padding: 10px; background-color: #e8eef5">
                                            <div class="ui ribbon label header inverted paperviu-d7">{{ atributo.clave
                                                }}
                                            </div>
                                            <h3 class="ui header text-paperviu-dark"
                                                style="margin-top: 7px; margin-left: 10px">{{ atributo.valor }}</h3>
                                        </div>
                                    </template>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="column" style="padding-top: 0;">
                        <div class="row border-top-paperviu-sky" style="background-color: #f1f5f9">
                            <div class="ui large comments" style="margin: 0; padding: 16px">
                                <h2 class="ui text-paperviu-sky header" style="margin: 0"><i
                                        class="comments icon text-paperviu-d7"></i>Comentarios</h2>
                                <template v-for="comentario in contenidoActual.comentarios">
                                    <div class="comment"
                                         style="background-color: #e5ecf3; padding: 10px; margin-top: 16px">
                                        <div class="content">
                                        <span class="ui author header small text-paperviu-sky">{{ comentario.username
                                            }}</span>
                                            <div class="metadata">
                                            <span class="ui sub header text-paperviu-dark large date"
                                                  style="font-weight: 600">{{ comentario.fecha + " " + comentario.hora || ''
                                                }}</span>
                                            </div>
                                            <div class="ui header small text-paperviu-dark text"
                                                 style="margin: 5px; font-weight: 500">{{comentario.texto}}
                                            </div>
                                            <div class="actions">
                                                <a class="reply">Marcar como spoiler!</a>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </div>
                            <div class="ui secondary pointing six item menu border-bottom-paperviu-sky">
                                <a @click="getComentariosAnterior" class="ui item"><i
                                        class="chevron left icon text-paperviu-sky"></i>Anterior</a>
                                <h3 class="ui item header small text-paperviu-dark">{{pagina}}</h3>
                                <a @click="getComentariosSiguiente" class="ui icon item">Siguiente<i
                                        class="chevron right icon text-paperviu-sky"
                                        style="margin-left: 7px"></i></a>
                            </div>
                        </div>
                        <div class="row border-top-paperviu-sky"
                             style="background-color: #f1f5f9; padding: 16px; margin-top: 20px">
                            <h2 class="ui text-paperviu-sky header">
                                <i class="ui icons large text-paperviu-d7" style="margin-right: 10px">
                                    <i class="comment icon"></i>
                                    <i class="corner add text-paperviu-sky icon"></i>
                                </i>Agregar Comentario</h2>
                            <form class="ui reply form">
                                <div class="field">
                                    <textarea v-model="comentario"
                                              placeholder="Ingrese aqui un comentario..."></textarea>
                                </div>
                                <div @click="agregarComentario"
                                     class="ui paperviu-d7 hover-paperviu-dark blue submit button">
                                    <i class="icon write"></i> Enviar
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';
    import {noty} from '../noty';
    import playerBus from '../playerBus';

    export default {
        props: {
            contenidoSearch: {
                type: String,
                default: ''
            },
            offset: {
                type: String,
                default: '0'
            },
            videoReproducir: {
                type: String,
                default: '0'
            }
        },
        data() {
            return {
                video: {
                    url: '',
                    pic: '',
                    currentTime: 0,
                    duracion: 0,
                },
                sources: [],
                idContenido: '',
                pagina: 1,
                puntajeActual: '',
                comentario: '',
                idReproduciendo: '',
                tiempo: 0,
                visto: 0,
                totalTime: 0,
                tokenPago: '',
                payerIdPago: '',
                paymentIdPago: '',
                puedeVerSuscripcion: false,
                puedeVerPago: false
            }
        },
        beforeDestroy() {
            this.agregarReproduccion();
            $('#chatSidebar').sidebar('hide');
            playerBus.$emit('beforeDestroy');
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Reproduccion');
            document.title = this.contenidoActual.titulo !== '' ? this.contenidoActual.titulo : 'Reproducir';
            var _this = this;
            this.visto = 0;
            this.totalTime = 0;
            this.tiempo = 0;
            playerBus.$on('whilePlaying', function (player) {
                _this.tiempo = player.currentTime;
                _this.visto += 1;
                _this.totalTime = player.duration;
            });
            this.idContenido = this.contenidoSearch;
            this.idReproduciendo = '';
            if (this.idContenido === '') {
                if (this.contenidoActual.id === undefined || this.contenidoActual.id === "") this.$router.push('explorar');
                else {
                    this.idContenido = this.contenidoActual.id;
                    if (this.contenidoActual.videos.length > 0) this.reproducirVideo(this.contenidoActual.videos[0].ruta, this.contenidoActual.videos[0].id, this.contenidoActual.videos[0].tipo);
                    if (this.contenidoActual.payperview) _this.btnPayPal();
                    if (this.contenidoActual.pago === false) this.isContenidoPago();
                    if (this.contenidoActual.pago === true && this.contenidoActual.payperview === true) this.puedeVerPago = true;
                    if (!this.contenidoActual.payperview && this.suscripto) this.puedeVerSuscripcion = true;
                    this.reproducirVideoURL();
                }
            } else _this.verContenido();
            $('#promedio')
                .rating({maxRating: 5})
                .rating('disable')
                .rating('set rating', this.contenidoActual.valoracion || 0);
            $('#videosSidebar')
                .sidebar({silent: true, context: $('#reproductor')})
                .sidebar('setting', 'dimPage', false)
                .sidebar('setting', 'transition', 'overlay');
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            },
            suscripto() {
                return this.$store.state.suscripto;
            },
            contenidoActual() {
                return this.$store.state.contenidoActual;
            },
            getContenidoURL() {
                return this.$store.state.baseUrl + "contenidos/" + this.idContenido;
            },
            getDACURL() {
                return this.$store.state.baseUrl + "contenidos/dac?idContenido=" + this.idContenido;
            },
            getComentariosURL() {
                return this.$store.state.baseUrl + "comentarios?idContenido=" + this.idContenido + "&pagina=" + this.pagina;
            },
            agregarComentarioURL() {
                return this.$store.state.baseUrl + "comentarios?idContenido=" + this.idContenido + "&username=" + this.usuario.username + "&comentario=" + this.comentario;
            },
            getVideosURL() {
                return this.$store.state.baseUrl + "contenidos/videos?idContenido=" + this.idContenido;
            },
            getAtributosURL() {
                return this.$store.state.baseUrl + "contenidos/atributos?idContenido=" + this.idContenido;
            },
            agregarReproduccionURL() {
                return this.$store.state.baseUrl + "reproducciones?username=" + this.usuario.username + "&idVideo=" + this.idReproduciendo + "&minuto=" + this.tiempo + "&visto=" + this.visto + "&totalTime=" + this.totalTime;
            },
            agregarReproduccionContenidoURL() {
                return this.$store.state.baseUrl + "reproducciones/contenido?idContenido=" + this.idContenido + "&username=" + this.usuario.username + "&minuto=" + this.tiempo + "&visto=" + this.visto + "&totalTime=" + this.totalTime;
            },
            agregarPagoURL() {
                return this.$store.state.baseUrl + "pagos/?idCont=" + this.contenidoActual.id + "&username=" + this.usuario.username + "&token=" + this.tokenPago + "&payerId=" + this.payerIdPago + "&paymentId=" + this.paymentIdPago;
            },
            isContenidoPagoURL() {
                return this.$store.state.baseUrl + "pagos?username=" + this.usuario.username + "&idCont=" + this.idContenido;
            }
        },
        methods: {
            toggleVideosSidebar() {
                $('#videosSidebar').sidebar('toggle');
            },
            toggleChatSidebar() {
                $('#chatSidebar')
                    .sidebar({silent: true})
                    .sidebar('setting', 'dimPage', false)
                    .sidebar('setting', 'transition', 'overlay').sidebar('toggle');
            },
            agregarReproduccion() {
                if (this.totalTime !== 0 && this.visto !== 0 && this.visto < this.totalTime) {
                    this.tiempo = new Number(this.tiempo).toPrecision(3);
                    if (this.idReproduciendo !== '' && this.idReproduciendo !== 0) $.post(this.agregarReproduccionURL);
                    if (this.idReproduciendo !== '' && this.idReproduciendo === 0) $.post(this.agregarReproduccionContenidoURL);
                }
            },
            reproducirVideoURL() {
                var _this = this;
                if (this.contenidoActual.url !== '' && this.contenidoActual.enVivo === true) {
                    playerBus.$emit('toPlay', {
                        type: _this.contenidoActual.tipoVideo,
                        src: _this.contenidoActual.url
                    });
                    this.tiempo = 0;
                    this.totalTime = 0;
                    this.visto = 0;
                    this.idReproduciendo = 0;
                }
            },
            verContenido() {
                this.$store.commit('setContenidoActual', {
                    id: '',
                    titulo: '',
                    descripcion: '',
                    destacado: false,
                    payperview: false,
                    fecha: '',
                    empresa: '',
                    tipo: '',
                    precio: '',
                    pago: false,
                    tipoVideo: '',
                    imagen: '',
                    enVivo: false,
                    url: '',
                    imagenSrc: '',
                    actores: [],
                    directores: [],
                    categorias: [],
                    comentarios: [],
                    atributos: [],
                    videos: [],
                    valoracion: ''
                });
                this.contenidoActual.id = this.idContenido;
                this.getContenido();
            },
            getContenido() {
                var _this = this;
                $.get(this.getContenidoURL, function (dt) {
                    if (dt !== undefined) {
                        _this.$store.commit('setContenidoActual', {
                            id: _this.idContenido,
                            titulo: dt.contenido.titulo || '',
                            descripcion: dt.contenido.descripcion || '',
                            destacado: dt.contenido.destacado,
                            payperview: dt.contenido.payperview,
                            fecha: dt.contenido.fecha || '',
                            empresa: dt.empresa || '',
                            tipo: dt.contenido.tipo.nombre || '',
                            precio: dt.contenido.precio || 0,
                            pago: false,
                            imagen: dt.contenido.portada || '',
                            enVivo: dt.contenido.tipo.enVivo,
                            url: dt.contenido.url,
                            tipoVideo: dt.contenido.tipoVideo,
                            imagenSrc: '',
                            actores: [],
                            directores: [],
                            categorias: [],
                            comentarios: [],
                            atributos: [],
                            videos: [],
                            valoracion: dt.valoracion || 0
                        });
                        if (_this.offset !== '0') {
                            if (_this.contenidoActual.enVivo) {
                                playerBus.$emit('toPlay', {
                                    type: _this.contenidoActual.tipoVideo,
                                    src: _this.contenidoActual.url
                                });
                                playerBus.$emit('setCurrentTime', Number(_this.offset));
                                _this.idReproduciendo = 0;
                            }
                        } else _this.reproducirVideoURL();
                        _this.getVideos();
                        _this.getDAC();
                        _this.getComentarios();
                        _this.getAtributos();
                        _this.isContenidoPago();
                        $('#promedio').rating('set rating', dt.valoracion);
                        if (dt.contenido.portada !== undefined && dt.contenido.portada !== null && dt.contenido.portada !== "null" && dt.contenido.portada !== "") _this.getImagen();
                        if (_this.contenidoActual.enVivo) $('#chatSidebar')
                            .sidebar({silent: true})
                            .sidebar('setting', 'dimPage', false)
                            .sidebar('setting', 'transition', 'overlay');
                        if (_this.contenidoActual.payperview === true) _this.btnPayPal();
                        document.title = _this.contenidoActual.titulo !== '' ? _this.contenidoActual.titulo : 'Reproducir';
                    }
                }).fail(function () {
                    _this.getContenido();
                });
            },
            agregarComentario() {
                this.mostrarInfo("Agregando Comentario...");
                var _this = this;
                $.post(this.agregarComentarioURL, function (response) {
                    if (response === true || response === "true") {
                        _this.comentario = "";
                        _this.pagina = 1;
                        _this.getComentarios();
                        _this.mostrarExito("Comentario Agregado!");
                    } else _this.mostrarError("No se ha podido Agregar el Comentario.");
                }).fail(function () {
                    _this.mostrarError("No se ha podido Agregar el Comentario.");
                });
            },
            getComentarios() {
                var _this = this;
                $.get(this.getComentariosURL, function (response) {
                    if (response !== undefined) {
                        var comentarios = [];
                        $.each(response, function (index, comentario) {
                            var fecha = new Date(comentario.fecha);
                            comentarios.push({
                                id: comentario.id,
                                username: comentario.username,
                                fecha: fecha.getDate() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getFullYear(),
                                hora: comentario.hora,
                                texto: comentario.comentario,
                                spoiler: comentario.spoiler
                            });
                            _this.contenidoActual.comentarios = comentarios;
                        })
                    }
                });
            },
            getComentariosSiguiente() {
                if (this.contenidoActual.comentarios.length >= 10) {
                    this.pagina += 1;
                    this.getComentarios();
                }
            },
            getComentariosAnterior() {
                if (this.pagina > 1) {
                    this.pagina -= 1;
                    this.getComentarios();
                }
            },
            getDAC() {
                var _this = this;
                $.get(this.getDACURL, function (response) {
                    if (response !== undefined) {
                        var actores = [];
                        $.each(response.actores, function (index, a) {
                            actores.push(a.actorPK.actor);
                        });
                        _this.contenidoActual.actores = actores;
                        var directores = [];
                        $.each(response.directores, function (index, d) {
                            directores.push(d.directorPK.director);
                        });
                        _this.contenidoActual.directores = directores;
                        var categorias = [];
                        $.each(response.categorias, function (index, categoria) {
                            categorias.push(categoria.nombre);
                        });
                        _this.contenidoActual.categorias = categorias;
                    }
                });
            },
            getAtributos() {
                var _this = this;
                $.get(this.getAtributosURL, function (resp) {
                    if (resp !== undefined) {
                        var atributos = [];
                        $.each(resp, function (index, atributo) {
                            atributos.push({
                                id: index,
                                clave: atributo.clave,
                                valor: atributo.valor
                            });
                        });
                        _this.contenidoActual.atributos = atributos;
                    }
                });
            },
            getVideos() {
                var _this = this;
                $.get(this.getVideosURL, function (response) {
                    if (response !== undefined) {
                        var videos = [];
                        var x = false;
                        $.each(response, function (index, video) {
                            if (video.estado !== undefined) {
                                if (video.estado === true || video.estado === "true") {
                                    videos.push({
                                        id: video.id,
                                        titulo: video.titulo,
                                        numero: video.numero,
                                        ruta: video.video,
                                        tipo: video.tipo
                                    });
                                    if (_this.videoReproducir !== '' && _this.videoReproducir === video.id) _this.reproducirVideo(video.video, video.id, video.tipo);
                                }
                            }
                        });
                        _this.contenidoActual.videos = videos;
                        if (_this.contenidoActual.videos.length > 0 && x === false) _this.reproducirVideo(_this.contenidoActual.videos[0].ruta, _this.contenidoActual.videos[0].id, _this.contenidoActual.videos[0].tipo);
                    }
                });
            },
            isContenidoPago() {
                if (this.idContenido !== '' && this.usuario.username !== '') {
                    var _this = this;
                    $.get(this.isContenidoPagoURL, function (response) {
                        _this.contenidoActual.pago = response === true || response === "true";
                    });
                }
            },
            getImagen() {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + this.idContenido + '/' + this.contenidoActual.imagen})
                    .then(function (response) {
                        if (response !== undefined && response.link !== undefined && response.link !== "") {
                            _this.contenidoActual.imagenSrc = response.link;
                        }
                    });
            },
            reproducirVideo(ruta, id, tipo) {
                if (this.idReproduciendo !== '') this.agregarReproduccion();
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + this.idContenido + '/' + ruta})
                    .then(function (response) {
                        if (response !== undefined && response.link !== undefined && response.link !== "") {
                            playerBus.$emit('toPlay', {
                                type: tipo,
                                src: response.link
                            });
                            _this.tiempo = 0;
                            _this.totalTime = 0;
                            _this.visto = 0;
                            _this.idReproduciendo = id;
                            if (_this.offset !== '0' && _this.videoReproducir == id) {
                                playerBus.$emit('setCurrentTime', Number(_this.offset));
                                playerBus.$emit('startPlay');
                            }
                        }
                    });
            },
            mostrarExito(message) {
                this.$noty.success(
                    "<h3 class=\"ui inverted header\"><i class=\"checkmark icon\"></i>" + message + "</h3>", noty.success);
            },
            mostrarInfo(message) {
                this.$noty.info(
                    "<h3 class=\"ui inverted header\"><i class=\"info icon\"></i>" + message + "</h3>", noty.info);
            },
            mostrarError(message) {
                this.$noty.error(
                    "<h3 class=\"ui inverted header\"><i class=\"warning icon\"></i>" + message + "</h3>", noty.error);
            },
            btnPayPal() {
                var _this = this;
                paypal.Button.render({
                    env: 'sandbox',
                    client: {
                        sandbox: 'AWL0KlWCTKdUorF0R4d_BD5yQXK42R_q953m3oC4-pH3NX6OylxBDzqfQneksBK_pTmaqbFo_hhtH_69'
                    },
                    commit: true,
                    payment: function (data, actions) {
                        return actions.payment.create({
                            payment: {
                                transactions: [{
                                    amount: {
                                        total: _this.contenidoActual.precio,
                                        currency: 'USD'
                                    }
                                }]
                            }
                        });
                    },
                    onAuthorize: function (data, actions) {
                        return actions.payment.execute().then(function () {
                            _this.tokenPago = data.paymentToken;
                            _this.payerIdPago = data.payerID;
                            _this.paymentIdPago = data.paymentID;
                            $.post(_this.agregarPagoURL, function (resp) {
                                if (resp !== undefined && resp === true) {
                                    _this.isContenidoPago();
                                    _this.contenidoActual.pago = true;
                                    _this.mostrarExito("Pago efectuado correctamente!");
                                } else {
                                    _this.mostrarError("No se pudo efectuar el pago");
                                }
                            });
                        });
                    }

                }, '#btnPaypal');
            }
        },
        watch: {
            suscripto(newValue, oldValue) {
                this.puedeVerSuscripcion = newValue === true && this.contenidoActual.payperview === false;
            },
            contenidoActual(newValue, oldValue) {
                var _this = this;
                setTimeout(function () {
                    _this.puedeVerSuscripcion = newValue.payperview === false && _this.suscripto === true;
                    _this.puedeVerPago = newValue.payperview === true && newValue.pago === true;
                }, 100);
                document.title = this.contenidoActual.titulo !== '' ? this.contenidoActual.titulo : 'Reproducir';
            },
            contenidoSearch(newValue, oldValue) {
                if (newValue !== oldValue && newValue !== undefined && newValue !== "") {
                    this.idContenido = this.contenidoSearch;
                    this.verContenido();
                }
            }
        }
    }
</script>