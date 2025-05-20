<script lang="ts">
  let { navigationDirection }: { navigationDirection: number } = $props()

  const STUFF = [
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

  let visibleTranslations = $state(navigationDirection > 0 ? -1 : WORDS.length - 1)

  function onKeyPress(event: KeyboardEvent) {
    if (event.key === 'ArrowRight' && visibleTranslations !== WORDS.length - 1) {
      visibleTranslations++
      event.stopPropagation()
      return
    }

    if (event.key === 'ArrowLeft' && visibleTranslations !== -1) {
      visibleTranslations--
      event.stopPropagation()
      return
    }
  }
</script>

<svelte:window onkeydowncapture={onKeyPress} />

<div class="wrapper">
  {#each WORDS as x}
    <div class="word-wrapper" class:visible={i <= visibleTranslations}>
      <div class="word" class:visible={i <= visibleTranslations}>
        {word}
        <div class="translation">
          {translation}
        </div>
      </div>
      <div class="word" class:visible={i > visibleTranslations}>
        {word}
        <div class="translation">?</div>
      </div>
    </div>
  {/each}
</div>

<style>
  .wrapper {
    display: grid;
    grid-template: repeat(2, 1fr) / repeat(3, 1fr);
    gap: 12rem;
    width: 100%;
    height: 100%;
    padding-block-start: 20rem;
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
