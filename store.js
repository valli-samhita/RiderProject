import { configureStore } from '@reduxjs/toolkit';
import navReducer from './NavSlice'; // Import your reducer

export const store = configureStore({
  reducer: {
    nav: navReducer, // Add your reducer here
    // Add more reducers if you have them
  },
});

export default store;