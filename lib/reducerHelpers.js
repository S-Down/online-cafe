export const initialDiscounts = [
  {
    id: 1,
    productsList: [],
    quantity: 0,
  },
  {
    id: 2,
    productsList: [],
    quantity: 0,
  },
  {
    id: 3,
    productsList: [],
    quantity: 0,
  },
];

export const discountReducer = (state, action) => {
  switch (action.type) {
    case "SELECT":
      return state.map((discount) => {
        if (discount.id === action.id) {
          return {
            ...discount,
            productsList: [...discount.productsList, action.product],
            quantity: discount.quantity + action.product.quantity,
          };
        } else {
          return discount;
        }
      });
    case "CANCEL":
      return state.map((discount) => {
        if (discount.id === action.id) {
          return {
            ...discount,
            productsList: discount.productsList.filter(
              (product) => product._id !== action.product._id
            ),
            quantity: discount.quantity - action.product.quantity,
          };
        } else {
          return discount;
        }
      });
    default:
      return state;
  }
};

export const initialCheckoutInfos = [
  {
    id: 1,
    total: 0,
    reduce: 0,
    title: "秋冬浓醇拿铁特惠",
    info: "单杯九折两杯八折三杯及以上七折",
  },
  {
    id: 2,
    total: 0,
    reduce: 0,
    title: "燕麦奶饮品特惠",
    info: "单杯九折两杯八五折三杯及以上八折",
  },
  {
    id: 3,
    total: 0,
    reduce: 0,
    title: "暂不参与特惠活动",
    info: "暂不享受优惠折扣",
  },
];

export const checkoutReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE":
      return state.map((checkoutInfo) => {
        if (checkoutInfo.id === action.id) {
          return {
            ...checkoutInfo,
            total: action.total,
            reduce: action.reduce,
          };
        } else {
          return checkoutInfo;
        }
      });
    default:
      return state;
  }
};
