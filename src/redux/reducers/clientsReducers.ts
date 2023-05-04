const initalState = {
  clientsList: [],
};

//* reducer
export default (state = initalState, action: any) => {
  switch (action.type) {
    case "setClientsList":
      return { ...state, clientsList: action.payload };
    case "cleanUserReduce":
      return initalState;
    default:
      return state;
  }
};
