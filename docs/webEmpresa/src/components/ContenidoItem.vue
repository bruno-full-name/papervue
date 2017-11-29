<template>
    <div class="ui column">
        <div style="background-color: #e5ecf3; padding: 0">
            <div class="row">
                <div class="bkg3" v-if="imagenSrc === ''">
                    <div class="transp5"></div>
                </div>
                <div class="bkg4" v-else-if="imagenSrc !== ''"
                     :style="{backgroundImage: 'url(' + imagenSrc + ')'}">
                    <div class="transp5"></div>
                </div>
            </div>
            <div class="row border-bottom-paperviu-sky">
                <div :id="id" class="ui huge star rating" style="padding-left: 10px; margin-top: 10px"></div>
                <h1 @click="$emit('verModificacion')" class="ui header text-paperviu-d7 hover-text-paperviu-sky"
                    style="padding-left: 10px; margin-top: 0; cursor: pointer">{{titulo}}</h1>
                <span class="ui header text-paperviu-dark small" style="padding-left: 16px">
                    <i class="calendar icon text-paperviu-sky"></i>{{fecha}}
                </span>
                <span class="ui header text-paperviu-dark small" style="margin-left: 16px">
                    <i class="tag icon text-paperviu-sky"></i>{{tipo}}
                </span>
                <div class="ui header small text-paperviu-dark" style="margin-bottom: 0; margin-left: 16px; margin-top: 16px">
                    <i :class="{'checkmark text-paperviu-sky': estado, 'warning orange': !estado}"
                       class="icon"></i>{{ estado ? 'Habilitado por la empresa' : 'Deshabilitado por la empresa'
                    }}
                </div>
                <div class="ui secondary menu one item" style="border: 0; background-color: #dce5ef">
                    <div class="ui item">
                        <div class="ui header small text-paperviu-dark" style="margin: 0">
                            <i :class="{'checkmark text-paperviu-sky': estadoAdmin, 'warning orange': !estadoAdmin}"
                               class="icon"></i>{{ estadoAdmin ? 'Habilitado por administrador' : 'Bloqueado por administrador'
                            }}
                        </div>
                    </div>
                </div>
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
        props: ['id', 'titulo', 'fecha', 'tipo', 'valoracion', 'imagen', 'estado', 'estadoAdmin'],
        mounted() {
            if (this.imagen !== undefined && this.imagen !== null && this.imagen !== "null" && this.imagen !== "") this.getImagen();
            $('#' + this.id)
                .rating({maxRating: 5})
                .rating('set rating', this.valoracion || 0)
                .rating('disable');
        },
        methods: {
            getImagen() {
                var _this = this;
                var dbx = new Dropbox({accessToken: dropbox.token});
                dbx.filesGetTemporaryLink({path: '/Aplicaciones/contenidos/' + this.id + '/' + this.imagen})
                    .then(function (response) {
                        if (response !== undefined && response.link !== undefined && response.link !== "") _this.imagenSrc = response.link;
                    });
            },
        }
    }
</script>