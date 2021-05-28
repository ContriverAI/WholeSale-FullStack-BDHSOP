import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoute from "./components/Route/AdminRoute";
import UserRoute from "./components/Route/UserRoute";
import { ToastProvider } from "react-toast-notifications";

function App() {
  return (
    <>
      <ToastProvider
        autoDismiss
        autoDismissTimeout={2000}
        placement="top-right"
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
