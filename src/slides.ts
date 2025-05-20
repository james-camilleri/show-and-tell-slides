import type { Slide } from '$lib/slide'

import MalteseWords from '$assets/components/MalteseWords.svelte'
import Stuff from '$assets/components/Stuff.svelte'
import TimeLine from '$assets/components/TimeLine.svelte'
import EuropeMap from '$assets/images/europe-map.jpg'
import GraphicDesign from '$assets/images/graphic-design.gif'
import GreaterLondonMalta from '$assets/images/greater-london+malta.png'
import GreaterLondonMaltas from '$assets/images/greater-london+maltas.png'
import GreaterLondon from '$assets/images/greater-london.png'
import NeoPets from '$assets/images/neopets.png'

export default [
  { template: 'Start' },
  {
    h1: 'hello',
    h2: 'I am James.',
    notes: [
      'I made a slideshow.',
      'I am aware that this is slightly unhinged but I think I just like making slide decks.',
      'Also this will be slightly interactive.',
    ],
  },
  { image: EuropeMap },
  {
    h2: 'How many Maltas could you fit inside the M25?',
  },
  { image: GreaterLondon },
  { image: GreaterLondonMaltas },
  { image: GreaterLondonMalta },
  {
    h1: 'The Maltese Language',
    h2: 'an ungodly smoothie of Arabic, Italian and English (with bits)',
  },
  {
    h2: 'which of these is a swear word?',
    component: MalteseWords,
  },
  {
    // h1: "stuff I'm into",
    component: Stuff,
  },
  {
    h1: 'my life so far',
    component: TimeLine,
  },
  { image: NeoPets },
  { image: GraphicDesign, dark: true },
  { template: 'End' },
] as Slide[]
