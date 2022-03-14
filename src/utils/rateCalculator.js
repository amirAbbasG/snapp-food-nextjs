export const calculateRate = (scoreList) => {
  if (scoreList !== null && scoreList.length > 0) {
    const totalScore = scoreList.reduce((acc, item) => {
      return acc + item.score;
    }, 0);

    return (
      Math.round(
        (totalScore / [...scoreList].filter((s) => s.score !== 0).length) * 10
      ) / 10
    );
  } else {
    return 0;
  }
};

export const getBestCoupone = (coupons) => {
  if (coupons.length > 0) {
    const bestCoupon = coupons.reduce((acc, item) => {
      if (item.discount > acc) {
        acc = item.discount;
      }
      return acc;
    }, 0);

    return bestCoupon;
  } else {
    return 0;
  }
};

export const getPriceAverage = (foods) => {
  if (foods.length > 0) {
    const totalPrices = foods.reduce((acc, item) => {
      return acc + item.price;
    }, 0);

    return totalPrices / foods.length;
  } else {
    return 0;
  }
};

export const getFoodWithDiscount = (foods) => {
  if (foods.length > 0) {
    return [...foods].filter((f) => f.discount > 0);
  } else {
    return foods;
  }
};
