import Best_1 from '../assets/bestSell/1.png';
import Best_2 from '../assets/bestSell/2.png';
import Best_3 from '../assets/bestSell/3.png';
import Best_4 from '../assets/bestSell/4.png';
import Cate_1 from '../assets/category/1.png';
import Cate_2 from '../assets/category/2.png';
import Cate_3 from '../assets/category/3.png';
import Cate_4 from '../assets/category/4.png';
import Cate_5 from '../assets/category/5.png';
import Cate_6 from '../assets/category/6.png';
import Tag_1 from '../assets/Tag/1.png';
import Tag_2 from '../assets/Tag/2.png';
import Tag_3 from '../assets/Tag/3.png';
import Tag_4 from '../assets/Tag/4.png';
import Tag_5 from '../assets/Tag/5.png';
import TAG from '../assets/tag.png';

import {
  Facebook,
  Instagram,
  Linkedin,
  Product,
  Twitter,
  Youtube,
} from './icons';
const HEADER_NAV = [
  { id: 1, name: 'Beleuchtung' },
  { id: 2, name: 'Growbox', children: [{ id: 1, name: 'Komplettsets' }] },
  { id: 3, name: 'Dünger' },
  { id: 4, name: 'Erde & Substrate' },
  {
    id: 5,
    name: 'Töpfe & Behälter',
    children: [
      { id: 1, name: 'Eckige Töpfe' },
      { id: 1, name: 'Runde Töpfe' },
      { id: 1, name: 'Untersetzer' },
      { id: 1, name: 'Pflanzschalen' },
    ],
  },
  { id: 6, name: 'Bewässerung ' },
  { id: 7, name: 'Pflanzen & Gärtnern' },
  { id: 8, name: 'Lüftung & Klimaanlage' },
];
const BEST_SELL = [
  {
    id: 1,
    image: Best_1,
    name: 'Growbox',
    description: 'Dress',
    price: '$ 963.85',
  },
  {
    id: 2,
    image: Best_2,
    name: 'Töpfe',
    description: '5 by 5 pots for planting',
    price: '$ 6130.00',
  },
  {
    id: 3,
    image: Best_3,
    name: 'Lichthänger-Set',
    description: 'Light-hanger set ',
    price: '$ 753.00',
  },
  {
    id: 4,
    image: Best_4,
    name: 'Licht',
    description: 'Dress',
    price: '$ 1155.00',
    sale_price: '$ 2364.00',
    sale: 'sale',
  },
];
const TAGS = [
  { id: 1, images: Tag_1, name: 'Garten Spaten' },
  { id: 2, images: Tag_2, name: 'Sand' },
  { id: 3, images: Tag_3, name: 'Pflanzer' },
  { id: 4, images: Tag_4, name: 'Schlammkuchen' },
  { id: 5, images: Tag_5, name: 'Klemmen' },
];
const CATEGORY = [
  { id: 1, image: Cate_1, name: 'Beleuchtung', stock: '30 items' },
  { id: 2, image: Cate_2, name: 'Dünger', stock: '20 items' },
  { id: 3, image: Cate_3, name: 'Erde & Substrate', stock: '20 items' },
  { id: 4, image: Cate_4, name: 'Erde & Substrate', stock: '20 items' },
  { id: 5, image: Cate_5, name: 'Erde & Substrate', stock: '20 items' },
  { id: 6, image: Cate_6, name: 'Beleuchtung', stock: '30 items' },
];

const FOOTER_NAV = [
  {
    id: 1,
    title: 'Um',
    children: [
      { id: 1, name: 'Kontaktiere uns' },
      { id: 2, name: 'Über uns' },
      { id: 3, name: 'Karriere' },
      { id: 4, name: 'Unternehmensinformationen ' },
    ],
  },
  {
    id: 2,
    title: 'Hilfe',
    children: [
      { id: 1, name: 'Unsere Produzenten' },
      { id: 2, name: 'Zahlung' },
      { id: 3, name: 'Versand' },
      { id: 4, name: 'Stornierung & Rückgabe' },
      { id: 5, name: 'Verstoß melden' },
    ],
  },
  {
    id: 3,
    title: 'pOLITIK',
    children: [
      { id: 1, name: 'Rücknahmegarantie' },
      { id: 2, name: 'Nutzungsbedingungen' },
      { id: 3, name: 'Sicherheit' },
      { id: 4, name: 'Sicherheit ' },
      { id: 5, name: 'Seitenverzeichnis ' },
    ],
  },
];
const FOOTER_SOCIAL = [
  { id: 1, icon: Facebook },
  { id: 2, icon: Twitter },
  { id: 3, icon: Linkedin },
  { id: 4, icon: Youtube },
  { id: 5, icon: Instagram },
];
const PRODUCT_TAG = [
  { id: 1, name: 'Eckige Töpfe', image: TAG },
  { id: 1, name: 'Runde Töpfe', image: TAG },
  { id: 1, name: 'Untersetzer', image: TAG },
  { id: 1, name: 'Pflanzschalen', image: TAG },
];
const PRODUCT_LIST = [
  {
    id: 1,
    name: 'Square cultivation pots',
    price: '$38.00',
    price_sale: '$45.00',
    image: Product,
  },
  {
    id: 2,
    name: 'Round plant pots',
    price: '$28.00',
    price_sale: '',
    image: Product,
    sell: 'Sell',
  },
  {
    id: 3,
    name: 'Square plant pots',
    price: '$21.00',
    price_sale: '$45.00',
    image: Product,
  },
  {
    id: 4,
    name: 'Mesh pots round',
    price: '$45.00',
    price_sale: '',
    image: Product,
  },
  {
    id: 5,
    name: 'Square cultivation pots',
    price: '$23.00',
    price_sale: '$45.00',
    image: Product,
  },
  {
    id: 6,
    name: 'Mess pot',
    price: '$43.00',
    price_sale: '',
    image: Product,
  },
  {
    id: 7,
    name: 'Square plant',
    price: '$10.00',
    price_sale: '',
    image: Product,
  },
  {
    id: 8,
    name: 'Round plant pot',
    price: '$25.00',
    price_sale: '',
    image: Product,
  },
  {
    id: 9,
    name: 'Square plant',
    price: '$12.00',
    price_sale: '',
    image: Product,
    sell: 'Sell',
  },
];
const CATEGORY_TAG = [
  { id: 1, name: 'Eckige Töpfe' },
  { id: 1, name: 'Runde Töpfe' },
  { id: 1, name: 'Untersetzer' },
  { id: 1, name: 'Pflanzschalen' },
];
export {
  BEST_SELL,
  CATEGORY,
  FOOTER_NAV,
  FOOTER_SOCIAL,
  HEADER_NAV,
  TAGS,
  PRODUCT_TAG,
  PRODUCT_LIST,
  CATEGORY_TAG,
};
