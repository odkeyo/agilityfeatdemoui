import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Corrección del `responseHandler`
const responseHandler = <T>(response: AxiosResponse<T>): T => response.data;

const errorHandler = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;
    switch (status) {
      case 400:
        console.error("Bad request");
        toast.error("Error 400: Solicitud incorrecta.", { position: "top-right", autoClose: 5000 });
        break;
      case 401:
        console.error("Unauthorized");
        toast.error("Error 401: No autorizado.", { position: "top-right", autoClose: 5000 });
        break;
      case 404:
        console.error("404");
        toast.error("Error 404: Recurso no encontrado.", { position: "top-right", autoClose: 5000 });
        break;
      case 500:
        console.error("500");
        toast.error("Error 500: Error interno del servidor.", { position: "top-right", autoClose: 5000 });
        break;
      default:
        toast.error("Error desconocido en la API.", { position: "top-right", autoClose: 5000 });
    }
    return Promise.reject(error.response.data);
  }

  if (error.message === "Network Error") {
    toast.error("Error de red. Verifica tu conexión.", { position: "top-right", autoClose: 5000 });
  } else if (error.code === "ECONNABORTED") {
    toast.error("La solicitud tardó demasiado en responder.", { position: "top-right", autoClose: 5000 });
  } else {
    toast.error("Ocurrió un error inesperado.", { position: "top-right", autoClose: 5000 });
  }

  return Promise.reject(error.message);
};

// ✅ Corrección en el interceptor
apiClient.interceptors.response.use(
  (response) => responseHandler(response),
  errorHandler
);

export default apiClient;
