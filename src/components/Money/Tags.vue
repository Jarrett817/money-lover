<template>
  <div class="tags">
    <div class="new">
      <button @click="createTag">新增标签</button>
    </div>
    <div class="tips">滑动查看更多</div>
    <ul class="current">
      <li v-for="tag in tagList" :key="tag.id"
          :class="{selected:selectedTags.indexOf(tag)>=0}"
          @click="toggle(tag)">{{ tag.name.substr(0, 4) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import {mixins} from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";

@Component
export default class Tags extends mixins(TagHelper) {
  //选中的标签放到数组
  selectedTags: Tag[] = [];

  get tagList() {
    return this.$store.state.tagList;
  }

  created() {
    this.$store.commit("fetchTags");
  }

  toggle(tag: Tag) {
    //如果已选中，就去掉
    const index = this.selectedTags.indexOf(tag);
    if (index >= 0) {
      this.selectedTags.splice(index, 1);
    } else {
      this.selectedTags.push(tag);
    }
    //每次点击都将新的数组传给父组件
    this.$emit("update:value", this.selectedTags);
  }

}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tips {
  text-align: right;
  color: grey;
}

.tags {
  background: inherit;
  flex-grow: 1;
  font-size: 14px;
  padding: 16px;
  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  > .current {
    display: flex;
    flex-wrap: nowrap;
    overflow: auto;
    font-size: 16px;

    //&::-webkit-scrollbar {
    //  display: none;
    //}

    > li {
      cursor: pointer;
      $bg: #d9d9d9;
      $h: 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      background: white;
      flex-wrap: wrap;
      height: $h;
      line-height: $h;
      //padding: 0 16px;
      margin-right: 12px;
      margin-bottom: 16px;
      border-radius: $h/4;
      border: 1px solid lightgrey;
      min-width: 80px;

      &.selected {
        background: darken($bg, 30%);
        color: white;
      }
    }
  }

  > .new {
    padding-top: 16px;

    button {
      cursor: pointer;
      background: transparent;
      border: none;
      color: #999;
      border-bottom: 1px solid;
      padding: 0 4px;
    }
  }
}

</style>