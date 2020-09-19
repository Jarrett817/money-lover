<template>
  <button
      class="button"
      :class="getButtonType"
      @click="$emit('click',$event)">
    <slot/>
  </button>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class Button extends Vue {
  @Prop(String) buttonType: string | undefined;

  get getButtonType() {
    return "button-" + this.buttonType;
  }
}
</script>

<style lang="scss" scoped>
$h: 32px;
$border-color: #d9d9d9;
$color: #333;
$blue: #40a9ff;
$radius: 4px;
$red: red;
$grey: grey;
button {
  height: $h;
  padding: 0 12px;
  cursor: pointer;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  background: white;
  color: $color;
  border: 1px solid $border-color;
  border-radius: $radius;
  box-shadow: 0 1px 0 fade-out(black, 0.95);
  transition: background 250ms;


  &.button-normal {
    background: $blue;
    color: white;
    border-color: $blue;

    &:hover,
    &:focus,
    &:active {
      background: darken($blue, 10%);
      border-color: darken($blue, 10%);
    }
  }

  &.button-danger {
    background: $red;
    border-color: $red;
    color: white;

    &:hover,
    &:focus {
      background: darken($red, 10%);
      border-color: darken($red, 10%);
    }

  }


}
</style>