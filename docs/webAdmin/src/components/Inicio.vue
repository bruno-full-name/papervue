<template>
    <div>
        <div class="ui stackable three column grid">
            <div @click="$router.push('clientes')" class="ui center aligned column paperviu-e8 hover-paperviu-e4"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="users icon text-paperviu-sky"></i></h3>
                <h1 class="ui header text-paperviu-d7" style="margin: 0">Clientes</h1>
            </div>
            <div @click="$router.push('empresas')" class="ui center aligned column paperviu-e8 hover-paperviu-e4"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="user outline circle icon text-paperviu-sky"></i>
                </h3>
                <h1 class="ui header text-paperviu-d7" style="margin: 0">Empresas</h1>
            </div>
            <div @click="$router.push('contenidos')" class="ui center aligned column paperviu-e8 hover-paperviu-e4"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="film icon text-paperviu-sky"></i></h3>
                <h1 class="ui header text-paperviu-d7" style="margin: 0">Contenidos</h1>
            </div>
            <div @click="$router.push('categorias')" class="ui center aligned column paperviu-e8 hover-paperviu-e4"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="tags icon text-paperviu-sky"></i></h3>
                <h1 class="ui header text-paperviu-d7" style="margin: 0">Categor&iacute;as</h1>
            </div>
            <div @click="$router.push('tipos')" class="ui center aligned column paperviu-e8 hover-paperviu-e4"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="sitemap icon text-paperviu-sky"></i></h3>
                <h1 class="ui header text-paperviu-d7" style="margin: 0">Tipos de contenido</h1>
            </div>
            <div @click="$router.push('reportes')" class="ui center aligned column paperviu-e8 hover-paperviu-e4"
                 style="padding: 60px; cursor: pointer">
                <h3 class="ui icon header" style="margin: 0"><i class="pie chart icon text-paperviu-sky"></i></h3>
                <h1 class="ui header text-paperviu-d7" style="margin: 0">Reportes</h1>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        mounted() {
            this.$store.commit('setVistaActual', 'Inicio');
            document.title = 'Inicio';
        }
    }
</script>