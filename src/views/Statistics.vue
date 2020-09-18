<template>
  <layout>
    <Types class-prefix="chosen" :value.sync="type"></Types>
    <Tabs :data-source="array"/>
  </layout>

</template>

<script lang="ts">

import Types from "@/components/Money/Types.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";

@Component({
  components: {Tabs, Types}
})
export default class Statistics extends Vue {
  type = "-";
  array = [
    {text: "按天", value: "day"},
    {text: "按周", value: "week"},
    {text: "按月", value: "month"}
  ];
}
</script>

<style lang="scss" scoped>
//deep语法将此加在Type子组件上
::v-deep .chosen-item {
  background: white;

  &.selected {
    background: #c4c4c4;

    &::after {
      display: none;
    }
  }
}
</style>