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
  flex-grow: 1;

  .output {
    font-size: 36px;
    font-family: Consolas, monospace;
    padding: 9px 16px;
    text-align: right;
    border-top: 1px solid lightgrey;
  }

  .buttons {
    $border: #cdc9c9;
    @extend %clearFix;
    @extend %innerShadow;
    padding: 2px;
   background: inherit;
    > button {
      $bg: #ebecf0;
      $h: 30px;
      cursor: pointer;
      width: 25%;
      height: 64px;
      float: left;
      background:$bg;
      outline: none;
      border-radius: 16px;
      border:6px solid #f5f5f5;

      &:active {
        background: darken($bg, 20%);
        color: white;
      }

      &.ok {
        height: 64*2px;
        float: right;
      }

      &.zero {
        width: 50%;
      }

      $dColor:#fcb1aa;
      &:nth-child(4) {
        background: $dColor;
        .icon {
          min-width: 28px;
          min-height: 28px;
        }
        &:active {
          background: darken($dColor, 15%);
          color:white;
        }
      }

      $cColor: #e6f7ff;

      &:nth-child(8) {
        background: $cColor;

        &:active {
          background: darken($cColor, 15%);
          color:white;
        }
      }

      $okColor: #88daff;

      &:nth-child(12) {
        background:$okColor ;

        &:active {
          background: darken($okColor, 15%);
          color: white;
        }
      }
    }
  }
}

</style>