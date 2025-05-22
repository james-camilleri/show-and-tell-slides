<script lang="ts">
  import { blur } from 'svelte/transition'
  import SvelteMarkdown from 'svelte-markdown'

  import { hijackNavigation } from '$lib/slide'

  let { navigationDirection }: { navigationDirection: number } = $props()

  const LIFE_EVENTS = [
    { year: 1992, description: 'born 🎉' },
    { start: 1992, description: 'happy childhood' },
    { start: 2010, end: 2013, description: 'BSc in Computer Science (and stuff)' },
    { year: 2012, description: '6 months in Copenhagen for Erasmus' },
    { start: 2013, end: 2017, description: 'graphic design job, because I was sick of computers' },
    {
      start: 2017,
      end: 2020,
      description: 'first real software dev job (credit card processing full stack)',
    },
    { year: 2020, description: 'moved to ✨London✨' },
    {
      start: 2020,
      end: 2024,
      description: "various software engineering jobs you're not interested in",
    },
    {
      start: 2021,
      end: 2023,
      description: 'MArch in Design for Performance and Interaction, for "fun"',
    },
    { year: 2024, description: 'joined ~~BidFX~~ SGX FX' },
  ]

  const significantYears = new Set(
    LIFE_EVENTS.map((event) => event?.year ?? [event.start, event.end])
      .flat()
      .filter(Boolean),
  )

  const timelineStart = LIFE_EVENTS.map((event) => event?.year ?? event?.start).sort()[0]
  const thisYear = new Date().getFullYear()
  const timelineLength = thisYear - timelineStart
  const timelineStartOffset = (year: number) =>
    `${((year - timelineStart) / timelineLength) * 100}%`
  const timelineEndOffset = (year: number) => `${((thisYear - year) / timelineLength) * 100}%`

  let currentEventIndex = $state(navigationDirection > 0 ? -1 : LIFE_EVENTS.length - 1)
  let currentEvent = $derived(LIFE_EVENTS[currentEventIndex])

  let eventStart = $derived(currentEvent?.year ?? currentEvent?.start)
  let eventEnd = $derived(currentEvent?.year ?? currentEvent?.end ?? thisYear)

  const onKeyPress = hijackNavigation((event, release) => {
    if (event.key === 'ArrowRight' && currentEventIndex !== LIFE_EVENTS.length - 1) {
      currentEventIndex++
      return
    }

    if (event.key === 'ArrowLeft' && currentEventIndex !== -1) {
      currentEventIndex--
      return
    }

    release()
  })
</script>

<svelte:window onkeydowncapture={onKeyPress} />

<div class="wrapper">
  <div class="timeline-wrapper">
    <div class="timeline">
      {#if currentEvent}
        <div
          class="current-event"
          class:point={eventStart === eventEnd}
          style:--start={timelineStartOffset(eventStart)}
          style:--end={timelineEndOffset(eventEnd)}
        ></div>
      {/if}
      {#each LIFE_EVENTS as event (event.description)}
        <div class:point={event.year} class:span={event.start && event.end}></div>
      {/each}
      <div class="markers">
        {#each { length: timelineLength + 1 } as _, i (i)}
          {@const year = timelineStart + i}
          <div class="year-marker" style:left={timelineStartOffset(year)}>
            {#if significantYears.has(year) && year !== thisYear && year !== timelineStart}
              {year}
            {/if}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <div class="description-wrapper">
    {#key currentEventIndex}
      <div class="description" transition:blur>
        {#if currentEvent}
          <div class="year">
            {currentEvent.year ?
              currentEvent.year
            : `${currentEvent.start} – ${currentEvent.end ?? thisYear}`}
          </div>
          <div class="text">
            <SvelteMarkdown source={currentEvent.description} isInline />
          </div>
        {/if}
      </div>
    {/key}
  </div>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  .timeline-wrapper {
    display: flex;
    flex: 1;
    align-items: center;
  }

  .timeline {
    position: relative;
    display: flex;
    width: 100%;
    height: 0.5rem;
    background: var(--dark);

    &::before,
    &::after {
      position: absolute;
      top: 50%;
      display: block;
      width: 1rem;
      height: 4rem;
      content: '';
      background: var(--dark);
    }

    &::before {
      left: 0;
      transform: translate(-50%, -50%);
    }

    &::after {
      right: 0;
      transform: translate(50%, -50%);
    }
  }

  .current-event {
    z-index: 1;
    width: 100%;
    min-width: 1rem;
    height: 1rem;
    margin-inline: var(--start) var(--end);
    background: var(--light);
    border-radius: 2rem;
    transform: translate(0, -2rem);
    transition: margin 1.5s cubic-bezier(0.075, 0.82, 0.165, 1);

    &::after {
      position: absolute;
      inset: 50%;
      z-index: -1;
      width: 2.5rem;
      height: 2.5rem;
      content: '';
      background: var(--light);
      border-radius: 2.5rem;
      opacity: 0.6;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    }

    /* Refine styles for single point events. */
    &.point {
      margin-inline: calc(var(--start) - 0.5rem) calc(var(--end) + 0.5rem);

      /* stylelint-disable-next-line max-nesting-depth */
      &::after {
        transform: translate(-50%, -50%) scale(1);
      }
    }
  }

  .year-marker {
    position: absolute;
    top: 2rem;
    font-size: 0.5em;
    transform: translateX(-50%);

    &::after {
      position: absolute;
      top: -2rem;
      left: 50%;
      display: block;
      width: 0.1rem;
      height: 2rem;
      content: '';
      background: var(--dark);
    }

    &:first-child::after,
    &:last-child::after {
      display: none;
    }

    &:nth-child(odd) {
      top: 4rem;

      /* stylelint-disable-next-line max-nesting-depth */
      &::after {
        top: -4rem;
        height: 4rem;
      }
    }
  }

  .description-wrapper {
    color: var(--light);
    position: relative;
    height: 10rem;
  }

  .description {
    position: absolute;
    inset: 0;
    text-align: center;
  }

  .year {
    font-weight: bold;
  }

  .text {
    font-size: 0.8em;
  }
</style>
