<template>
    <div class="row">
        <div class="bkg5" v-if="imagenSrc === ''">
            <div class="transp" style="padding: 32px">
                <h1 class="ui sub header text-paperviu-sky huge" style="margin: 0">{{empresa}}</h1>
                <h1 class="ui header text-paperviu-e8" style="font-size: 45px; margin: 0; cursor: pointer">{{ titulo
                    }}</h1>
                <div :id="id" class="ui huge star rating"></div>
            </div>
        </div>
        <div v-else :style="{backgroundImage: 'url(' + imagenSrc + ')'}" class="bkg6">
            <div class="transp" style="padding: 32px">
                <h1 class="ui sub header text-paperviu-sky huge" style="margin: 0">{{empresa}}</h1>
                <h1 @click="$router.push('reproducir?cont=' + id)"
                    class="ui header text-paperviu-e8 hover-text-paperviu-sky"
                    style="font-size: 45px; margin: 0; cursor: pointer">{{ titulo }}</h1>
                <div :id="id" class="ui huge star rating"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {dropbox} from '../dropbox_token';

    export default {
        props: ['id', 'titulo', 'imagen', 'valoracion', 'tipo', 'empresa'],
        data() {
            return {
                imagenSrc: ''
            }
        },
        mounted() {
            if (this.imagen !== undefined && this.imagen !== "" && this.imagen !== null && this.imagen !== "null") {
                this.getImagen();
            }
            $('#' + this.id)
                .rating({maxRating: 5})
                .rating('disable')
                .rating('set rating', this.valoracion || 0);
        },
        methods: {
            getImagen() {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + this.id + '/' + this.imagen})
                    .then(function (response) {
                        if (response !== undefined && response.link !== undefined && response.link !== "") {
                            _this.imagenSrc = response.link;
                        }
                    });
            }
        }
    }
</script>