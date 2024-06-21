import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import RentalTable from "./RentalTable";

const Profile = () => {
   const axiosPrivate = useAxiosPrivate();
   const [userData, setUserData] = useState();
   const [userRentals, setUserRentals] = useState();

   const getData = async (url) => {
      try {
         const response = await axiosPrivate.get(url);
         return response.data;
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      const fetchUserData = async () => {
         const response = await getData("/rent-store/profile/");
         setUserData(response);
      };

      const fetchRentalData = async () => {
         let response = await getData("/rent-store/rentals/");
         const count = response.count;
         response = await getData(`/rent-store/rentals/?page_size=${count}`);
         setUserRentals(response.results);
      };

      fetchUserData();
      fetchRentalData();
   }, []);

   return (
      <>
         <div className="user-data">
            {userData && (
               <div>
                  <h2>My Data</h2>
                  <span>First name: {userData.first_name}</span>
                  <span>Last name: {userData.last_name}</span>
                  <span>Email: {userData.email}</span>
                  <span>Wallet: {userData.wallet}</span>
               </div>
            )}
         </div>
         <div className="profile-table">
            {userRentals && (
               <div>
                  <h2>My Rentals</h2>
                  <RentalTable rentals={userRentals} />
               </div>
            )}
         </div>
      </>
   );
};

export default Profile;
