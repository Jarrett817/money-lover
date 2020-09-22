<template>
  <header>
    <h2>xx月·支出</h2>
    <h1>0.00</h1>
    <h2>xx月·收入 <span>0.00</span></h2>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class OverView extends Vue {
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
header {
  > h1 {
    color: $main-blue;
  }

  > h2 > span {
    color: $main-red;
  }
}
</style>