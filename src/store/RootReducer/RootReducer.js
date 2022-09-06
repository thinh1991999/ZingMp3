const lastestStorage = () => {
  const data = JSON.parse(localStorage.getItem("lastest"));
  if (typeof data !== "object" || data === null) {
    return [];
  }
  return data;
};

const initState = {
  currentUser: null,
  loginStatus: false,
  title: "",
  blackHeader: false,
  scroll: true,
  lastest: lastestStorage(),
  activeSearch: false,
  showNavMobile: false,
  btnMobile: null,
  currentChart: "",
  showComment: {
    show: false,
    id: "",
  },
  warningModal: {
    show: false,
    type: "",
  },
  showLogin: false,
  routerHistory: [],
  currentRouter: null,
};

export const RootReducer = (state = initState, { type, payLoad }) => {
  switch (type) {
    case "SET_LOADING": {
      return {
        ...state,
        loading: false,
      };
    }
    case "SET_TITLE": {
      return {
        ...state,
        title: payLoad,
      };
    }
    case "SET_CURRENT_USER": {
      return {
        ...state,
        currentUser: payLoad,
      };
    }
    case "SET_LOGIN_STATUS": {
      return {
        ...state,
        loginStatus: payLoad,
      };
    }
    case "SET_SHOW_LOGIN": {
      return {
        ...state,
        showLogin: payLoad,
      };
    }
    case "SET_SHOW_COMMENT": {
      return {
        ...state,
        showComment: payLoad,
      };
    }
    case "SET_BG_HEADER": {
      return {
        ...state,
        blackHeader: payLoad,
      };
    }
    case "SET_SCROLL": {
      return {
        ...state,
        scroll: payLoad,
      };
    }
    case "SET_SHOW_NAV_MOBILE": {
      return {
        ...state,
        showNavMobile: payLoad,
      };
    }
    case "SET_BTN_MOBILE": {
      return {
        ...state,
        btnMobile: payLoad,
      };
    }
    case "SET_WARNING_MODAL": {
      return {
        ...state,
        warningModal: payLoad,
      };
    }

    case "SET_INVI": {
      return {
        ...state,
        invi: payLoad,
      };
    }
    case "SET_ACTIVE_SEARCH": {
      return {
        ...state,
        activeSearch: payLoad,
      };
    }
    case "SET_WARNING": {
      return {
        ...state,
        warning: Object.assign({}, payLoad),
      };
    }
    case "SET_ROUTER_HISTORY": {
      const findIdx = state.routerHistory.findIndex((history) => {
        return history.key === payLoad.key;
      });
      if (findIdx !== -1) {
        return { ...state };
      }
      const newRouterHistory = [...state.routerHistory, payLoad];
      return { ...state, routerHistory: newRouterHistory };
    }
    case "SET_CURRENT_ROUTER": {
      return { ...state, currentRouter: payLoad };
    }
    default:
      return state;
  }
};
