import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RentalTable from "./RentalTable";
import BubbleChart from "./BubbleChart";

const Admin = () => {
   const axiosPrivate = useAxiosPrivate();
   const [moviesPubDates, setMoviesPubDate] = useState();
   const [rentals, setRentals] = useState();

   const getRentals = async (url) => {
      try {
         let response = await axiosPrivate.get(url);
         const count = response.data.count;
         response = await axiosPrivate.get(`${url}?page_size=${count}`);
         return response.data.results;
      } catch (error) {
         console.log(`Error: ${error}`);
      }
   };

   const getMoviesPubDates = async (url) => {
      let response = await axiosPrivate.get(url);
      const count = response.data.count;
      response = await axiosPrivate.get(`${url}?page_size=${count}`);
      const data = response.data.results
         .filter(
            (movie) =>
               movie.pub_date !== null &&
               typeof movie.pub_date !== "boolean" &&
               movie.pub_date >= 1888 &&
               movie.pub_date <= 2024
         )
         .map((movie) => movie.pub_date);
      return data;
   };

   useEffect(() => {
      const fetchRentals = async (url) => {
         const data = await getRentals(url);
         setRentals(data);
      };

      const fetchMoviesPubDates = async (url) => {
         const data = await getMoviesPubDates(url);
         setMoviesPubDate(data);
      };

      fetchRentals("/rent-store/rentals/");
      fetchMoviesPubDates("/rent-store/movies/");
   }, []);

   return (
      <div>
         {rentals && (
            <div className="admin-table">
               <h2>User's Rentals</h2>
               <RentalTable rentals={rentals} />
            </div>
         )}
         {moviesPubDates && (
            <div className="admin-chart">
               <h2>Movies' Publication Chart per Year</h2>
               <BubbleChart pubDates={moviesPubDates} />
            </div>
         )}
      </div>
   );
};

export default Admin;
