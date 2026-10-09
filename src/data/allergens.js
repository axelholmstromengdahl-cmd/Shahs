export const ALLERGENS = ['Selleri', 'Spannmål med gluten', 'Kräftdjur', 'Ägg', 'Fisk', 'Lupin', 'Mjölk', 'Blötdjur', 'Senap', 'Jordnöt', 'Nötter', 'Sesamfrön', 'Sojabönor', 'Svaveldioxid och sulfit'];

export const ALLERGEN_GROUPS = [
  { name: 'Risplattor', rows: ['Combo tallrik', 'Kyckling tallrik', 'Lamm tallrik', 'Falafel tallrik', 'Fisk tallrik', 'Kofta tallrik'] },
  { name: 'Gyros', rows: ['Combo gyros', 'Kyckling gyros', 'Lamm gyros', 'Falafel gyros', 'Fisk gyros', 'Kofta gyros'] },
  { name: 'Sallader', rows: ['Salad'] },
  { name: 'Pommes', rows: ['French Fries'] },
  { name: 'Sandwich', rows: ['Philly Cheese Steak', 'Chicken Cheese Steak', 'Cheese Burger', 'Chicken Sandwich', 'Spicy Chicken Sandwich'] },
  { name: 'Tillägg', rows: ['Chicken Nuggets', 'Hot Wings', 'Pitabread', 'Falafel', 'Hummus & pita'] },
  { name: 'Såser', rows: ['White Sauce', 'Röd sås', 'Grön sås'] },
  { name: 'Grönsaker', rows: ['Sallad', 'Tomat', 'Gurka', 'Lök', 'Svarta bönor', 'Kikärter', 'Paprika'] },
];

// Cell codes: 'X' innehåller, 'K' kan innehålla, 'T' kan tas bort, 'F' färgämne, 'G' genetiskt modifierad.
// Key: 'Grupp|Produkt' -> { Allergen: code }. Fill from "Shahs Allergenlista" row by row, e.g.
// 'Gyros|Combo gyros': { 'Spannmål med gluten': 'X', 'Mjölk': 'X', 'Sesamfrön': 'K' },
export const ALLERGEN_CELLS = {};
