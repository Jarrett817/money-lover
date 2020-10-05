import Vue from "vue";
import {Component} from "vue-property-decorator";


@Component
export class TagHelper extends Vue {
    createTag() {
        const name = window.prompt("请输入标签名");
        if (!name) {
            console.log(name)
            return window.alert("未输入标签名！");
        }
        this.$store.commit("createTag",name);
    }
}

export default TagHelper;