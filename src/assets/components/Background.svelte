<script lang="ts">
  import type { Slide } from '$lib/slide'

  let { code, dark }: Slide = $props()

  let darkBg = $derived(!!code || dark)
</script>

<div class="background" class:dark={darkBg}></div>

<style>
  .background {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -2;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: radial-gradient(circle, var(--red-orange) 0%, var(--orange) 88%);
  }

  .background::before {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 100%;
    content: '';
    background: radial-gradient(circle, var(--black) 0%, var(--dark) 60%);
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
  }

  .background.dark::before {
    opacity: 1;
  }
</style>
