import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./routers/router";
import { ToastContainer } from "react-toastify";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import "./index.css";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./redux/store.js";
import { Provider } from "react-redux";
ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>

    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="light"
    />

  </>
);