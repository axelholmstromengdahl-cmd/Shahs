import { IMG } from './site.js';

export const SHOW_NEW_TAGS = true;
export const ROW_LIMIT = 4;

export const MENU = [
  { id: 'tallrikar', name: 'Tallrikar', intro: 'Signaturen sedan 2005.', cover: 'combo.jpg', items: [
    { n: 'Combo tallrik', d: 'Kyckling och lamm på ris med sallad, hummus och White Sauce.', img: 'combo.jpg' },
    { n: 'Kyckling tallrik', d: 'Grillad kyckling på ris med sallad, hummus och White Sauce.', img: 'chicken.jpg' },
    { n: 'Lamm tallrik', d: 'Lamm från grillen på ris med sallad, hummus och White Sauce.', img: 'lamb.jpg' },
    { n: 'Falafel tallrik', d: 'Krispig falafel på ris med sallad, hummus och White Sauce.', img: 'falafel.jpg' },
    { n: 'Fisk tallrik', d: 'Frasig fisk på ris med sallad och White Sauce.', img: 'fish.jpg' },
    { n: 'Kofta tallrik', d: 'Grillad kofta på ris med sallad, hummus och White Sauce.', img: 'kofta.jpg', isNew: true },
  ] },
  { id: 'gyros', name: 'Gyros', intro: 'Rostat pitabröd, fyllt till kanten.', cover: 'g_combo.jpg', items: [
    { n: 'Combo gyros', d: 'Kyckling och lamm i rostat pitabröd med sallad och White Sauce.', img: 'g_combo.jpg' },
    { n: 'Kyckling gyros', d: 'Grillad kyckling i rostat pitabröd med sallad och White Sauce.', img: 'g_chicken.jpg' },
    { n: 'Lamm gyros', d: 'Lamm i rostat pitabröd med sallad och White Sauce.', img: 'g_lamb.png', fit: 'contain' },
    { n: 'Falafel gyros', d: 'Krispig falafel i rostat pitabröd med sallad och White Sauce.', img: 'g_falafel.jpg' },
    { n: 'Fisk gyros', d: 'Frasig fisk i rostat pitabröd med sallad och White Sauce.', img: 'g_fish.jpg' },
    { n: 'Kofta gyros', d: 'Grillad kofta i rostat pitabröd med sallad och White Sauce.', img: 'g_kofta.jpg', isNew: true },
  ] },
  { id: 'sallader', name: 'Sallader', intro: 'Allt från salladsbaren.', items: [
    { n: 'Salad', d: 'Sallad, tomat, gurka, lök, svarta bönor, kikärter, paprika och hummus.' },
  ] },
  { id: 'pommes', name: 'Pommes', intro: 'Krispiga och kryddade.', cover: 'fries.jpg', items: [
    { n: 'French Fries', d: 'Krispiga och kryddade. Ta dem med White Sauce.', img: 'fries.jpg' },
  ] },
  { id: 'sandwich', name: 'Sandwich', intro: 'Burgare och steaks.', cover: 'philly.jpg', items: [
    { n: 'Philly Cheese Steak', d: 'Kött, smält ost, paprika och lök i rostat bröd.', img: 'philly.jpg' },
    { n: 'Cheese Burger', d: 'Grillad burgare med ost, sallad och tomat.', img: 'burger.jpg' },
    { n: 'Chicken Cheese Steak', d: 'Kyckling, smält ost, paprika och lök i rostat bröd.' },
    { n: 'Chicken Sandwich', d: 'Krispig kyckling i mjukt bröd.' },
    { n: 'Spicy Chicken Sandwich', d: 'Krispig kyckling med hetta.' },
  ] },
  { id: 'tillagg', name: 'Tillägg', intro: 'Till tallriken eller på sidan.', items: [
    { n: 'Chicken Nuggets', d: 'Krispiga bitar av kyckling.' },
    { n: 'Hot Wings', d: 'Heta vingar, krispiga på utsidan.' },
    { n: 'Pitabread', d: 'Rostat pitabröd.' },
    { n: 'Falafel', d: 'Krispig falafel.' },
    { n: 'Hummus & pita', d: 'Krämig hummus med rostat pitabröd.' },
  ] },
  { id: 'saser', name: 'Såser', intro: 'Hälls generöst.', cover: 'swhite.jpg', items: [
    { n: 'White Sauce', d: 'Signatursåsen. Vårt eget recept.', img: 'swhite.jpg' },
    { n: 'Röd sås', d: 'Stark.', img: 'sred.jpg' },
    { n: 'Grön sås', d: 'Frisk och örtig.', img: 'sgreen.jpg' },
  ] },
  { id: 'baklava', name: 'Baklava', intro: 'Avslutningen.', cover: 'baklava.jpg', items: [
    { n: 'Baklava', d: 'Söt avslutning på måltiden.', img: 'baklava.jpg' },
  ] },
].map(c => ({
  ...c,
  cover: c.cover ? IMG + c.cover : '',
  items: c.items.map(p => ({ ...p, img: p.img ? IMG + p.img : '', fit: p.fit || 'cover' })),
}));
