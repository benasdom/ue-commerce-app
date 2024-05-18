import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './reducers/cartReducer';
// import sumcart from './reducers/sumcart';

export default configureStore({
  reducer: {
    selectedItems: cartReducer,
    // carttotal:sumcart,
    
  }
})