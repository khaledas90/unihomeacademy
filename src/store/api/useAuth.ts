import { useQuery, useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { axiosBaseQuery } from "@/utils/axiosConfig";
import useAppStore from "../store";
import { deleteCookie, setCookie } from "cookies-next/client";
import { User } from "@/types/users";

export interface UserData {
  user: User;
}

export const useRegisterwithTeacher = () => {
  const { login } = useAppStore();
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
      return response.data as { token: string; user: User };
    },
    onSuccess: (data) => {
      if (data.token) {
        setCookie("token", data.token, {
          maxAge: 60 * 60 * 24 * 7, // 7 days
          path: "/",
        });
      }
      if (data.user) {
        login(data.token, data.user);
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
      if (response.error) throw new Error("Registration failed");
      return response.data as { token: string; user: User };
    },
    onSuccess: (data) => {
      toast.success("Student registration successful");
    },
    onError: () => {
      toast.error("Student registration failed");
    },
  });
};

// Sign With Google
export const useSignwithGoogle = () => {
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
        url: "/auth/register/google",
        method: "POST",
        data,
      });
      if (response.error) throw new Error("Registration failed");
      return response.data as { token: string; user: User };
    },
    onSuccess: (data) => {
      toast.success("Sign in with Google successful");
    },
    onError: () => {
      toast.error("Sign in with Google failed");
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
      if (response.error) throw new Error("Login failed");
      return response.data as { token: string; user: User };
    },
    onSuccess: () => {
      toast.success("Login successful");
    },
    onError: () => {
      toast.error("Login failed");
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
          deleteCookie("token");
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
