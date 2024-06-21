import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { toast } from "react-toastify";

const AddMovie = () => {
   const axiosPrivate = useAxiosPrivate();
   const initialState = {
      title: "",
      pub_date: "",
      duration: "",
      rating: "",
      description: "",
      categories: [],
   };

   const [movieCategories, setMovieCategories] = useState();
   const [newMovie, setNewMovie] = useState(initialState);

   useEffect(() => {
      const getCategories = async () => {
         const response = await axiosPrivate.get("/rent-store/categories");
         const data = response.data
            .map((category) => Object.values(category))
            .flat();
         setMovieCategories(data);
      };

      getCategories();
   }, []);

   const handleCategoryChange = (e) => {
      const { value, checked } = e.target;
      setNewMovie((prevState) => {
         if (checked) {
            return {
               ...prevState,
               categories: [...prevState.categories, value],
            };
         } else {
            return {
               ...prevState,
               categories: prevState.categories.filter(
                  (category) => category !== value
               ),
            };
         }
      });
   };

   async function handleSubmit(e) {
      e.preventDefault();

      try {
         await axiosPrivate.post("/rent-store/movies/", { ...newMovie });
         setNewMovie(initialState);
         toast.success("Movie added successfully");
      } catch (error) {
         console.log(`Error: ${error}`);
         toast.error("Could not add movie, please retry");
      }
   }

   return (
      <div className="movie-form-container">
         <form className="movie-form" onSubmit={handleSubmit}>
            <div>
               <label htmlFor="title">Add Title</label>
               <input
                  type="text"
                  id="title"
                  autoComplete="off"
                  maxLength="200"
                  required
                  value={newMovie.title}
                  onChange={(e) =>
                     setNewMovie({ ...newMovie, title: e.target.value })
                  }
               />
            </div>
            <div>
               <label htmlFor="pubDate">Add Publication Year</label>
               <input
                  type="number"
                  id="pubDate"
                  autoComplete="off"
                  max="32767"
                  required
                  value={newMovie.pub_date}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (value <= 32767) {
                        setNewMovie({ ...newMovie, pub_date: value });
                     }
                  }}
               />
            </div>
            <div>
               <label htmlFor="duration">Add Movie's Duration</label>
               <input
                  type="number"
                  id="duration"
                  autoComplete="off"
                  placeholder="total minutes"
                  max="32767"
                  required
                  value={newMovie.duration}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (value <= 32767) {
                        setNewMovie({ ...newMovie, duration: value });
                     }
                  }}
               />
            </div>
            <div>
               <label htmlFor="rating">Add Movie's Rating</label>
               <input
                  type="number"
                  id="rating"
                  autoComplete="off"
                  required
                  value={newMovie.rating}
                  onChange={(e) => {
                     const value = e.target.value;
                     if (value <= 10) {
                        setNewMovie({ ...newMovie, rating: e.target.value });
                     }
                  }}
               />
            </div>
            <div>
               <label htmlFor="description">Add Movie's Description</label>
               <textarea
                  type="text"
                  id="description"
                  autoComplete="off"
                  rows="4"
                  value={newMovie.description}
                  onChange={(e) =>
                     setNewMovie({ ...newMovie, description: e.target.value })
                  }
               />
            </div>
            <div className="checkbox-container">
               <h3>Select Categories:</h3>
               {movieCategories &&
                  movieCategories.map((category) => (
                     <div key={category}>
                        <label></label>
                        <input
                           type="checkbox"
                           value={category}
                           checked={newMovie.categories.includes(category)}
                           onChange={handleCategoryChange}
                        />
                        {category}
                     </div>
                  ))}
            </div>
            <button className="movie-button">Add Movie</button>
         </form>
      </div>
   );
};

export default AddMovie;
