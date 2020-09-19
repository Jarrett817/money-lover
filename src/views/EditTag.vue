<template>
  <Layout>
    <TopBar field-name="编辑标签"/>
    <div class="form-wrapper">
      <FormItem :value="chosenTag.name"
                @update:value="update"
                field-name="标签名"
                placeholder="请输入标签名"
      />
    </div>
    <div class="button-wrapper">
      <Button  button-type="danger" @click="remove">删除标签</Button>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
import Button from "@/components/Button.vue";
import TopBar from "@/components/TopBar.vue";

@Component({
  components: {TopBar, Button, FormItem}
})
export default class EditTag extends Vue {
  get chosenTag() {
    return this.$store.state.chosenTag;
  }

  created() {
    //从路由中获取id,并去匹配对应的对象
    const id = this.$route.params.id;
    this.$store.commit("fetchTags");
    this.$store.commit("setCurrentTag", id);
    if (!this.chosenTag) {
      this.$router.replace("/404");
    }
  }

  update(tagName: string) {
    if (this.chosenTag) {
      this.$store.commit("updateTags",
          {id:this.chosenTag,tagName});
    }
  }

  remove() {
    if (this.chosenTag) {
      this.$store.commit('removeTags',this.chosenTag.id)
    }
  }


}
</script>

<style lang="scss" scoped>
.navBar {
  text-align: center;
  font-size: 16px;
  padding: 12px 16px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;

  > .title {
  }

  > .leftIcon {
    width: 24px;
    height: 24px;
  }

  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}

.form-wrapper {
  background: white;
  margin-top: 8px;
}

.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
}
</style>