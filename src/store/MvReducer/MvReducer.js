const initState = {
  showMvModal: false,
  idShow: null,
  autoPlay: true,
  showSmallScreen: false,
};

export const MvReducer = (state = initState, { type, payLoad }) => {
  switch (type) {
    case "SET_SHOW_MV_MODAL": {
      return {
        ...state,
        showMvModal: payLoad,
      };
    }
    case "SET_ID_MV_MODAL": {
      return {
        ...state,
        idShow: payLoad,
      };
    }
    case "SET_MV_AUTO_PLAY": {
      return {
        ...state,
        autoPlay: payLoad,
      };
    }
    case "SET_SHOW_SMALL_SCREEN": {
      return {
        ...state,
        showSmallScreen: payLoad,
      };
    }
    default:
      return {
        ...state,
      };
  }
};
