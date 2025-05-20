<script lang="ts">
  import * as d3 from 'd3'
  import { onMount } from 'svelte'

  let { navigationDirection }: { navigationDirection: number } = $props()

  type Thing = {
    name: string
    obsession: number
    conversation: number
  }

  const STUFF: Thing[] = [
    { name: 'architecture', obsession: 1, conversation: 1 },
    { name: 'board games', obsession: 1, conversation: 1 },
    { name: 'code', obsession: 1, conversation: 1 },
    { name: 'coffee', obsession: 1, conversation: 1 },
    { name: 'cooking', obsession: 1, conversation: 1 },
    { name: 'creative coding', obsession: 1, conversation: 1 },
    { name: 'design', obsession: 1, conversation: 1 },
    { name: 'eating', obsession: 1, conversation: 1 },
    { name: 'escape rooms', obsession: 1, conversation: 1 },
    { name: 'old printing presses', obsession: 1, conversation: 1 },
    { name: 'plants', obsession: 1, conversation: 1 },
    { name: 'tap dance', obsession: 1, conversation: 1 },
    { name: 'tea', obsession: 1, conversation: 1 },
    { name: 'the colour orange', obsession: 1, conversation: 1 },
    { name: 'theatre', obsession: 1, conversation: 1 },
    { name: 'travel', obsession: 1, conversation: 1 },
    { name: 'typewriters', obsession: 1, conversation: 1 },
    { name: 'typography', obsession: 1, conversation: 1 },
    { name: 'whisky', obsession: 1, conversation: 1 },
  ]

  let svgContainer: HTMLDivElement

  const CHART_X = 1000
  const CHART_Y = 300
  const MARGIN = 1 // ?

  const pack = d3
    .pack()
    .size([CHART_X - MARGIN * 2, CHART_Y - MARGIN * 2])
    .padding(3)

  // @ts-expect-error I have no idea what this is
  // complaining about and I don't have time to fix it.
  let data = $derived(pack(d3.hierarchy({ children: STUFF }).sum((d) => Math.random())).leaves())

  // function onKeyPress(event: KeyboardEvent) {
  //   if (event.key === 'ArrowRight' && visibleTranslations !== WORDS.length - 1) {
  //     visibleTranslations++
  //     event.stopPropagation()
  //     return
  //   }

  //   if (event.key === 'ArrowLeft' && visibleTranslations !== -1) {
  //     visibleTranslations--
  //     event.stopPropagation()
  //     return
  //   }
  // }
</script>

<!-- <svelte:window onkeydowncapture={onKeyPress} /> -->

<div class="wrapper">
  <svg viewBox={`0 0 ${CHART_X} ${CHART_Y}`}>
    {#each data as thing (thing.data.name)}
      <g transform="translate({thing.x}, {thing.y})">
        <circle r={thing.r} fill="var(--dark)"> </circle>
      </g>
    {/each}
  </svg>
</div>

<style>
  .wrapper {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .word-wrapper {
    position: relative;

    &::before {
      position: absolute;
      top: 1.5rem;
      left: 1.5rem;
      z-index: -1;
      width: 99%;
      height: 99%;
      content: '';
      background: var(--light);
      transform: rotateX(-180deg);
      transition:
        transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
        background 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    }

    &.visible::before {
      background: var(--grey);
      transform: rotateX(0);
    }
  }

  .word {
    position: absolute;
    inset: 0;
    z-index: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    font-size: 4rem;
    font-variation-settings: 'wdth' 90;
    font-weight: 500;
    color: var(--light);
    text-align: center;
    background: var(--dark);
    border-radius: 0.3rem;
    opacity: 0;
    transform: rotateX(-180deg);
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);

    &.visible {
      opacity: 1;
      transform: rotateX(0);
    }
  }

  .translation {
    font-size: 0.8em;
    font-variation-settings: 'wdth' 100;
    font-weight: 700;
    color: var(--secondary);
  }
</style>
