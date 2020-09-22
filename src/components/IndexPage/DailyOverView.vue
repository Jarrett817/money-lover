<template>
  <footer>
    <label>今日收入
      <div class="income">
        <span>￥</span>
        <Icon name="wave"></Icon>
      </div>

    </label>
    <div class="line"></div>
    <label>今日支出
      <div class="expend">
        <span>￥</span>
        <Icon name="wave"></Icon>
      </div>

    </label>
  </footer>
</template>

<script lang="ts">
import Vue from "vue";
import {Component} from "vue-property-decorator";

@Component
export default class DailyOverView extends Vue {
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
    height: 50%;
    width: 2px;
    background: lightgrey;
  }

  & > label {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    color: grey;

    & .icon {
      width: 100%;
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