export const InsertItem = (state, data, totalItems) => {
  const existingItemIndex = state.findIndex((item) => item._id === data._id);
  const exisitngItem = state[existingItemIndex];

  if (exisitngItem) {
    // data exist just update its quantity
    // const exisitngItem = state[existingItemIndex];
    if (
      exisitngItem.variants[0].flavor === data.variants[0].flavor &&
      exisitngItem.variants[0].weight.weight === data.variants[0].weight.weight
    ) {
      exisitngItem.quantity++;
    } else {
      exisitngItem.variants = [...data.variants];
    }
    exisitngItem.totatPrice =
      exisitngItem.variants[0].price * exisitngItem.quantity;
    state[existingItemIndex] = exisitngItem;
  } else {
    // data does not exists in cart
    const newItem = {
      ...data,
      totatPrice: +data.variants[0].price,
      quantity: 1,
    };
    state = state.concat(newItem);

    totalItems = totalItems + 1;
  }
};
