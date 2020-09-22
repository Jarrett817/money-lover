<template>
  <div class="list-wrapper">
    <ol>
      <li class="singleDay" v-for="(group,groupIndex) in dataSource" :key="groupIndex">
        <div class="title">
          <span>{{ group.date }}</span>
          <span>{{ group.total ? chosenType + group.total.toFixed(2) : 0.00 }}</span>
        </div>
        <ol>
          <router-link class="eachItem" v-for="(item,itemIndex) in group.items" :key="itemIndex"
                       :to="`/statistics/edit/${groupIndex}/${itemIndex}`"
          >
            <ol>
              <li :class="tagMark()" v-for="tag in item.tags" :key="tag.id">
                <span>{{ tag.name }}</span>
              </li>

            </ol>
            <span :class="chosenType==='-'?'expend':'income'">{{
                item.amount ? chosenType + item.amount.toFixed(2) : chosenType + 0.00
              }}</span>
          </router-link>
        </ol>
      </li>
    </ol>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Prop} from "vue-property-decorator";

@Component
export default class RecordList extends Vue {
  @Prop() dataSource?: DetailedRecord[];

  get chosenType() {
    return this.$store.state.currentType;
  }

  tagMark() {
    return this.chosenType === "-" ? "tag-mark-blue" : "tag-mark-red";
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/style/helper.scss';

.list-wrapper {
  overflow: auto;
}

.singleDay {
  padding: 10px;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: grey;
    border-bottom: 1px solid lightgrey;
  }

  .eachItem {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 2px;
    padding: 4px;

    .tag-mark-red {
      border-left: 2px solid $main-red;
      padding-left: 3px;
    }

    .tag-mark-blue {
      border-left: 2px solid $main-blue;
      padding-left: 3px;
    }

    > span.income {
      color: $main-red;
    }

    > span.expend {
      color: $main-blue;
    }
  }
}
</style>