<template>
  <Layout>
      <TopBar field-name="标签管理" icon-hidden="true"/>
      <div class="tags">
        <router-link class="tag"
                     v-for="tag in tags"
                     :key="tag.id"
                     :to="`/labels/edit/${tag.id}`">
          <span>{{ tag.name }}</span>
          <Icon name="click"></Icon>
        </router-link>
      </div>
      <div class="createTag-wrapper">
        <Button button-type="normal"
                @click="createTag">
          新建标签
        </Button>
      </div>
  </Layout>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import Button from "@/components/Button.vue";
import {mixins} from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";
import TopBar from "@/components/TopBar.vue";


@Component({
  components: {TopBar, Button}
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
}

</script>

<style lang="scss" scoped>
.tags {
  flex-grow:1;
  background: inherit;
  font-size: 16px;
  padding-left: 16px;
  overflow: auto;

  > .tag {
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;

    .icon {
      margin-right: 10px;
      color: grey;
    }
  }
}
.createTag-wrapper {
  flex-grow:1;
  display: flex;
  justify-content: center;
  margin: 1em 1em;
}
</style>