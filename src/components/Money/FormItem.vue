<template>
  <label class="notes">
    <span class="name">{{ fieldName }}</span>
    <template v-if="type==='date'">
      <input :type="type||'text'"
             :value="beauty(value)"
             @input="onValueChanged($event.target.value)"
             :placeholder="placeholder">
    </template>
    <template v-else>
    <input :type="type||'text'"
           :value="value"
           @input="onValueChanged($event.target.value)"
           :placeholder="placeholder">
    </template>
  </label>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";
import dayjs from "dayjs";

@Component
export default class FormItem extends Vue {
  //获取input输入内容
  @Prop({default: ""}) readonly value!: string;
  @Prop({required: true}) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;

  //监听value，一改变就把值传给父组件
  onValueChanged(value: string) {
    console.log("这是传回来的value");
    console.log(value);
    this.$emit("update:value", value);
  }

  beauty(date: string){
    return dayjs(date).format('YYYY-MM-DD')
  }

}

</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  padding-left: 16px;
  display: flex;
  align-items: center;

  .name {
    padding-right: 16px;
  }

  input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;
    padding-right: 16px;
  }
}
</style>