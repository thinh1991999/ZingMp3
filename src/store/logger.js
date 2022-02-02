function logger(reducer) {
  return (state, action) => {
    console.group(action.type);
    console.log("preState", state);
    console.log("action", action.type);
    console.log("payload", action.payLoad);
    const newState = reducer(state, action);

    console.log("newState", newState);
    console.groupEnd();
    return newState;
  };
}

export default logger;
