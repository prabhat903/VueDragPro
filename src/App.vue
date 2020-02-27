<template>
  <div>
    <div style="{margin:'30px'}">
      <container class="DraggingContainer" :center="false">
        <Drag :forward="true" class="card">You Can Drag Me</Drag>
        <Drag class="card">You Can Drag Me Too!!</Drag>
      </container>
    </div>
  </div>
</template>

<script>
import Drag from "./components/Drag";
import container from "./components/container";
export default {
  name: "App",
  components: {
    Drag,
    container
  }
};
</script>

<style>
.card {
  border: 1px solid black;
  color: blue;
  cursor: move;
}
div.DraggingContainer {
  height: 300px;
  padding: 30px;
  width: 300px;
}
</style>
