<script lang="ts">
  import katex from "katex";
  import "katex/dist/katex.min.css";
  import { onMount } from "svelte";

  export let tex: string;
  export let display = false;

  let el: HTMLElement;
  function render() {
    if (!el) return;
    katex.render(tex, el, {
      displayMode: display,
      throwOnError: false,
      trust: true,
      output: "htmlAndMathml"
    });
  }
  onMount(render);
  $: render();
</script>

<span bind:this={el} />
