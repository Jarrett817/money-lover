<template>
  <div class="TopBar-wrapper">
    <Icon name="back" class="left"  @click.native="goBack"/>
    <span>{{ this.fieldName }}</span>
    <Icon class="right"/>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class TopBar extends Vue {
  @Prop({required: true}) fieldName!: string;

  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';
.TopBar-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding:8px 8px;
  text-align: center;
  @extend %outerShadow;
  > span {
    flex: 1;
  }

  .left {
    width: 1.8em;
    height: 1.8em;
  }

  .right {
    width: 32px;
    height: 32px;
  }
}
</style>