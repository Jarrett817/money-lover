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

];

const router = new VueRouter({
    routes
});

export default router;
