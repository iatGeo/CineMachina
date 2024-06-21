import { useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
   const { auth, setAuth } = useAuth();
   const [showDropdown, setShowDropdown] = useState(false);

   const toggleDropdown = () => {
      setShowDropdown(!showDropdown);
   };

   const handleLinkClick = () => {
      setShowDropdown(false);
   };

   return (
      <div className="navbar">
         <Link to="/" className="link">
            <h1>CineMachina</h1>
         </Link>
         <div className="navbar-links">
            {auth.isAdmin && (
               <>
                  <Link to="/admin" className="link" onClick={handleLinkClick}>
                     <span>Admin</span>
                  </Link>
                  <Link
                     to="/addmovie"
                     className="link"
                     onClick={handleLinkClick}
                  >
                     <span>Add Movie</span>
                  </Link>
               </>
            )}
            <Link to="/profile" className="link" onClick={handleLinkClick}>
               <span>My Profile</span>
            </Link>
            <Link
               to="/"
               className="link"
               onClick={() => {
                  setAuth({});
                  handleLinkClick();
               }}
            >
               <span>Logout</span>
            </Link>
         </div>
         <div className="menu-icon" onClick={toggleDropdown}>
            &#9776; {/* Unicode for hamburger icon */}
         </div>
         {showDropdown && (
            <div className="navbar-links active">
               {auth.isAdmin && (
                  <>
                     <Link
                        to="/admin"
                        className="link"
                        onClick={handleLinkClick}
                     >
                        <span>Admin</span>
                     </Link>
                     <Link
                        to="/addmovie"
                        className="link"
                        onClick={handleLinkClick}
                     >
                        <span>Add Movie</span>
                     </Link>
                  </>
               )}
               <Link to="/profile" className="link" onClick={handleLinkClick}>
                  <span>My Profile</span>
               </Link>
               <Link
                  to="/"
                  className="link"
                  onClick={() => {
                     setAuth({});
                     handleLinkClick();
                  }}
               >
                  <span>Logout</span>
               </Link>
            </div>
         )}
      </div>
   );
};

export default Navbar;
