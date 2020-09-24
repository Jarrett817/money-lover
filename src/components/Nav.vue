<template>
  <nav>
    <router-link to="/index" class="item" active-class="selected">
      <Icon name="index"/>
      首页
    </router-link>

    <router-link to="/labels" class="item" active-class="selected">
      <Icon name="label"/>
      标签
    </router-link>
    <router-link to="/money" class="item main" active-class="mainSelected">
      <Icon name="money"/>
      <span>记账</span>
    </router-link>
    <router-link to="/statistics" class="item" active-class="selected">
      <Icon name="check"/>
      明细
    </router-link>
    <router-link to="/chart" class="item" active-class="selected">
      <Icon name="chart"/>
      图表
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

nav {
  @extend %outerShadow;
  display: flex;
  flex-direction: row;
  font-size: 16px;
  flex-shrink: 0;

  > .item {
    padding: 2px 0;
    width: 33.333333%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &.selected {
      color: $main-blue;
    }

    .icon {
      width: 1.6em;
      height: 1.6em;
    }

    &.main {
      &.mainSelected {
        color: orange;
      }

      .icon {
        width: 1.6em;
        height: 1.6em;
        transform: scale(1.2);
      }
    }
  }
}
</style>