import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const MovieCard = () => {
   const { id } = useParams();
   const axiosPrivate = useAxiosPrivate();

   const [movie, setMovie] = useState();
   const [userRentals, setUserRentals] = useState();
   const [isRented, setIsRented] = useState(false);

   const getMovieData = async (id) => {
      try {
         const response = await axiosPrivate.get(`/rent-store/movies/${id}`);
         return response.data;
      } catch (error) {
         console.error(error);
      }
   };

   const getUserRentals = async () => {
      try {
         let response = await axiosPrivate.get("/rent-store/rentals/");
         const count = response.data.count;
         response = await axiosPrivate.get(
            `/rent-store/rentals/?page_size=${count}`
         );
         return response.data.results;
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      const fetchMovieData = async (id) => {
         const data = await getMovieData(id);
         setMovie(data);
      };

      const fetchUserRentals = async () => {
         const data = await getUserRentals();
         setUserRentals(data);
      };

      fetchMovieData(id);
      fetchUserRentals();
   }, [id, axiosPrivate]);

   useEffect(() => {
      if (userRentals && movie) {
         const checkIfRented = (arr) =>
            arr.some(
               (item) => item.movie === movie.title && item.is_paid === false
            );
         if (checkIfRented(userRentals)) {
            setIsRented(true);
         } else {
            setIsRented(false);
         }
      }
   }, [userRentals, movie]);

   const getUuidByMovie = (userRentals, movieTitle) => {
      const rental = userRentals.find(
         (rental) => rental.movie === movieTitle && rental.is_paid === false
      );
      return rental ? rental.uuid : null;
   };

   const getCurrentDate = () => {
      const today = new Date();
      const options = { year: "numeric", month: "2-digit", day: "2-digit" };
      const formattedDate = today.toLocaleDateString("en-CA", options);
      return formattedDate;
   };

   const handleClick = async () => {
      try {
         if (isRented) {
            const currentUuid = getUuidByMovie(userRentals, movie.title);
            const currentDate = getCurrentDate();

            await axiosPrivate.patch(`/rent-store/rentals/${currentUuid}`, {
               return_date: currentDate,
               is_paid: true,
            });
            setIsRented(false);
            toast.success("Movie return was successful!");
         } else {
            const response = await axiosPrivate.post("/rent-store/rentals/", {
               movie: movie.uuid,
            });
            setIsRented(true);
            toast.success("Movie rented successfully!");
         }
      } catch (error) {
         console.error("Error:", error);
         toast.error("Something went wrong, try again");
         setIsRented(false);
      }
   };

   return (
      <div className="movie-container">
         <h1>{movie?.title || "No Title Available"}</h1>
         <div className="movie-grid">
            <section className="movie-specific-card">
               {movie?.poster_url && (
                  <img
                     src={movie.poster_url}
                     alt={
                        movie?.title + " (No Image Available)" ||
                        "No Image Available"
                     }
                  />
               )}
               <span>Release date: {movie?.pub_date || "Unknown"}</span>
               <span>Duration: {movie?.duration || "Unknown"} mins</span>
               <span>Rating: {movie?.rating || "Unknown"}</span>
            </section>
            <section className="movie-specific-info">
               <p>{movie?.description || "No description available"}</p>
               <p>Categories: {movie?.categories?.join(", ") || "None"}</p>
            </section>
         </div>
         <button className="movie-button" onClick={handleClick}>
            {isRented ? "Return movie" : "Rent it now!"}
         </button>
      </div>
   );
};

export default MovieCard;
