const initalState = {
  orderList: [],
  orderListWithRate: [],
  newPedidoUbicacion: [],
  newBound: []
};

export default (state = initalState, action: any) => {
  switch (action.type) {
    case "setOrderList":
      return { ...state, orderList: action.payload };
    case "setOrderListWithRate":
      return { ...state, orderListWithRate: action.payload };
    case "setNewPedido":
      return { ...state, newPedidoUbicacion: action.payload };
    case "setNewBound":
      return { ...state, newBound: action.payload };
    case "cleanNewPedido":
      return initalState;
    default:
      return state;
  }
};
