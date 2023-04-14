import { createRouter,createWebHashHistory } from "vue-router";
import isAuthenticatedGuard from "./auth-guard";

// import AboutPage from "@/modules/pokemon/pages/AboutPage";
// import ListPage from "@/modules/pokemon/pages/ListPage";
// import PokemonPage from "@/modules/pokemon/pages/PokemonPage";
// import NoPageFound from "@/modules/shared/pages/NoPageFound";

const routes = [
    {
        path: '/',
        redirect: '/pokemon'
    },
    {
        path:'/pokemon',
        name: 'pokemon',
        component: () => import('@/modules/pokemon/layouts/PokemonLayout'),
        children: [
            { 
                path: 'home',
                name: 'pokemon-home', 
                component: () => import(/*webpockChunkName: "ListPage"*/'@/modules/pokemon/pages/ListPage') 
            },
            {
                path: 'about', 
                name: 'pokemon-about',
                component: () => import(/*webpockChunkName: "AboutPage"*/'@/modules/pokemon/pages/AboutPage')
            },
            { 
                path: '/pokemonid/:id', 
                name: 'pokemon-id',
                component: () => import(/*webpockChunkName: "PokemonPage"*/'@/modules/pokemon/pages/PokemonPage') ,
                props: ( route ) =>{
                    console.log(route)
                    const id = Number (route.params.id);
                    return isNaN ( id ) ? {id:1} : { id } 
                }
            },
            {
                path: '',
                redirect: { name: 'pokemon-about' }
            }
        ]
    },
    // DBZ Layout
    {
        path: '/dbz',
        name: 'dbz',
        beforeEnter: [ isAuthenticatedGuard ],
        component: () => import('@/modules/dbz/layouts/DragonBallLayout'),
        children: [
            {
                path:'characters',
                name: 'dbz-characters',
                component: () => import('@/modules/dbz/pages/Characters')
            },
            {
                path:'about',
                name: 'dbz-about',
                component: () => import('@/modules/dbz/pages/About')
            },
            {
                path: '',
                redirect: { name: 'dbz-characters'}
            },
        ]
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: () => import(/*webpockChunkName: "NoPageFound"*/'@/modules/shared/pages/NoPageFound')
        
     }
]

const router = createRouter({
    // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
    history: createWebHashHistory(),
    routes, // short for `routes: routes`
  })

  // --------------------- Guard global - sincrono ----------------------
//   router.beforeEach( (to, from, next) =>{
//     // console.log({to, from, next})
    
//     const random = Math.random() * 100;
//     if(random > 50){
//         console.log('autentificado')
//         next();
//     }
//     else{
//         console.log('Bloqueado por el beforeEach Guard')
//         next( {name: 'pokemon-home'} )
//     }

//   } )

// -------------------- Guard asincrono  --------------------------
// const canAccess = ()=>{
//     return new Promise( (resolve) => {
//         const random = Math.random() * 100;
//         if(random > 50){
//             console.log('autentificado -  canAccess')
//             resolve(true);
//         }
//         else{
//             console.log(random,'Bloqueado por el beforeEach Guard - canAccess')
//             resolve( false)
//         }
//     } )
// }

// router.beforeEach(async (to, from, next) =>{
//     const authorized = await canAccess();
//     authorized ? next() : next({name: 'pokemon-home'})
// } )

  export default router