<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <el-container>
      <el-header>Header</el-header>
      <el-main>Main</el-main>
    </el-container>
    <el-button type="primary" icon="el-icon-edit"></el-button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'this is page 2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
