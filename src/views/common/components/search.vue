<template>
  <div class="search">
    <button class="btn">用户名</button>
    <input v-model="searchData" type="text" placeholder="">
    <Button shape="circle" icon="ios-search"></Button>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        searchData:''
      }
    },
    name: "search"
  }
</script>

<style scoped>
  .search {
    width:100%;
    height:100%;
    position:relative;
  }
  .search .btn {
    display: block;
    outline: none;
    border:none;
    width:45px;
    background-color: #2FCCEB;
    color:#fff;
    height:25px;
    position:absolute;
    top:-25px;
    left:0;
    box-shadow: 0 0 1px #d5d2d2;
  }
  .search>input {
    width:200px;
    border:1px solid #e9e6e6;
    height:30px;
    border-radius:2px;
    outline: none;
    font-size:18px;
    padding:5px;
    transition:0.8s all;
  }
  .search>input:hover ,.search>input:focus {
    border:1px solid #d5d2d2;
    box-shadow: 0 0 4px #b3b0b0;
  }
  .search button:nth-of-type(2){
    position:relative;
    top:-2px;
    margin-left:5px;
  }
</style>