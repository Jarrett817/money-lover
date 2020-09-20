<template>
  <ul class="tabs">
    <li v-for="item in dataSource" :key="item.value"
        :class="liClass(item)"
        @click="select(item)">{{ item.text }}
    </li>

  </ul>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

type DataSourceItem = { text: string; value: string };

@Component
export default class Tabs extends Vue {
  @Prop({required: true, type: Array})
  dataSource!: DataSourceItem[];

  @Prop(String)
  classPrefix?: string;

  select(item: DataSourceItem) {
    console.log(item.value)
    this.$store.commit('changeCurrentType',item.value)
  }

  liClass(item: DataSourceItem) {
    return {
      selected: item.value === this.$store.state.currentType,
      [this.classPrefix + "-tabs-item"]: this.classPrefix
    };
  }
}
</script>

<style lang="scss" scoped>
.tabs {
  background: white;
  display: flex;
  font-size: 16px;

  > li {
    width: 50%;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 2em;
      height: 4px;
      background: #333;
    }
  }
}
</style>