<template>
  <div>
    <div style="{margin:'30px'}">
      <container>
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
</style>
