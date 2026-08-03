// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./slice/cartSlice";

// import {
//   persistStore,
//   persistReducer,
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER,
// } from "redux-persist";

// import storageModule from "redux-persist/lib/storage";

// const storage = storageModule.default || storageModule;

// console.log(storage)

// const persistConfig = {
//   key: "root",
//   storage,
// };




// export const store = configureStore({
//   reducer: {
//     cart: persistedCartReducer,
//   },

//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [
//           FLUSH,
//           REHYDRATE,
//           PAUSE,
//           PERSIST,
//           PURGE,
//           REGISTER,
//         ],
//       },
//     }),
// });


// export const persistor = persistStore(store);