import type { Slide } from '$lib/slide'

import MalteseWords from '$assets/components/MalteseWords.svelte'
import Stuff from '$assets/components/Stuff.svelte'
import TimeLine from '$assets/components/TimeLine.svelte'
import Central from '$assets/images/central.png'
import ClientServerArchitecture from '$assets/images/client-server-architecture.png'
import EuropeMap from '$assets/images/europe-map.jpg'
import GraphicDesign from '$assets/images/graphic-design.gif'
import GreaterLondonMalta from '$assets/images/greater-london+malta.png'
import GreaterLondonMaltas from '$assets/images/greater-london+maltas.png'
import GreaterLondon from '$assets/images/greater-london.png'
import NeoPets from '$assets/images/neopets.png'
import ToolingNew from '$assets/images/tooling-new.png'
import Tooling from '$assets/images/tooling.png'

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
  {
    image: EuropeMap,
    notes: ['Yes it is very small.'],
  },
  {
    h2: 'How many Maltas could you fit inside the M25?',
  },
  { image: GreaterLondon, notes: ["That's the M25."] },
  {
    image: GreaterLondonMaltas,
    notes: [
      "That's just the main island – there are some other smaller ones.",
      'If you grind up the whole archipelago to a paste, and spread it over Greater London (which is not exactly the M25) you can fit about 9 in.',
    ],
  },
  { image: GreaterLondonMalta, notes: ['Watford to Woolwich.'] },
  {
    h1: 'The Maltese Language',
    h2: 'an ungodly smoothie of Arabic, Italian and English (with bits)',
  },
  {
    h2: 'which of these is a swear word?',
    component: MalteseWords,
  },
  {
    h1: "stuff I'm into",
    component: Stuff,
    notes: [
      '17 typewriters currently, unless I missed any.',
      '9 coffee machines, I think, excluding duplicates and my coffee grinder.',
      "Didn't count the plants because that would clue me in to the gravity of the situation.",
    ],
  },
  {
    h1: 'my life so far',
    component: TimeLine,
  },
  {
    h1: "let's talk about my actual job",
  },
  { image: NeoPets },
  { image: GraphicDesign, dark: true },
  { image: Central },
  { image: ClientServerArchitecture },
  { image: Tooling },
  { image: ToolingNew },
  { template: 'End' },
] as Slide[]
