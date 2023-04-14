
<template>
    <div>
        <!-- <router-link :to="{ name: 'home'}" >Pokemon List</router-link>
        <router-link :to="{ name:'pokemon-id', params: { id:85 } }">Pokemon por id </router-link>
        <router-link :to="{ name: 'about'}">about</router-link> -->
        <custom-link
            v-for="link in links"  
            :key="link.to"
            :link="link"
        />
   </div>
</template>
<script>
import { defineAsyncComponent } from 'vue'
export default {
    data(){
        return{
            links: [
                { to: 'pokemon-home', name: 'Pokemons' },
                { to: 'pokemon-id', name: 'por ID' , id: 151},
                { to: 'pokemon-about', name: 'About' },

                { to: 'dbz-characters', name: 'Personajes' },
                { to: 'dbz-about', name: 'DBZ-About' },

                { to: 'https://google.com', name: 'Google' },
            ]
        }
    },
    components:{
        CustomLink: defineAsyncComponent( ()=> import('./CustomLink.vue') )
    }
}
</script>
<style scoped>
div{
    padding: 0 30px;

}
div a{
    font-weight: bold;
    color: gray;
    margin: 0 20px;
}
a.router-link-exact-active{
    color: #42b983;
}
</style>