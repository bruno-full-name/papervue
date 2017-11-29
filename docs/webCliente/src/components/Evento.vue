<template>
    <div></div>
</template>
<script>
    import {pusherjs} from '../pusher_key';
    import Pusher from 'pusher-js';
    import {noty} from '../noty';

    const pusher = new Pusher(pusherjs.key, {
        cluster: 'us2',
        encrypted: true
    });
    export default {
        data() {
            return {}
        },
        computed: {
            usuario() {
                return this.$store.state.usuario;
            }
        },
        mounted() {
            var _this = this;
            var channelAmistades = pusher.subscribe("amistades");
            channelAmistades.bind('nueva', function (data) {
                if (_this.$store.state.vistaActual !== "Perfil")
                    if (data.usernameReceptor === _this.usuario.username)
                        _this.mostrarSolicitudRecibida(data.nombreEmisor);
            });
            channelAmistades.bind('aceptada', function (data) {
                if (_this.$store.state.vistaActual !== "Perfil")
                    if (data.usernameEmisor === _this.usuario.username)
                        _this.mostrarSolicitudAceptada(data.nombreReceptor);
            });
        },
        methods: {
            mostrarSolicitudRecibida(nombreCompleto) {
                this.$noty.info("<h3 class=\"ui inverted header\">" + nombreCompleto + "<br><span class=\"text-paperviu-e8\" style=\"font-weight: 500;\">Le ha enviado una solicitud de amistad!</span></h3>", noty.info);
            },
            mostrarSolicitudAceptada(nombreCompleto) {
                this.$noty.info("<h3 class=\"ui inverted header\">" + nombreCompleto + "<br><span class=\"text-paperviu-e8\" style=\"font-weight: 500;\">Acept&oacute; tu solicitud de amistad!</span></h3>", noty.info);
            }
        }
    }
</script>