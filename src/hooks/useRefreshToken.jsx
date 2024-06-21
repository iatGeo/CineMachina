import axios from "../api/axios";
import useAuth from "./useAuth";

const useRefreshToken = () => {
   const { auth, setAuth } = useAuth();

   const refresh = async () => {
      const response = await axios.post("/auth/refresh/", {
         refresh: auth.refreshToken,
      });

      setAuth((prev) => {
         return { ...prev, accessToken: response.data.access };
      });

      return response.data.access;
   };

   return refresh;
};

export default useRefreshToken;
