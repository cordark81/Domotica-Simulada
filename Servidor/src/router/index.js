import { createRouter, createWebHistory } from "vue-router";
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Login from "../components/Login/ModalCreateUser.vue";


const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", name: "home", component: Home },
    { path: "/login", name: "login", component: Login},
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: {
        requiresAuth: true,
      },
    }, 
  ],
});

const getCurrentUser = () =>{
    return new Promise ((resolve,reject)=>{
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) =>{
                removeListener();
                resolve(user);
            },
            reject
        );
    })
}
router.beforeEach(async (to,from,next) =>{
    if(to.matched.some((record)=>record.meta.requiresAuth)){
        if(await getCurrentUser()){
            next();
        }else{
            alert("No tienes acceso");
            next("/");
        }
    }else{
        
        next();
    }
})

export default router;
