import React from "react";
import AdminNavigation from "../components/AdminNavigation/AdminNavigation";

function Admin({ children }) {
  return (
    <>
      <AdminNavigation />
      {children}
    </>
  );
}

export default Admin;
