const initalState = {
    repartidorList: [],
  };
  
  export default (state = initalState, action: any) => {
    switch (action.type) {
      case "setRepartidorList":
        return { ...state, repartidorList: action.payload };
      default:
        return state;
    }
  };
  