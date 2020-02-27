<template>
  <div>
    <container>
      <Drag>You Can Drag Me</Drag>
      <Drag>You Can Drag Me Too!!</Drag>
    </container>
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
</style>
