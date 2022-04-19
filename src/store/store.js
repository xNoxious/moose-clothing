import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { rootReducer } from './root.reducer';

const middlewares = [logger];

// compose is just a Redux function that allows us to pass functions as an array rather than stacking them inside one another
const composedEnhancers = compose(applyMiddleware(...middlewares));

export const store = createStore(rootReducer, undefined, composedEnhancers);
