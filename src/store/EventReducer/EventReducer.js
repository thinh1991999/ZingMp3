const initState = {
  showEvent: false,
  idEventShow: null,
};

export const EventReducer = (state = initState, { type, payLoad }) => {
  switch (type) {
    case "SET_SHOW_EVENT": {
      return {
        ...state,
        showEvent: payLoad,
      };
    }
    case "SET_ID_SHOW_EVENT": {
      return {
        ...state,
        idEventShow: payLoad,
      };
    }
    default:
      return state;
  }
};
