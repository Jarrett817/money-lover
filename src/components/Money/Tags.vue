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
      $bg: #ebecf0;
      $h: 32px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      height: $h;
      line-height: $h;
      margin: 0 0 10px 12px;
      border-radius: $h/4;
      border: 1px solid lightgrey;
      min-width: 80px;
      background: #f5f5f5;
      box-shadow: 3px 3px 4px #d0d0d0,
      3px 3px 4px #ffffff;

      &.selected {
        background: darken($bg, 40%);
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