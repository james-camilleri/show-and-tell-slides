<script lang="ts">
  import * as d3 from 'd3'

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
    { name: 'architecture', obsession: 1, conversation: 1 },
    { name: 'board games', obsession: 1, conversation: 1 },
    { name: 'code', obsession: 1, conversation: 1 },
    { name: 'coffee', obsession: 4, conversation: 1 },
    { name: 'cooking', obsession: 3, conversation: 1 },
    { name: 'creative coding', obsession: 1, conversation: 1 },
    { name: 'design', obsession: 3, conversation: 1 },
    { name: 'eating', obsession: 4, conversation: 1 },
    { name: 'escape rooms', obsession: 1, conversation: 1 },
    { name: 'printing presses', obsession: 3, conversation: 1 },
    { name: 'plants', obsession: 3, conversation: 1 },
    { name: 'tap dance', obsession: 1, conversation: 1 },
    { name: 'tea', obsession: 3, conversation: 1 },
    { name: 'orange', obsession: 5, conversation: 1 },
    { name: 'theatre', obsession: 1, conversation: 1 },
    { name: 'travel', obsession: 2, conversation: 1 },
    { name: 'typewriters', obsession: 5, conversation: 1 },
    { name: 'typography', obsession: 5, conversation: 1 },
    { name: 'whisky', obsession: 4, conversation: 1 },
  ]

  const random = new SeededRandom('stuff')

  const CHART_WIDTH = 1920
  const CHART_HEIGHT = 1080
  const MARGIN = 1 // ?

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
  <svg viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT}`}>
    {#each data as thing (thing.data.name)}
      <g style:transform="translate({thing.x}px, {thing.y}px)">
        <g style:transform="scale({thing.r})">
          <circle r={1} fill="var(--dark)"> </circle>
        </g>
        <text clip-path="circle({thing.r})" text-anchor="middle" dominant-baseline="middle">
          <tspan x="0" y="0" style:font-size={Math.max(1.5, getValue(thing.data) * 0.6) + 'rem'}
            >{thing.data.name}</tspan
          >
        </text>
      </g>
    {/each}
  </svg>
</div>

<style>
  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  g {
    transition: transform 5s cubic-bezier(0.23, 1, 0.32, 1);
  }

  text {
    font-variation-settings: 'wdth' 80;
    line-height: 0.75;
    color: var(--light);
    text-align: center;
    white-space: pre;
  }

  circle {
    transition: transform 5s cubic-bezier(0.23, 1, 0.32, 1);
  }
</style>
