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

@Component
export default class OverView extends Vue {

  beauty(date: string) {
    return dayjs(date).month();
  }
  get month(){
    return this.beauty(new Date().toISOString())
  }
  getSum(type: string) {
    const {state} = this.$store;
    const records = state.recordList.filter((item: RecordItem) =>
        this.beauty(item.createdTime) === this.month);
    const sum = records.filter((item: RecordItem) => item.type === type).reduce((sum: number, item: RecordItem) => {
          return sum += item.amount;
        }, 0
    );
    console.log(sum);
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