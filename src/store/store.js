import { compose, createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { rootReducer } from './root.reducer';
import thunk from 'redux-thunk';

const persistConfig = {
    key: 'root',
    storage: storage,
    whitelist: ['cart']
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

// .filter(Boolean) is a trick that removes 'falsy' values so that we pass empty middleware, rather than 'false' which will break when used
const middlewares = [process.env.NODE_ENV !== 'production' && logger, thunk].filter(Boolean);

const composeEnhancer = (process.env.NODE_ENV !== 'production' && window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// compose is just a Redux function that allows us to pass functions as an array rather than stacking them inside one another
const composedEnhancers = composeEnhancer(applyMiddleware(...middlewares));

export const store = createStore(persistedReducer, undefined, composedEnhancers);

export const persistor = persistStore(store);
