export default ({ dispatch }) => next => action => {
  //Check to see if actions have a promise in the 'payload' property
  if (!action.payload || !action.payload.then) {
    next(action);
    return;
  }
  // wait for promise to resolve and then create a new action to
  // be dispatched
  action.payload.then(response => {
    const newAction = { ...action, payload: response };
    dispatch(newAction);
  });
};
