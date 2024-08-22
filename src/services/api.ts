// src/services/api.ts

import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosHeaders,
} from "axios";

// import Router from "next/router";
import { useRouter } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Make sure to set this environment variable
  headers: {
    "Content-Type": "application/json",
  },
});

// List of endpoints that don't require the Authorization header
const excludedEndpoints = ["/api/user/login", "/api/user/register"];

// Function to handle the redirection when a 401 error occurs
const HandleUnauthorized = () => {
  const router = useRouter();
  localStorage.removeItem("token"); // Remove token from localStorage
  router.push("/login"); // Redirect to login page
};

// Request interceptor for adding authorization tokens or other headers
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const isExcluded = excludedEndpoints.some((endpoint) =>
      config.url?.includes(endpoint)
    );

    if (!isExcluded) {
      const token = localStorage.getItem("token");

      if (token) {
        if (config.headers) {
          // Handle AxiosHeaders instance
          if (config.headers instanceof AxiosHeaders) {
            config.headers.set("Authorization", `Bearer ${token}`);
          } else {
            // Handle plain object headers
            (config.headers as any)["Authorization"] = `Bearer ${token}`;
          }
        }
        //  else {
        //   // If headers are undefined, initialize them
        //   config.headers = {
        //     Authorization: `Bearer ${token}`,
        //   } instanceof AxiosHeaders;
        // }
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for handling common responses globally
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized error
      HandleUnauthorized();
    }
    return Promise.reject(error);
  }
);

// GET request function
export const get = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.get(url, config);
    return response.data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
};

// POST request function
export const post = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.post(url, data, config);
    return response.data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
};

// PUT request function
export const put = async <T>(
  url: string,
  data: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.put(url, data, config);
    return response.data;
  } catch (error) {
    console.error("PUT request error:", error);
    throw error;
  }
};

// DELETE request function
export const del = async <T>(
  url: string,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await api.delete(url, config);
    return response.data;
  } catch (error) {
    console.error("DELETE request error:", error);
    throw error;
  }
};
