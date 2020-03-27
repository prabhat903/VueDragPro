<template>
  <div class="parent">
    <container class="DraggingContainer">
      <DragList v-model="list" :className="'card'" class="zone z1">
        <template v-slot:default="{ele,ind,handle}">
          <h2>{{ele}}</h2>
          <!-- <handle :handle="handle">Hold me to Drag!</handle> -->
        </template>
        <!-- <template #placeholder>
          <div class="card placeholder">I will catch</div>
        </template>-->
      </DragList>
      <DragList v-model="list2" :className="'card'" class="zone z2">
        <template v-slot:default="{ele,ind,handle}">
          <h2>{{ele}}</h2>
          <!-- <handle :handle="handle">Hold me to Drag!</handle> -->
        </template>
        <!-- <template #placeholder>
          <div class="card placeholder">I will catch</div>
        </template>-->
      </DragList>
    </container>
    <div>{{list}}</div>
    <div>{{list2}}</div>
  </div>
</template>

<script>
import DragList from "./components/DragList";
import container from "./components/container";
import handle from "./components/handle";
export default {
  name: "App",
  data() {
    return {
      list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      list2: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    };
  },
  components: {
    DragList,
    container,
    handle
  }
};
</script>

<style>
.zone {
  border: 1px solid pink;
  padding: 5px;
  margin: 5px;
  overflow: auto;
}
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
  height: 500px;
  padding: 10px;
  display: flex;
  border: 1px solid black;
  overflow: auto;
}
.placeholder.card {
  background: green;
  height: 10px;
  padding: 40px;
}
@keyframes Open {
  from {
    height: 0px;
    padding: 0px;
  }
  to {
    height: 30px;
    padding: 20px;
  }
}
</style>
