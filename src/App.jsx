import React, { useEffect } from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "./apps/userslice";
import { auth } from "./firebasy/firebasyConfig";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/login";
import Register from "./pages/Register";

function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem("users")) ?? false;
  return user ? children : <Navigate to="/signup" />;
}

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path="/signup" element={<Register />} /> */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/" element={<Home />} />
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
