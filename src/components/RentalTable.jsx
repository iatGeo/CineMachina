import { useState } from "react";
import ReactPaginate from "react-paginate";

const RentalTable = ({ rentals }) => {
   const [pageNumber, setPageNumber] = useState(0);
   const [sortConfig, setSortConfig] = useState({
      key: null,
      direction: "ascending",
   });

   const itemsPerPage = 10;
   const pageCount = Math.ceil(rentals.length / itemsPerPage);

   const handlePageClick = ({ selected }) => {
      setPageNumber(selected);
   };

   const sortedRentals = (currentPageData) => {
      let sortableItems = [...currentPageData];
      if (sortConfig.key !== null) {
         sortableItems.sort((a, b) => {
            if (sortConfig.key === "return_date") {
               // Custom compare for status
               const aStatus = a.return_date ? "Inactive" : "Active";
               const bStatus = b.return_date ? "Inactive" : "Active";
               if (aStatus < bStatus) {
                  return sortConfig.direction === "ascending" ? -1 : 1;
               }
               if (aStatus > bStatus) {
                  return sortConfig.direction === "ascending" ? 1 : -1;
               }
               return 0;
            } else {
               // Default compare
               if (a[sortConfig.key] < b[sortConfig.key]) {
                  return sortConfig.direction === "ascending" ? -1 : 1;
               }
               if (a[sortConfig.key] > b[sortConfig.key]) {
                  return sortConfig.direction === "ascending" ? 1 : -1;
               }
               return 0;
            }
         });
      }
      return sortableItems;
   };

   const requestSort = (key) => {
      let direction = "ascending";
      if (sortConfig.key === key && sortConfig.direction === "ascending") {
         direction = "descending";
      }
      setSortConfig({ key, direction });
   };

   const startIndex = pageNumber * itemsPerPage;
   const currentPageData = rentals.slice(startIndex, startIndex + itemsPerPage);
   const sortedCurrentPageData = sortedRentals(currentPageData);

   return (
      <div className="rental-table-container">
         <table className="rental-table">
            <thead>
               <tr>
                  <th onClick={() => requestSort("movie")}>Movie</th>
                  <th onClick={() => requestSort("rental_date")}>
                     Rental Date
                  </th>
                  <th onClick={() => requestSort("return_date")}>Status</th>
               </tr>
            </thead>
            <tbody>
               {sortedCurrentPageData.map((rental, index) => (
                  <tr
                     key={index}
                     className={rental.return_date ? "inactive" : "active"}
                  >
                     <td>{rental.movie}</td>
                     <td>{rental.rental_date}</td>
                     <td>{rental.return_date ? "Inactive" : "Active"}</td>
                  </tr>
               ))}
            </tbody>
         </table>
         <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageClick}
            containerClassName="pagination"
            activeClassName="active"
         />
      </div>
   );
};

export default RentalTable;
