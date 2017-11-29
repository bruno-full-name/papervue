<template>
    <div class="item" style="padding: 16px; background-color: #f2f5f7">
        <div class="middle aligned content">
            <div class="ui labeled action fluid small input">
                <div class="ui basic label"><span class="ui header text-paperviu-dark small">Atributo:</span></div>
                <input type="text" @input="valorCambiado" v-model="clave" placeholder="Ingrese el nombre o clave del atributo...">
                <i @click="eliminar" style="margin-left: 10px; margin-top: 6px" class="remove grey inverted link circular icon"></i>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                clave: ''
            }
        },
        props: ['id'],
        methods: {
            eliminar() {
                this.$store.commit('quitarAtributo', this.id);
            },
            valorCambiado(event) {
                this.$store.commit('actualizarAtributo', {
                    'id': this.id,
                    'clave': this.clave
                });
            }
        }
    }
</script>