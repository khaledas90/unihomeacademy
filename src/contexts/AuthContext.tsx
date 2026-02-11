"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { getCookie, deleteCookie } from "cookies-next/client";
import { User } from "@/types/users";
import { axiosBaseQuery } from "@/utils/axiosConfig";

interface AuthResponse {
  access_token: string;
  token_type: string;
  expires_in: number | null;
  user: User;
}

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setAuth: (data: AuthResponse) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
  const setAuth = useCallback((data: AuthResponse) => {
    setAccessToken(data.access_token);
    setUser(data.user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    deleteCookie("access_token");
    setAccessToken(null);
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  const updateUser = useCallback((updatedUser: Partial<User>) => {
    setUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, ...updatedUser };
      }
      return null;
    });
  }, []);
 
  useEffect(() => { 
    if (typeof window === "undefined") return;

    const token = getCookie("access_token");
    if (token) {
      setAccessToken(token as string);
      setIsAuthenticated(true); 
      axiosBaseQuery()({
        url: "/auth/profile",
        method: "GET",
      })
        .then((response) => {
          if (!response.error && response.data) {
            const userData = response.data as { user: User };
            setUser(userData.user);
          }
        })
        .catch(() => { 
          deleteCookie("access_token");
          setAccessToken(null);
          setIsAuthenticated(false);
        });
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        setAuth,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
