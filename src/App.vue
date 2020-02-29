<template>
  <div class="parent">
    <div class="mainContainer">
      <div class="sibling">Hello My friends</div>
      <container class="DraggingContainer">
        <DragList :useHandle="true" :list="[1,2,3,4]" :className="'card'" v-slot="{ele,handle}">
          <div>
            <div>{{ele}}</div>
            <handle :handle="handle">Hold Me!</handle>
          </div>
        </DragList>
        <template type="placeholder">
          <div></div>
        </template>
      </container>
      <div style="{clear:both}"></div>
    </div>
  </div>
</template>

<script>
import DragList from "./components/DragList";
import container from "./components/container";
import handle from "./components/handle";
export default {
  name: "App",
  components: {
    DragList,
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
