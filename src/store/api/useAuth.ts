import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosBaseQuery } from "@/utils/axiosConfig";
import useAppStore from "../store";
import { deleteCookie, setCookie } from "cookies-next/client";
import { User } from "@/types/users";

export interface UserData {
  user: User;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number | null;
  user: User;
}

export const useRegisterwithTeacher = () => {
  return useMutation({
    mutationFn: async (data: {
      firstname: string;
      lastname: string;
      gender: string;
      email: string;
      password: string;
      confirm_password: string;
      whats: string;
      accept_terms: string;
      country: string;
      timezone: string;
      source: string;
      type: string;
    }) => {
      const response = await axiosBaseQuery()({
        url: "/auth/register/teacher",
        method: "POST",
        data,
      });
      if (response.error) {
        const errorMessage = (response.error.data as any)?.message || "Registration failed";
        throw new Error(errorMessage);
      }
      return response.data as AuthResponse;
    },
    onSuccess: (data) => {
      
      if (data.access_token) {
        setCookie("access_token", data.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      } 
      toast.success("Teacher registration successful! Welcome to UniHome Academy");
    },
    onError: (error: any) => {
      const errorMessage = error?.message || error?.response?.data?.message || "Teacher registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useRegisterwithStudent = () => {
  return useMutation({
    mutationFn: async (data: {
      firstname: string;
      lastname: string;
      gender: string;
      email: string;
      password: string;
      confirm_password: string;
      whats: string;
      accept_terms: string;
      country: string;
      timezone: string;
      source: string;
      type: string;
    }) => {
      const response = await axiosBaseQuery()({
        url: "/auth/register/student",
        method: "POST",
        data,
      });
      if (response.error) {
        const errorMessage = (response.error.data as any)?.message || "Registration failed";
        throw new Error(errorMessage);
      }
      return response.data as AuthResponse;
    },
    onSuccess: (data) => { 
      if (data.access_token) {
        setCookie("access_token", data.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      } 
      toast.success("Student registration successful! Welcome to UniHome Academy");
    },
    onError: (error: any) => {
      const errorMessage = error?.message || error?.response?.data?.message || "Student registration failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// Sign With Google (Login)
export const useSignwithGoogle = () => {
  return useMutation({
    mutationFn: async (data: { 
      email: string;
      google_id?: string;
      access_token?: string;
    }) => {
      const response = await axiosBaseQuery()({
        url: "/auth/login/google",
        method: "POST",
        data,
      });
      if (response.error) {
        const errorMessage = (response.error.data as any)?.message || "Google sign in failed";
        throw new Error(errorMessage);
      }
      return response.data as AuthResponse;
    },
    onSuccess: (data) => {
      if (data.access_token) {
        setCookie("access_token", data.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      }
      toast.success("Sign in with Google successful! Welcome back");
    },
    onError: (error: any) => {
      const errorMessage = error?.message || error?.response?.data?.message || "Google sign in failed. Please try again.";
      toast.error(errorMessage);
    },
  });
};

// Create: Login
export const useLogin = () => {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await axiosBaseQuery()({
        url: "/auth/login",
        method: "POST",
        data,
      });
      if (response.error) {
        const errorMessage = (response.error.data as any)?.message || "Login failed";
        throw new Error(errorMessage);
      }
      return response.data as AuthResponse;
    },
    onSuccess: (data) => { 
      if (data.access_token) {
        setCookie("access_token", data.access_token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      } 
      toast.success("Login successful! Welcome back");
    },
    onError: (error: any) => {
      const errorMessage = error?.message || error?.response?.data?.message || "Invalid email or password. Please try again.";
      toast.error(errorMessage);
    },
  });
};

export const useUserData = () => {
  const { setUser } = useAppStore();
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosBaseQuery()({
        url: "/auth/profile",
        method: "GET",
      });
      if (response.error) {
        console.error("Error fetching user data:", response.error);
        if (response.error.status === 401) {
          deleteCookie("access_token");
          window.location.href = "/login";
        }
        throw new Error("Failed to fetch user data");
      }
      const data = response.data as UserData;
      setUser(data.user);
      return data;
    },
    retry: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
