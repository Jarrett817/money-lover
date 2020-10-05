<template>
  <Layout>
    <TopBar field-name="" icon-hidden="true">
      <Tabs></Tabs>
    </TopBar>
    <div class="tagsWrapper">
      <Tags :value.sync="record.tags"></Tags>
    </div>
    <div class="createdTimeWrapper">
      <Icon name="date"></Icon>
      <FormItem field-name=""
                type="date"
                :value.sync="record.date"
      ></FormItem>
    </div>
    <div class="notesWrapper">
      <Icon name="edit"></Icon>
      <FormItem field-name=""
                placeholder="写备注..."
                :value.sync="record.notes"
      ></FormItem>
    </div>
    <div class="numberPadWrapper">
      <NumberPad :value.sync="record.amount" @submit="savaRecord"></NumberPad>
    </div>
  </Layout>
</template>

<script lang="ts">
import NumberPad from "@/components/Money/NumberPad.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tags from "@/components/Money/Tags.vue";
import Vue from "vue";
import {Component} from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import TopBar from "@/components/TopBar.vue";


@Component({
  components: {TopBar, Tabs, FormItem, Tags, NumberPad}
})
export default class Money extends Vue {
  created() {
    this.$store.commit("fetchRecords");
  }

  get recordList() {
    return this.$store.state.recordList;
  }

  get chosenType() {
    return this.$store.state.currentType;
  }

  record: RecordItem = {tags: [], notes: "", type: "", amount: 0, date: '',createdTime: new Date().toISOString()};

  //将各次收集到的数据对象存入数组
  savaRecord() {
    this.record.type = this.chosenType;

    if (this.record.tags.length === 0) {
      this.record.tags.push({id: "0", name: "这是一条随性的记录..."});
    }
    this.$store.commit("createRecord", this.record);
    this.record.notes = "";
  }

}

</script>
<style lang="scss" scoped>
.tagsWrapper {
flex-grow: 1;
}

.createdTimeWrapper {
  flex-grow: 1;
  padding: 2px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 16px;

  .icon {
    margin-left: 8px;
  }
}

.numberPadWrapper {
  flex-grow:1;
  display: flex;
  align-items: flex-end;
  flex-direction: row;
  justify-content:center ;
width:100%;
}

.notesWrapper {
  flex-grow: 1;

  padding: 2px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin: 0 16px;

  .icon {
    margin-left: 8px;
  }
}
::v-deep .tabs {
  background: inherit;
  display: flex;
  font-size: 16px;
  width: 100%;
  justify-content: center;
  align-items: center;

  > li {
    width: 25%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 0;
  }
}
</style>