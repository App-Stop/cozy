import croissant from '../assets/menu/croissant.svg'
import cake from '../assets/menu/cake.svg'
import coffee from '../assets/menu/coffee.svg'
import bread from '../assets/menu/bread.svg'
import cupcake from '../assets/menu/cupcake.svg'
import cookie from '../assets/menu/cookie.svg'
import donut from '../assets/menu/donut.svg'

// `count` is the number of items shown next to each menu tab.
// `title` is the section heading above the product grid (falls back to `name`).
export const CATEGORIES = [
  {
    id: 'croissants',
    name: 'Croissants',
    title: 'Original Hand-Tossed Croissants',
    icon: croissant,
    count: 5,
  },
  { id: 'cakes', name: 'Cakes', icon: cake, count: 8 },
  { id: 'coffee', name: 'Coffee', icon: coffee, count: 16 },
  { id: 'bread', name: 'Bread', icon: bread, count: 4 },
  { id: 'cupcakes', name: 'Cupcakes', icon: cupcake, count: 10 },
  { id: 'cookies', name: 'Cookies', icon: cookie, count: 8 },
  { id: 'donuts', name: 'Donuts', icon: donut, count: 6 },
]
