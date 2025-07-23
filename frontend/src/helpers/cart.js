export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  const Price = state.cartItems.price;
  state.Price = addDecimals(Price);

  const taxPrice = 0.15 * Price;
  state.taxPrice = addDecimals(taxPrice);

  const totalPrice = Price + taxPrice;
  state.totalPrice = addDecimals(totalPrice);
  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
