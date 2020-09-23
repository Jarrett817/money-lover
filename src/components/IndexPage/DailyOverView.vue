<template>
  <footer>
    <label>今日收入
      <div class="income">
        <span>￥{{ getSum('+') ? getSum('+') : 0 }}</span>
        <Icon name="wave"></Icon>
      </div>
    </label>
    <div class="line"></div>
    <label>今日支出
      <div class="expend">
        <span>￥{{ getSum('-') ? getSum('-') : 0 }}</span>
        <Icon name="wave"></Icon>
      </div>
    </label>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import dayjs from "dayjs";

type dataSource = DetailedRecord;

@Component
export default class DailyOverView extends Vue {
  beauty(date: string) {
    return dayjs(date).format("YYYY-MM-DD");
  }

  getSum(type: string) {
    const {state} = this.$store;
    const records = state.recordList.filter((item: RecordItem) =>
        this.beauty(item.createdTime) === this.beauty(new Date().toISOString()));
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

footer {
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  .line {
    height: 70%;
    width: 2px;
    background: lightgrey;
  }

  & > label {
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: grey;
    white-space: nowrap;

    & .icon {
      transform: scale(4);
    }

    & .income {
      text-align: center;
      color: $main-red;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > span {
        padding: 2px;
      }
    }

    & .expend {
      text-align: center;
      color: $main-blue;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > span {
        padding: 2px;
      }
    }


  }


}
</style>