import React from "react";
import Header from "../../components";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../apps/userslice";

export default function Layout() {
  const dispatch = useDispatch();
  return (
    <>
      <Header></Header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
