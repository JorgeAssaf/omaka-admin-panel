const initalState = {
  activeRates:[],
  historyRates:[],
};

//* reducer
export default (state = initalState, action: any) => {
  switch (action.type) {
    case "setActiveRates":
      return { ...state, activeRates: action.payload };
    case "setHistoryRates":
      return { ...state, historyRates: action.payload };
    case "cleanUserReduce":
      return initalState;
    default:
      return state;
  }
};
