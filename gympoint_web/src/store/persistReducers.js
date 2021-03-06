import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

export default reducers => {
  const persistedReducer = persistReducer(
    {
      key: 'gympoint',
      storage,
      whitelist: ['auth', 'navitem'],
    },
    reducers,
  )

  return persistedReducer
}
