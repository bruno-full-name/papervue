<template>
    <div>
        <div v-if="empresa.imagen !== '' && empresa.imagen != null" class="row">
            <div v-if="imagenSrc === ''" class="bkg3">
                <div class="transp5"></div>
            </div>
            <div v-else :style="{backgroundImage: 'url(' + imagenSrc + ')'}" class="bkg4">
                <div class="transp5"></div>
            </div>
        </div>
        <div class="ui four column stackable grid border-top-paperviu-sky" style="margin: 0">
            <div @click="$router.push('reportes')"
                 class="ui center aligned column paperviu-e8 text-paperviu-d7 hover-paperviu-e4 hover-text-paperviu-sky"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="pie chart icon text-paperviu-sky"></i></h3>
                <h1 class="ui header" style="margin: 0; color: inherit;">Reportes</h1>
            </div>
            <div @click="$router.push('contenidos')"
                 class="ui center aligned column paperviu-e8 text-paperviu-d7 hover-paperviu-e4 hover-text-paperviu-sky"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="film icon text-paperviu-sky"></i></h3>
                <h1 class="ui header" style="margin: 0; color: inherit">Contenidos</h1>
            </div>
            <div @click="$router.push('perfil')"
                 class="ui center aligned column paperviu-e8 text-paperviu-d7 hover-paperviu-e4 hover-text-paperviu-sky"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i
                        class="user outline circle icon text-paperviu-sky"></i></h3>
                <h1 class="ui header" style="margin: 0; color: inherit">Perfil</h1>
            </div>
            <div @click="$router.push('retiros')"
                 class="ui center aligned column paperviu-e8 text-paperviu-d7 hover-paperviu-e4 hover-text-paperviu-sky"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i
                        class="dollar icon text-paperviu-sky"></i></h3>
                <h1 class="ui header" style="margin: 0; color: inherit">Retiros</h1>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';

    export default {
        data() {
            return {
                imagenSrc: ''
            }
        },
        computed: {
            empresa() {
                return this.$store.state.empresa;
            },
        },
        mounted() {
            this.$store.commit('setVistaActual', 'Inicio');
            document.title = 'Inicio';
            this.cargarImgEmpresa();
        },
        methods: {
            cargarImgEmpresa() {
                if (this.empresa.imagen !== null && this.empresa.imagen !== "null" && this.empresa.imagen !== '') {
                    var _this = this;
                    var dbx = new Dropbox({accessToken: dropbox.token});
                    dbx.filesGetTemporaryLink({path: '/Aplicaciones/empresas/' + _this.empresa.imagen})
                        .then(function (response) {
                            if (response !== undefined && response.link !== undefined && response.link !== '') _this.imagenSrc = response.link;
                        });
                }
            }
        }
    }
</script>