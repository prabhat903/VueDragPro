<template>
  <div class="parent">
    <div class="sibling">Hello My friends</div>
    <container>
      <DragList v-model="list" :className="'card'">
        <template v-slot:default="{ele,ind,handle}">
          <h2>{{ele.name}}</h2>
          <!-- <handle :handle="handle">Hold me to Drag!</handle> -->
        </template>
        <template #placeholder>
          <div class="card placeholder">I will catch</div>
        </template>
      </DragList>
    </container>
    <div>{{list}}</div>
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
      list: [
        { name: "Abhisk", age: 40, src: "profilePic" },
        { name: "rajesh", age: 24, src: "profilePic" },
        { name: "prabhat", age: 65, src: "profilePic" }
      ]
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
  height: 300px;
  padding: 30px;
  width: 500px;
  border: 1px solid black;
  margin: 30px;
  overflow: auto;
}
.sibling {
  width: 20px;
  margin: 30px;
}
.mainContainer {
  width: 2000px;
}
.parent {
  width: 500px;
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
