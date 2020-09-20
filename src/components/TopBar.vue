<template>
  <div class="TopBar-wrapper">
    <Icon name="back" class="left" @click.native="goBack"/>
    <span>{{ this.fieldName ? this.fieldName : '' }}</span>
    <slot/>
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
//为在topbar中嵌入tabs
::v-deep .tabs {
  background: inherit;
  display: flex;
  font-size: 16px;
  position: absolute;
  left: 50%;
  transform: translate(-50%);

  > li {
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 2px 6px;

    &.selected::after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 2em;
      height: 2px;
      background: #333;
    }
  }
}

.TopBar-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 8px 8px;
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