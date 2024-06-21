import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = () => {
   return (
      <>
         <Navbar />
         <Outlet />
         <ToastContainer autoClose={2000} />
      </>
   );
};

export default Layout;
