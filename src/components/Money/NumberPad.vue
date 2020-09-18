<template>
  <div class="numberPad">
    <div class="output">{{ output || '0' }}</div>
    <div class="buttons clearfix">
      <button @click="keyPress">1</button>
      <button @click="keyPress">2</button>
      <button @click="keyPress">3</button>
      <button @click="remove">
        <Icon name="takeBack"/>
      </button>
      <button @click="keyPress">4</button>
      <button @click="keyPress">5</button>
      <button @click="keyPress">6</button>
      <button @click="clear">清空</button>
      <button @click="keyPress">7</button>
      <button @click="keyPress">8</button>
      <button @click="keyPress">9</button>
      <button @click="ok" class="ok">ok</button>
      <button @click="keyPress" class="zero">0</button>
      <button @click="keyPress">.</button>

    </div>


  </div>

</template>

<script lang="ts">
import {Component, Watch} from "vue-property-decorator";
import Vue from "vue";

@Component
export default class NumberPad extends Vue {
  output = "";


  keyPress(event: MouseEvent) {
    const button = (event.target as HTMLButtonElement);
    const input = button.textContent as string;
    if (this.output.length === 16) {
      return;
    }
    if (this.output === "0") {
      if ("0123456789".indexOf(input) >= 0) {
        this.output = input;
      } else {
        this.output += input;
      }
      return;
    }
    //已经有小数点,再输入小数点直接返回
    if (this.output.indexOf(".") >= 0 && input === ".") {
      return;
    }
    if (this.output === "" && input === ".") {
      this.output = "0.";
      return;
    }
    this.output += input;
  }

  remove() {
    this.output = this.output.slice(0, -1);
  }

  clear() {
    this.output = "";
  }

  ok() {
    this.$emit("update:value", this.output);
    this.$emit("submit", this.output);
    this.output = "";
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";

.numberPad {
  .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
  }

  .buttons {
    $border: #b7b7b7;
    @extend %clearFix;
    @extend %innerShadow;
    border: 3px solid $border;
    background: $border;

    > button {
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: $border solid 3px;
      border-radius: 10px;

      &:active {
        background: #ababab !important;
        color: white;
      }

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 50%;
      }

      $bg: #ffffff;

      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 6%)
      }

      &:nth-child(4) {
        .icon {
          width: 28px;
          height: 28px;
        }
      }

      &:nth-child(4), &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 8%)
      }

      &:nth-child(8), &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 10%);
      }

      &:nth-child(14) {
        background: darken($bg, 12%);
      }

      &:nth-child(12) {
        background: darken($bg, 14%);
      }
    }
  }
}

</style>