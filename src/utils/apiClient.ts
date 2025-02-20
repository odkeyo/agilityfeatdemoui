import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
console.log("API Base URL:", API_BASE_URL); 

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const responseHandler = <T>(response: AxiosResponse<T>): T => response.data;

const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 400:
        console.error("Bad request");
        toast.error("Error 400: Bad request.", { position: "top-right", autoClose: 5000 });
        break;
      case 401:
        console.error("Unauthorized");
        toast.error("Error 401: Unauthorized access.", { position: "top-right", autoClose: 5000 });
        break;
      case 404:
        console.error("404");
        toast.error("Error 404: Resource not found.", { position: "top-right", autoClose: 5000 });
        break;
      case 500:
        console.error("500");
        toast.error("Error 500: Internal server error.", { position: "top-right", autoClose: 5000 });
        break;
      default:
        toast.error("Unknown API error.", { position: "top-right", autoClose: 5000 });
    }
    return Promise.reject(error.response.data);
  }

  if (error.message === "Network Error") {
    toast.error("Network error. Please check your connection.", { position: "top-right", autoClose: 5000 });
  } else if (error.code === "ECONNABORTED") {
    toast.error("The request took too long to respond.", { position: "top-right", autoClose: 5000 });
  } else {
    toast.error("An unexpected error occurred.", { position: "top-right", autoClose: 5000 });
  }

  return Promise.reject(error.message);
};

apiClient.interceptors.response.use(
  (response) => responseHandler(response),
  errorHandler
);

export default apiClient;
