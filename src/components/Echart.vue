<template>
<div id="echarts" ref="echarts"></div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop} from "vue-property-decorator";
import echarts, {EChartOption, ECharts} from 'echarts';

@Component 
export default class Chart extends Vue{
  @Prop() options?: EChartOption;
  chart?: ECharts;
  //在挂载后获取元素
  mounted() {
    if (this.options === undefined) {
      return console.error('options 为空');
    }
    this.chart = echarts.init(this.$refs.echarts as HTMLDivElement);
    this.chart.setOption(this.options);
  }
}
</script>

<style lang="scss" scoped>
#echarts{
  width:100%;
  height:400px;
}
</style>