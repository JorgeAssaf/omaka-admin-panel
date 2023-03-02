const initalState = {
    newPedidoUbicacion: [],
    newBound:[]
  };
  


export default (state = initalState, action: any) => {
    switch (action.type) {
      case "setNewPedido":
          console.log(action.payload);
        return { ...state, newPedidoUbicacion: action.payload };
      case "setNewBound":
          console.log(action.payload);
          return { ...state, newBound:action.payload }; 
      case "cleanNewPedido":
        return initalState;
      default:
        return state;
    }
  };

