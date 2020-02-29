<template>
  <div class="parent">
    <div class="mainContainer">
      <div class="sibling">Hello My friends</div>
      <container class="DraggingContainer" :center="true">
        <Drag :forward="true" class="card" :useHandle="true">You Can Drag Me Away</Drag>
        <Drag class="card" :forward="true" :useHandle="true" v-slot="handle">
          <handle :handle="handle">
            <div>But I came back!!</div>
            <div class="title">You Can Drag Me Too</div>
          </handle>
        </Drag>
      </container>
      <div style="{clear:both}"></div>
    </div>
  </div>
</template>

<script>
import Drag from "./components/Drag";
import container from "./components/container";
import handle from "./components/handle";
export default {
  name: "App",
  components: {
    Drag,
    container,
    handle
  }
};
</script>

<style>
.title {
  height: 300px;
  width: 200px;
  font-size: 20px;
}
.card {
  overflow: auto;
  border: 1px solid black;
  color: blue;
  cursor: move;
  margin: 10px;
  padding: 5px;
  text-align: center;
  width: 100px;
}
div.DraggingContainer {
  float: left;
  height: 300px;
  padding: 30px;
  width: 300px;
  border: 1px solid black;
  margin: 30px;
  overflow: auto;
}
.sibling {
  width: 20px;
  float: left;
  margin: 30px;
}
.mainContainer {
  width: 2000px;
}
.parent {
  width: 500px;
  overflow: auto;
}
</style>
