
<script>
export default {
  name: "Handle",
  functional: true,
  props: {},
  render(h, context) {
    let { start } = context.data.attrs.handle.handle;
    return h(
      "div",
      {
        on: {
          mousedown(event) {
            start(event);
          }
        }
      },
      context.children
    );
  }
};
</script>

<style>
</style>
