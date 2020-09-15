<template>

  <div>
    <Layout>
      <ol class="tags">
        <li v-for="tag in tags" :key="tag">
          <span>{{ tag }}</span>
        </li>

      </ol>

      <div class="createTag-wrapper">
        <button class="createTag" @click="createTag">新建标签</button>
      </div>
    </Layout>
  </div>
</template>

<script lang="ts">

import {Component} from "vue-property-decorator";
import Vue from "vue";
import {tagListModel} from "@/models/tagListModel";

tagListModel.fetch();


@Component
export default class Labels extends Vue {
  tags = tagListModel.data;

  createTag() {
    const name = window.prompt("请输入标签名");
    if (name) {
      const message = tagListModel.create(name);
      if (message === "duplicated") {
        alert("标签名重复！");
      } else if (message === "success") {
        alert("添加成功！");
      }
    }
  }
}

</script>

<style lang="scss" scoped>
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;

  > li {
    min-height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6e6e6;

  }
}

.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;

  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>