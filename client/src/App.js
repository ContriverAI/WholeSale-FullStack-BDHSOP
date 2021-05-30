import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoute from "./components/Route/AdminRoute";
import UserRoute from "./components/Route/UserRoute";
import { ToastProvider } from "react-toast-notifications";

function App() {
  React.useEffect(() => {
    console.log(window.innerWidth);
  });
  return (
    <>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={2000}
        placement={window.innerWidth < 426 ? "bottom-center" : "top-right"}
        // placement="bottom-center"
      >
        <Router>
          <AdminRoute />
          <UserRoute />
        </Router>
      </ToastProvider>
    </>
  );
}

export default App;
