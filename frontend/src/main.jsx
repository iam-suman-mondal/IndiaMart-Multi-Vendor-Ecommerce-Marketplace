import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router";

import { router } from "./routers/router";
import { ToastContainer } from "react-toastify";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
 import "./index.css";
 import { Provider } from "react-redux";
import { store } from "./redux/store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <Provider store={store}>
  <RouterProvider router={router} />

    <ToastContainer
      position="top-right"
      autoClose={3000}
      theme="light"
    />
  </Provider>
   
    
  </>
);