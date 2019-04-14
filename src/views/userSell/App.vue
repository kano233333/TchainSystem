<template>
  <div class="sellManage">
    <dataTable :theHeader="theHeader"></dataTable>
  </div>
</template>

<script>
import dataTable from '../common/components/ivewTable.vue'
// import dataTable from '../common/components/usedataTable.vue'
export default {
  data() {
    return {
      // theHeader: '卖出信息',
      theHeader: '交易管理',
    }
  },
  name: 'App',
  components: {
    dataTable
  }
}
</script>

<style type="text/css" media="screen" scoped>
  .sellManage {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
  }
</style>