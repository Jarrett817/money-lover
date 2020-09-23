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
      <button @click="clear">C</button>
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
import {Component} from "vue-property-decorator";
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
    this.$emit("update:value", parseFloat(this.output));
    this.$emit("submit");
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
    $border: #cdc9c9;
    @extend %clearFix;
    @extend %innerShadow;
    border: 4px solid $border;
    background: $border;

    > button {
      @media (min-width: 500px) {
        & {
          height: 30px;
        }
      }
      $h: 30px;
      cursor: pointer;
      width: 25%;
      height: 64px;
      float: left;
      background: transparent;
      border: $border solid 3px;
      border-radius: 10px;
      $bg: #ffffff;

      &:active {
        background: darken($bg, 40%) !important;
        color: white;
      }

      &.ok {
        @media (min-width: 500px) {
          & {
            height: 30*2px;
          }
        }
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 50%;
      }


      &:nth-child(1) {
        background: $bg;
      }

      &:nth-child(2), &:nth-child(5) {
        background: darken($bg, 4%);
      }

      &:nth-child(3), &:nth-child(6), &:nth-child(9) {
        background: darken($bg, 8%)
      }

      &:nth-child(4) {


        .icon {
          @media (min-width: 500px) {
            &  {
              height: 1em;
              width: 1em;
            }
          }
          width: 28px;
          height: 28px;
        }
      }

      &:nth-child(7), &:nth-child(10) {
        background: darken($bg, 12%)
      }

      &:nth-child(11), &:nth-child(13) {
        background: darken($bg, 16%);
      }

      &:nth-child(14) {
        background: darken($bg, 20%);
      }

      &:nth-child(4), &:nth-child(8) {
        background: darken($bg, 40%);

        &:active {
          background: darken($bg, 6%) !important;
          color: #333;
        }
      }

      &:nth-child(12) {
        background: darken($bg, 6%);

        &:active {
          background: darken($bg, 40%) !important;
          color: white;
        }
      }
    }
  }
}

</style>