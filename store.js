import { configureStore } from '@reduxjs/toolkit'

import basketReducerfrom  from  './features/basketSlice'
export const store = configureStore({
  reducer: {basket:basketReducerfrom},
})