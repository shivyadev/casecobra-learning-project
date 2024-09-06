export const PRODUCT_PRICES = {
  material: {
    silicone: 0,
    polycarbonate: 5_00,
  },
  finish: {
    smooth: 0,
    texture: 3_00,
  },
} as const;

export const BASE_PRICE = 14_00;

export const SHIPPING_COST = {
  "Free Shipping": {
    desc: "5-7 business days",
    cost: 0,
  },
  "Next day air": {
    desc: "At most 1 business days",
    cost: 15,
  },
} as const;
