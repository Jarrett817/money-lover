import Vue from "vue";
import VueRouter, {RouteConfig} from "vue-router";
import Money from "@/views/Money.vue";
import Labels from "@/views/TagsManagement.vue";
import Statistics from "@/views/Statistics.vue";
import NotFound from "@/views/NotFound.vue";
import EditLabel from "@/views/EditTag.vue";
import EditRecord from "@/views/EditRecord.vue";
import Index from "@/views/Index.vue";
import Chart from "@/views/Chart.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
    {
        path: "/",
        redirect: "/index"
    },
    {
        path: "/index",
        component: Index
    },
    {
        path: "/chart",
        component: Chart
    },

    {
        path: "/money",
        component: Money
    },
    {
        path: "/labels",
        component: Labels
    },
    {
        path: "/statistics",
        component: Statistics
    },
    {
        path: "/labels/edit/:id",
        component: EditLabel
    },
    {
        path: "/statistics/edit/:groupIndex/:itemIndex",
        component: EditRecord
    },
    {
        path: "*",
        component: NotFound
    }
    // {
    //     path: "/",
    //     name: "Home",
    //     component: Home
    // },
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "../views/About.vue")
    // }
];

const router = new VueRouter({
    routes
});

export default router;
