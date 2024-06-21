import { instancePrivate } from "../api/axiosPrivate";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import useAuth from "./useAuth";

const useAxiosPrivate = () => {
   const refresh = useRefreshToken();
   const { auth } = useAuth();

   useEffect(() => {
      const requestIntercept = instancePrivate.interceptors.request.use(
         (config) => {
            if (!config.headers["Authorization"]) {
               config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
            }
            return config;
         },
         (error) => Promise.reject(error)
      );

      const responseIntercept = instancePrivate.interceptors.response.use(
         (response) => response,
         async (error) => {
            const prevRequest = error?.config;
            if (error?.response?.status === 401 && !prevRequest?.sent) {
               prevRequest.sent = true;
               const newAccessToken = await refresh();
               prevRequest.headers[
                  "Authorization"
               ] = `Bearer ${newAccessToken}`;
               return instancePrivate(prevRequest);
            }
            return Promise.reject(error);
         }
      );

      return () => {
         instancePrivate.interceptors.request.eject(requestIntercept);
         instancePrivate.interceptors.response.eject(responseIntercept);
      };
   }, [auth, refresh]);

   return instancePrivate;
};

export default useAxiosPrivate;
