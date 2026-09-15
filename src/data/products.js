export const VAT_RATE = 0.025

// `image` is the file name (without extension) in src/assets/products/.
// `category` matches an id in data/categories.js; products without one are extras.
// `description`, `ingredients` and `allergens` (keys of ALLERGENS in pages/ProductDetails.jsx)
// feed the product page.
// `bulkOffer` gives an extra percentage off each unit once `minQty` is reached.
export const PRODUCTS = {
  'classic-butter-croissant': {
    id: 'classic-butter-croissant',
    name: 'Classic Butter Croissant',
    image: 'classic-butter-croissant',
    category: 'croissants',
    price: 4.5,
    unit: 'piece',
    calories: 272,
    rating: 4.8,
    reviews: '2.1k+',
    description:
      'Our signature all-butter croissant — dozens of flaky, golden layers with a soft, honeycombed centre. Perfect on its own or with a spread of jam.',
    ingredients: ['50g white wheat flour', '20g French butter', '20ml mineral water', '10ml cow milk', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
  },
  'chocolate-croissant': {
    id: 'chocolate-croissant',
    name: 'Chocolate Croissant',
    image: 'chocolate-croissant',
    category: 'croissants',
    price: 5.25,
    unit: 'piece',
    calories: 310,
    rating: 4.9,
    reviews: '3.4k+',
    description:
      'Buttery laminated pastry wrapped around two bars of rich dark chocolate, baked until crisp outside and melting within.',
    ingredients: ['50g white wheat flour', '20g French butter', '15g dark chocolate', '10ml cow milk', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
    bulkOffer: { minQty: 2, percentOff: 10 },
  },
  'almond-croissant': {
    id: 'almond-croissant',
    name: 'Almond Croissant',
    image: 'almond-croissant',
    category: 'croissants',
    price: 5.75,
    unit: 'piece',
    calories: 420,
    rating: 4.7,
    reviews: '1.8k+',
    description:
      'Twice-baked and filled with sweet almond frangipane, topped with toasted flaked almonds and a dusting of icing sugar.',
    ingredients: ['50g white wheat flour', '20g French butter', '20g almond frangipane', '10g flaked almonds', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk', 'nuts'],
    bulkOffer: { minQty: 2, percentOff: 10 },
  },
  'ham-cheese-croissant': {
    id: 'ham-cheese-croissant',
    name: 'Ham & Cheese Croissant',
    image: 'ham&cheese-croissant',
    category: 'croissants',
    price: 6.5,
    unit: 'piece',
    calories: 385,
    rating: 4.6,
    reviews: '980+',
    description:
      'A savoury classic — flaky croissant layered with smoked ham and melted Emmental, finished with a golden cheese crust.',
    ingredients: ['50g white wheat flour', '20g French butter', '25g smoked ham', '20g Emmental cheese', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
  },
  'pistachio-croissant': {
    id: 'pistachio-croissant',
    name: 'Pistachio Croissant',
    image: 'pistachio-croissant',
    category: 'croissants',
    price: 6.95,
    unit: 'piece',
    calories: 395,
    rating: 4.9,
    reviews: '2.7k+',
    description:
      'Filled with silky pistachio cream and crowned with chopped Sicilian pistachios for a nutty, indulgent bite.',
    ingredients: ['50g white wheat flour', '20g French butter', '20g pistachio cream', '10g chopped pistachios', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk', 'nuts'],
    isNew: true,
  },
  'matcha-white-choc-croissant': {
    id: 'matcha-white-choc-croissant',
    name: 'Matcha White Choc Croissant',
    image: 'matcha-white-choc-croissant',
    category: 'croissants',
    price: 7.25,
    unit: 'piece',
    calories: 365,
    rating: 4.5,
    reviews: '640+',
    description:
      'Earthy Japanese matcha meets creamy white chocolate in a vibrant green-glazed croissant.',
    ingredients: ['50g white wheat flour', '20g French butter', '15g white chocolate', '3g matcha powder', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
  },
  'plain-croissant': {
    id: 'plain-croissant',
    name: 'Plain Croissant',
    image: 'plain-croissant',
    category: 'croissants',
    price: 3.75,
    unit: 'piece',
    calories: 240,
    rating: 4.4,
    reviews: '5.2k+',
    description:
      'A light, everyday croissant with a crisp shell and airy crumb — the perfect partner for your morning coffee.',
    ingredients: ['50g white wheat flour', '15g butter', '20ml mineral water', '10ml cow milk', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
  },
  'raspberry-croissant': {
    id: 'raspberry-croissant',
    name: 'Raspberry Croissant',
    image: 'raspberry-croissant',
    category: 'croissants',
    price: 5.5,
    unit: 'piece',
    calories: 335,
    rating: 4.7,
    reviews: '1.5k+',
    description:
      'Bright raspberry compote folded into buttery layers, finished with a sweet raspberry glaze.',
    ingredients: ['50g white wheat flour', '20g French butter', '20g raspberry compote', '10ml cow milk', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
  },
  'cinnamon-creme-croissant': {
    id: 'cinnamon-creme-croissant',
    name: 'Cinnamon Crème Croissant',
    image: 'cinnamon-creme-croissant',
    category: 'croissants',
    price: 5.95,
    unit: 'piece',
    calories: 350,
    rating: 4.8,
    reviews: '2.3k+',
    description:
      'Swirled with cinnamon sugar and filled with smooth vanilla crème pâtissière — cosy comfort in every bite.',
    ingredients: ['50g white wheat flour', '20g French butter', '20g crème pâtissière', '2g ground cinnamon', '1 whole egg'],
    allergens: ['gluten', 'eggs', 'milk'],
  },
  'chocolate-syrup': {
    id: 'chocolate-syrup',
    name: 'Chocolate Syrup',
    image: 'chocolate-syrup',
    price: 3,
  },
  'caramel-sauce': {
    id: 'caramel-sauce',
    name: 'Caramel Sauce',
    image: 'caramel-sauce',
    price: 2.5,
  },
  'whipped-cream': {
    id: 'whipped-cream',
    name: 'Whipped Cream',
    image: 'whipped-cream',
    price: 1.5,
  },
}

export const SUGGESTED_PRODUCT_IDS = ['chocolate-syrup', 'caramel-sauce', 'whipped-cream']

export const SAMPLE_CART = [
  { productId: 'almond-croissant', qty: 1 },
  { productId: 'chocolate-croissant', qty: 1 },
]

export const formatPrice = (amount) => `$${amount.toFixed(2).replace(/\.00$/, '')}`
