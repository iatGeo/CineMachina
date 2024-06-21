import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

const Movies = () => {
   const [movies, setMovies] = useState([]);
   const [loading, setLoading] = useState(true);
   const axiosPrivate = useAxiosPrivate();

   const getMovies = async (url) => {
      try {
         let response = await axiosPrivate.get(url);
         const count = response.data.count;
         response = await axiosPrivate.get(`${url}?page_size=${count}`);
         return response.data.results;
      } catch (error) {
         console.log(`Error: ${error}`);
      }
   };

   useEffect(() => {
      const fetchMovies = async (url) => {
         const data = await getMovies(url);
         setMovies(data);
         setLoading(false);
      };
      fetchMovies("/rent-store/movies/");
   }, []);

   return loading ? (
      <div className="loading-span">
         <h3>Loading data...</h3>
      </div>
   ) : (
      <div className="movies-container">
         {movies && movies.length
            ? movies.map((movie) =>
                 movie.poster_url &&
                 movie.poster_url !== null &&
                 !movie.title.toLowerCase().includes("test") &&
                 !movie.title.toLowerCase().includes("admin") ? (
                    <Link
                       to={`/movies/${movie.uuid}`}
                       key={movie.uuid}
                       className="link"
                    >
                       <div className="movies-card">
                          <img
                             src={movie.poster_url}
                             alt={movie.title}
                             onError={(e) => {
                                e.target.onerror = null;
                                e.target.style.display = "none";
                                const placeholder = e.target.nextSibling;
                                placeholder.style.display = "flex";
                             }}
                          />
                          <div
                             className="placeholder"
                             style={{ display: "none" }}
                          >
                             {movie.title}
                          </div>
                          <span>{movie.title}</span>
                       </div>
                    </Link>
                 ) : null
              )
            : null}
      </div>
   );
};

export default Movies;
