<template>
  <footer>
    <label>今日收入
      <div class="income">
        <span>+{{ getSum('+') ? getSum('+') : 0.00 }}</span>
        <Icon name="wave"></Icon>
      </div>
    </label>
    <div class="line"></div>
    <label>今日支出
      <div class="expend">
        <span>-{{ getSum('-') ? getSum('-') : 0.00 }}</span>
        <Icon name="wave"></Icon>
      </div>
    </label>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";
import dayjs from "dayjs";
import beautyDay from "@/lib/beautyDay";

type dataSource = DetailedRecord;

@Component
export default class DailyOverView extends Vue {
  beforeCreated() {
    this.$store.commit("fetchRecords");
  }

  getSum(type: string) {
    const {state} = this.$store;
    const records = state.recordList.filter((item: RecordItem) =>
        beautyDay(item.date) === beautyDay(new Date().toISOString()));
    const result = records.filter((item: RecordItem) => item.type === type).reduce((sum: number, item: RecordItem) => {
          return sum += item.amount;
        }, 0
    );
    return result.toFixed(2);
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

footer {
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  border-top: 1px solid lightgrey;
  position: relative;

  .line {
    height: 60%;
    width: 1px;
    background: lightgrey;
    position: absolute;
    top: 50%;
    transform: translate(0, -50%);
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
      width: auto;
      height: auto;
      max-width: 100%;
      max-height: 20px;
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