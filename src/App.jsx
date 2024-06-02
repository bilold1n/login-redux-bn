import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/login";
import Register from "./pages/Register";
import Protectdrouter from "./pages/provider/protectdrouter";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { auth } from "./firebasy/firebasyConfig";
import { onAuthStateChanged } from "firebase/auth";
import { login } from "./apps/userslice";
function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);
  const userr = user.users;
  const user1 = userr ? true : false;
  const routers = createBrowserRouter([
    {
      path: "/",
      element: (
        <Protectdrouter user={user1}>
          <Layout />
        </Protectdrouter>
      ),
      children: [
        { index: true, element: <Home /> },
        {
          path: "/about",
          element: <About />,
        },
      ],
    },
    {
      path: "/register",
      element: user1 ? <Navigate to="/" /> : <Register />,
    },
  ]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      dispatch(login(user));
    });
  }, []);
  return <RouterProvider router={routers} />;
}

export default App;
