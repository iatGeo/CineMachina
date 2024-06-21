const BubbleChart = ({ pubDates }) => {
   const countMoviesPerYear = () => {
      let counts = {};
      pubDates.forEach((year) => {
         if (year >= 1888 && year <= 2024) {
            counts[year] = counts[year] ? counts[year] + 1 : 1;
         }
      });
      return counts;
   };

   const moviesPerYear = countMoviesPerYear();
   const maxCount = Math.max(...Object.values(moviesPerYear));

   const getBubbleSize = (count) => {
      const maxSize = 150;
      const scaleFactor = maxSize / maxCount;
      return Math.round(count * scaleFactor);
   };

   return (
      <div className="bubble-chart">
         {Object.entries(moviesPerYear).map(([year, count]) => (
            <div
               key={year}
               className="bubble"
               style={{
                  width: getBubbleSize(count) + "px",
                  height: getBubbleSize(count) + "px",
               }}
               title={`${year}: ${count} movies`}
            >
               {year}
            </div>
         ))}
      </div>
   );
};

export default BubbleChart;
