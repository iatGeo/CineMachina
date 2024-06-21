import Login from "./components/Login";
import Layout from "./components/Layout";
import Movies from "./components/Movies";
import MovieCard from "./components/MovieCard";
import Profile from "./components/Profile";
import Admin from "./components/Admin";
import AddMovie from "./components/AddMovie";
import Missing from "./components/Missing";
import RequireAuth from "./guards/RequireAuth";
import RequireAdmin from "./guards/RequireAdmin";
import { Navigate, Routes, Route } from "react-router-dom";

function App() {
   return (
      <Routes>
         <Route path="login" element={<Login />} />
         <Route element={<RequireAuth />}>
            <Route path="/" element={<Layout />}>
               <Route index element={<Navigate to="/movies" replace />} />
               <Route path="/movies" element={<Movies />} />
               <Route path="movies/:id" element={<MovieCard />} />
               <Route path="/profile" element={<Profile />} />
               <Route element={<RequireAdmin />}>
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/addmovie" element={<AddMovie />} />
               </Route>
            </Route>
            <Route path="*" element={<Missing />} />
         </Route>
      </Routes>
   );
}

export default App;
