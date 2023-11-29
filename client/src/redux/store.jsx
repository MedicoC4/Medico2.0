import { configureStore } from '@reduxjs/toolkit'
import idProdReducer from './productSlicer.jsx';


export const store = configureStore({
  reducer: {
    idProd: idProdReducer,

  },
})