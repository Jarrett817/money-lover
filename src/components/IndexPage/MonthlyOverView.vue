<template>
  <header>
    <div>{{ month+1 }}月·支出</div>
    <h1 class="expend">{{getSum('-')}}</h1>
    <div class="income">{{ month+1 }}月·收入 <span>{{getSum('+')}}</span></div>
  </header>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import dayjs from "dayjs";
import beautyMonth from "@/lib/beautyMonth";
@Component
export default class OverView extends Vue {


  get month(){
    return beautyMonth(new Date().toISOString())
  }
  getSum(type: string) {
    const {state} = this.$store;
    const records = state.recordList.filter((item: RecordItem) =>
        beautyMonth(item.createdTime) === this.month);
    const sum = records.filter((item: RecordItem) => item.type === type).reduce((sum: number, item: RecordItem) => {
          return sum += item.amount;
        }, 0
    );
    return sum.toFixed(2);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
header {
  .expend {
    color: $main-blue;
  }

  .income > span {
    color: $main-red;
  }
}
</style>