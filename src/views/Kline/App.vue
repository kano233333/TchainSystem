<template>
  <div class="KLine">
    <dataTable :theHeader="theHeader"></dataTable>
    另一个组件导入
  </div>
</template>

<script>
import dataTable from '../common/components/ivewTable.vue'
export default {
  data() {
    return {
      theHeader: 'K线条'
    }
  },
  name: 'App',
  components: {
    dataTable
  }
}
</script>

<style type="text/css" media="screen" scoped>
  .KLine {
    width: 75vw;
    max-width: calc(100vw - 150px);
    margin: 20px auto;
  }
</style>