import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import cityReducer from '../reducers/city'
import userReducer from '../reducers/user'
import searchReducer from '../reducers/search'

import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import localStorage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {

  city: {
    current:[],
    cities: [],
    isError: false,
    isLoading: false,
  },
  user: {
    userName: '',
  },
  search: {
    query:"",
    results: [],
    latitude:"",
    longitude:""
  }
}

const persistConfig = {
  key: 'root',
  storage: localStorage,
  transforms: [
    encryptTransform({
      secretKey: process.env.REACT_APP_SECRET_KEY,
      onError: (error) => {
        console.log(error)
      },
    }),
  ],
}

const bigReducer = combineReducers({
  city: cityReducer,
  user: userReducer,
  search: searchReducer
})

const persistedReducer = persistReducer(persistConfig, bigReducer)

// 2)
const configureStore = createStore(persistedReducer, initialState, composeEnhancers(applyMiddleware(thunk)))

// now we'll use the third argument of createStore to INJECT a MIDDLEWARE into the flow
// for applying a middleware we'll need to use a function from redux called applyMiddleware()

const persistor = persistStore(configureStore)

export { configureStore, persistor }