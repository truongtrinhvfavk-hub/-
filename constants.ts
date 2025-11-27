import { Product } from './types';

export const CATEGORIES = ["全部", "鸡副系列", "猪副系列", "牛副系列", "肠类产品", "特色产品", "鸭货系列", "热卤"];

// Helper to generate placeholder image
export const getImg = (name: string, bg: string = 'ea580c') => 
  `https://placehold.co/400x400/${bg}/white?text=${encodeURIComponent(name.slice(0, 4))}`;

export const INITIAL_PRODUCTS: Product[] = [
  // 鸡副系列
  { id: '1', name: '酸辣全脱骨鸡爪', price: 400, unit: '件', category: '鸡副系列', flavor: '酸辣', spec: '20斤/件', subUnit: '4袋', image: getImg('酸辣鸡爪') },
  { id: '2', name: '蒜香全脱骨鸡爪', price: 400, unit: '件', category: '鸡副系列', flavor: '蒜香', spec: '20斤/件', subUnit: '4袋', image: getImg('蒜香鸡爪') },
  { id: '3', name: '柠檬全脱骨鸡爪', price: 400, unit: '件', category: '鸡副系列', flavor: '柠檬', spec: '20斤/件', subUnit: '4袋', image: getImg('柠檬鸡爪') },
  { id: '4', name: '藤椒脱骨鸡爪', price: 400, unit: '件', category: '鸡副系列', flavor: '藤椒', spec: '20斤/件', subUnit: '4袋', image: getImg('藤椒鸡爪') },
  { id: '5', name: '五香虎皮大鸡爪', price: 400, unit: '件', category: '鸡副系列', flavor: '五香', spec: '20斤/件', subUnit: '5袋', image: getImg('虎皮鸡爪') },
  { id: '6', name: '招牌手撕麻椒鸡', price: 340, unit: '件', category: '鸡副系列', flavor: '麻香', spec: '10只/件', subUnit: '10只', image: getImg('麻椒鸡') },
  { id: '6b', name: '招牌手撕藤椒鸡', price: 340, unit: '件', category: '鸡副系列', flavor: '干香麻辣', spec: '10只/件', subUnit: '10只', image: getImg('藤椒鸡') },

  // 猪副系列
  { id: '7', name: '飘香猪头肉', price: 350, unit: '件', category: '猪副系列', flavor: '五香', spec: '20斤/件', image: getImg('猪头肉', 'db2777') },
  { id: '7b', name: '飘香卤肥肠', price: 480, unit: '件', category: '猪副系列', flavor: '五香', spec: '20斤/件', image: getImg('卤肥肠', 'db2777') },
  { id: '8', name: '蜂蜜猪肝', price: 260, unit: '件', category: '猪副系列', flavor: '五香', spec: '20斤/件', image: getImg('蜂蜜猪肝', 'db2777') },
  { id: '9', name: '五香猪耳朵', price: 520, unit: '件', category: '猪副系列', flavor: '五香', spec: '20斤/件', subUnit: '4袋', image: getImg('猪耳朵', 'db2777') },
  { id: '11', name: '猪皮丝 (酸辣)', price: 200, unit: '件', category: '猪副系列', flavor: '酸辣', spec: '20斤/件', subUnit: '4袋', image: getImg('猪皮丝', 'db2777') },
  { id: '12', name: '猪皮丝 (香辣)', price: 200, unit: '件', category: '猪副系列', flavor: '香辣', spec: '20斤/件', subUnit: '4袋', image: getImg('猪皮丝', 'db2777') },
  { id: '13', name: '猪皮丝 (柠檬)', price: 200, unit: '件', category: '猪副系列', flavor: '柠檬', spec: '20斤/件', subUnit: '4袋', image: getImg('猪皮丝', 'db2777') },
  { id: '14', name: '猪蹄块 (五香)', price: 470, unit: '件', category: '猪副系列', flavor: '五香', spec: '20斤/件', subUnit: '4袋', image: getImg('猪蹄块', 'db2777') },
  { id: '15', name: '猪蹄块 (麻辣)', price: 470, unit: '件', category: '猪副系列', flavor: '麻辣', spec: '20斤/件', subUnit: '4袋', image: getImg('猪蹄块', 'db2777') },
  { id: '16', name: '去骨猪蹄 (五香)', price: 680, unit: '件', category: '猪副系列', flavor: '五香', spec: '20斤/件', subUnit: '4袋', image: getImg('去骨猪蹄', 'db2777') },
  { id: '17', name: '去骨猪蹄 (香辣)', price: 680, unit: '件', category: '猪副系列', flavor: '香辣', spec: '20斤/件', subUnit: '4袋', image: getImg('去骨猪蹄', 'db2777') },

  // 牛副系列
  { id: '18', name: '麻辣冷吃牛肉条', price: 960, unit: '件', category: '牛副系列', flavor: '香辣', spec: '20斤/件', subUnit: '4袋', image: getImg('牛肉条', '7f1d1d') },
  { id: '19', name: '五香牛腱', price: 900, unit: '件', category: '牛副系列', flavor: '五香', spec: '20斤/件', subUnit: '4袋', image: getImg('五香牛腱', '7f1d1d') },
  { id: '20', name: '酱牛腱', price: 960, unit: '件', category: '牛副系列', flavor: '酱香', spec: '20斤/件', subUnit: '4袋', image: getImg('酱牛腱', '7f1d1d') },
  { id: '21', name: '五香牛肚', price: 660, unit: '件', category: '牛副系列', flavor: '五香', spec: '20斤/件', subUnit: '4袋', image: getImg('五香牛肚', '7f1d1d') },

  // 肠类产品
  { id: '28', name: '商超专用小甜肠', price: 350, unit: '件', category: '肠类产品', flavor: '五香', spec: '20斤/件', image: getImg('小甜肠', 'be123c') },
  { id: '29', name: '商超专用卤肉肠 (蒜香)', price: 220, unit: '件', category: '肠类产品', flavor: '蒜香老卤', spec: '20斤/件', subUnit: '56支', image: getImg('卤肉肠', 'be123c') },
  { id: '30', name: '商超专用卤肉肠 (黑椒)', price: 220, unit: '件', category: '肠类产品', flavor: '黑椒老卤', spec: '20斤/件', subUnit: '56支', image: getImg('卤肉肠', 'be123c') },
  { id: '31', name: '商超专用卤肉肠 (麻辣)', price: 220, unit: '件', category: '肠类产品', flavor: '麻辣老卤', spec: '20斤/件', subUnit: '56支', image: getImg('卤肉肠', 'be123c') },
  { id: '32', name: '商超专用卤肉肠 (广式)', price: 220, unit: '件', category: '肠类产品', flavor: '广式老卤', spec: '20斤/件', subUnit: '56支', image: getImg('卤肉肠', 'be123c') },
  { id: '33', name: '鱼籽老卤肉偿', price: 280, unit: '件', category: '肠类产品', flavor: '鱼籽', spec: '20斤/件', subUnit: '56支', image: getImg('鱼籽肉肠', 'be123c') },
  { id: '34', name: '黑胡椒宝宝肠', price: 460, unit: '件', category: '肠类产品', flavor: '黑胡椒', spec: '16kg/件', subUnit: '20包', image: getImg('宝宝肠', 'be123c') },
  { id: '35', name: '广式宝宝肠', price: 460, unit: '件', category: '肠类产品', flavor: '广式', spec: '16kg/件', subUnit: '20包', image: getImg('宝宝肠', 'be123c') },

  // 特色产品
  { id: '36', name: '酸辣皮肚', price: 210, unit: '件', category: '特色产品', flavor: '酸辣', spec: '20斤/件', subUnit: '4袋', image: getImg('酸辣皮肚', 'b45309') },
  { id: '37', name: '重庆辣子鸡', price: 360, unit: '件', category: '特色产品', flavor: '麻辣', spec: '20斤/件', subUnit: '4袋', image: getImg('辣子鸡', 'b45309') },
  { id: '39', name: '椒麻农家小酥肉', price: 330, unit: '件', category: '特色产品', flavor: '海底捞同款', spec: '20斤/件', subUnit: '10袋', image: getImg('小酥肉', 'b45309') },

  // 鸭货系列
  { id: '40', name: '香辣鸭脖', price: 400, unit: '件', category: '鸭货系列', flavor: '香辣', spec: '160根/件', subUnit: '8袋', image: getImg('香辣鸭脖', '9a3412') },
  { id: '41', name: '香辣鸭头', price: 640, unit: '件', category: '鸭货系列', flavor: '香辣', spec: '160个/件', subUnit: '8袋', image: getImg('香辣鸭头', '9a3412') },
  { id: '42', name: '香辣鸭锁骨', price: 300, unit: '件', category: '鸭货系列', flavor: '香辣', spec: '120个/件', subUnit: '8袋', image: getImg('鸭锁骨', '9a3412') },
  { id: '43', name: '香辣鸭翅', price: 480, unit: '件', category: '鸭货系列', flavor: '香辣', spec: '300个/件', subUnit: '10袋', image: getImg('香辣鸭翅', '9a3412') },
  { id: '44', name: '香辣大鸭腿', price: 300, unit: '件', category: '鸭货系列', flavor: '香辣', spec: '60个/件', subUnit: '6袋', image: getImg('大鸭腿', '9a3412') },
  { id: '46', name: '红油鸭板肠', price: 528, unit: '件', category: '鸭货系列', flavor: '香辣', spec: '16斤/件', subUnit: '8袋', image: getImg('鸭板肠', '9a3412') },

  // 热卤
  { id: '47', name: '五香酱大骨', price: 480, unit: '件', category: '热卤', flavor: '五香', spec: '30斤/件', subUnit: '6袋', image: getImg('酱大骨', 'c2410c') },
  { id: '48', name: '香辣酱大骨', price: 480, unit: '件', category: '热卤', flavor: '香辣', spec: '30斤/件', subUnit: '6袋', image: getImg('酱大骨', 'c2410c') },
  { id: '49', name: '油卤鸭脖', price: 260, unit: '件', category: '热卤', flavor: '香辣', spec: '20斤/件', subUnit: '4袋', image: getImg('油卤鸭脖', 'c2410c') },
  { id: '50', name: '老北京羊蝎子', price: 375, unit: '件', category: '热卤', flavor: '香辣', spec: '12.5kg/件', subUnit: '10袋', image: getImg('羊蝎子', 'c2410c') },
  { id: '51', name: '筋头巴脑', price: 440, unit: '件', category: '热卤', flavor: '香辣', spec: '10kg/件', subUnit: '10袋', image: getImg('筋头巴脑', 'c2410c') },
];