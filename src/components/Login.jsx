import { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { jwtDecode } from "jwt-decode";
import axios from "../api/axios";

const Login = () => {
   const { setAuth } = useAuth();
   const navigate = useNavigate();
   const location = useLocation();
   const from = location.state?.from?.pathname || "/";

   const userRef = useRef();
   const errRef = useRef();

   const [user, setUser] = useState("");
   const [pwd, setPwd] = useState("");
   const [errMsg, setErrMsg] = useState("");

   useEffect(() => {
      userRef.current.focus();
   }, []);

   useEffect(() => {
      setErrMsg("");
   }, [user, pwd]);

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         const response = await axios.post("/auth/login/", {
            username: user,
            password: pwd,
         });

         const accessToken = response?.data?.access;
         const refreshToken = response?.data?.refresh;
         const decoded = jwtDecode(accessToken);
         const isAdmin = decoded["is_admin"];

         setAuth({ user, pwd, isAdmin, accessToken, refreshToken });
         setUser("");
         setPwd("");

         navigate(from, { replace: true });
      } catch (error) {
         if (!error?.response) {
            setErrMsg("No Server Response");
         } else if (error?.response?.status === 401) {
            setErrMsg(`Error: ${error.response.data.detail}`);
         } else {
            setErrMsg("Login Failed");
         }
         errRef.current.focus();
      }
   }

   return (
      <section className="login-container">
         <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
         >
            {errMsg}
         </p>
         <div className="login-box">
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
               <label htmlFor="username">Username:</label>
               <input
                  type="text"
                  id="username"
                  autoComplete="off"
                  ref={userRef}
                  onChange={(e) => setUser(e.target.value)}
                  value={user}
                  required
               />

               <label htmlFor="password">Password:</label>
               <input
                  type="password"
                  id="password"
                  onChange={(e) => setPwd(e.target.value)}
                  value={pwd}
                  required
               />
               <button className="movie-button">Sign in</button>
            </form>
         </div>
      </section>
   );
};

export default Login;
