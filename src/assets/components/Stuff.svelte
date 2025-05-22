<script lang="ts">
  import * as d3 from 'd3'
  import SvelteMarkdown from 'svelte-markdown'

  import { SeededRandom } from '$lib/random'
  import { hijackNavigation } from '$lib/slide'

  let { navigationDirection }: { navigationDirection: number } = $props()

  type Thing = {
    name: string
    obsession: number
    conversation: number

    // We don't actually need this but the hierarchical node should support kids.
    children?: Thing[]
  }

  const STUFF: Thing[] = [
    { name: 'architecture', obsession: 1, conversation: 3 },
    { name: 'board games', obsession: 1, conversation: 1 },
    { name: 'code', obsession: 2, conversation: 3 },
    { name: 'coffee', obsession: 4, conversation: 4 },
    { name: 'cooking', obsession: 3, conversation: 3 },
    { name: 'creative coding', obsession: 3, conversation: 3 },
    { name: 'design', obsession: 3, conversation: 4 },
    { name: 'eating', obsession: 4, conversation: 1 },
    { name: 'escape rooms', obsession: 2, conversation: 2 },
    { name: 'printing presses', obsession: 3, conversation: 5 },
    { name: 'plants', obsession: 3, conversation: 1 },
    { name: 'tap dance', obsession: 1, conversation: 1 },
    { name: 'tea', obsession: 3, conversation: 2 },
    { name: 'orange', obsession: 5, conversation: 1 },
    { name: 'theatre', obsession: 2, conversation: 4 },
    { name: 'travel', obsession: 2, conversation: 3 },
    { name: 'typewriters', obsession: 5, conversation: 5 },
    { name: 'typography', obsession: 5, conversation: 5 },
    { name: 'whisky', obsession: 4, conversation: 4 },
  ]

  const SUBTITLES = {
    obsession: 'ranked by how out of hand<br>the obsession is getting',
    conversation: 'ranked by how difficult it would be<br>to escape a conversation with me',
  }

  const random = new SeededRandom('stuff')

  const CHART_WIDTH = 1920
  const CHART_HEIGHT = 1080
  const MARGIN = 1

  const pack = d3
    .pack()
    .size([CHART_WIDTH - MARGIN * 2, CHART_HEIGHT - MARGIN * 2])
    .padding(10)

  let valueKey: 'obsession' | 'conversation' | undefined = $state(
    navigationDirection > 0 ? undefined : 'conversation',
  )

  function getValue(thing: Thing) {
    if (valueKey === undefined) {
      return random.numberBetween(1, 1.7)
    }

    return thing[valueKey]
  }

  function getOpacity(value: number) {
    return 0.7 + value * 0.07
  }

  let data: d3.HierarchyCircularNode<Thing>[] = $derived(
    // @ts-expect-error I have no idea what this is
    // complaining about and I don't have time to fix it.
    pack(d3.hierarchy<Thing>({ children: STUFF }).sum(getValue)).leaves(),
  )

  const onKeyPress = hijackNavigation((event, release) => {
    if (event.key === 'ArrowRight') {
      switch (valueKey) {
        case undefined:
          valueKey = 'obsession'
          return
        case 'obsession':
          valueKey = 'conversation'
          return
      }
    }

    if (event.key === 'ArrowLeft') {
      switch (valueKey) {
        case 'conversation':
          valueKey = 'obsession'
          return
        case 'obsession':
          valueKey = undefined
          return
      }
    }

    release()
  })
</script>

<svelte:window onkeydowncapture={onKeyPress} />

<div class="wrapper">
  {#if valueKey}
    <h2><SvelteMarkdown source={SUBTITLES[valueKey]} isInline /></h2>
  {/if}
  <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
    {#each data as thing, i (i)}
      <g style:transform="translate({thing.x}px, {thing.y}px)">
        <circle
          cx={0}
          cy={0}
          r={thing.r}
          fill="var(--dark)"
          fill-opacity={getOpacity(getValue(thing.data))}
        >
        </circle>
        <text text-anchor="middle" dominant-baseline="middle">
          <tspan x="0" y="0" style:font-size={Math.max(1.5, getValue(thing.data) * 0.6) + 'rem'}
            >{thing.data.name}</tspan
          >
        </text>
      </g>
    {/each}
  </svg>
</div>

<style>
  .wrapper {
    display: flex;
  }

  h2 {
    z-index: 0;
  }

  svg {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 100%;
    height: 90%;
  }

  g {
    transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  circle {
    transition: r 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  }

  text {
    font-variation-settings: 'wdth' 80;
    line-height: 0.75;
    color: var(--light);
    text-align: center;
    white-space: pre;
  }
</style>
