<template>
  <ul class="tabs">
    <li class="left"  :class="liClass('-')"
        @click="select('-')" >支出</li>

    <li  class="right" :class="liClass('+')"
         @click="select('+')">收入</li>
  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {

  @Prop(String)
  classPrefix?: string;

  select(type: string) {
    this.$store.commit('changeCurrentType',type)
  }

  liClass(type: string) {
    return {
      selected: type === this.$store.state.currentType,
      [this.classPrefix + "-tabs-item"]: this.classPrefix
    };
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.tabs {
  background: white;
  display: flex;
  font-size: 16px;

  > li {
    width: 50%;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    cursor: pointer;

    &.left.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 2em;
      height: 2px;
      background: $main-blue;
    }
    &.right.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 2em;
      height: 2px;
      background: $main-red;
    }
  }
}
</style>