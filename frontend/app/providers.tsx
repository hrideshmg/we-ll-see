import React, { createContext, useContext, useState, useEffect } from "react";
import { User, Post } from "../types";
import { auth, posts } from "../services/api";
import { storage } from "../utils/storage";

interface AppContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  posts: Post[];
  login: (data: any) => Promise<void>;
  register: (data: any) => Promise<void>;
  logout: () => void;
  refreshPosts: () => Promise<void>;
  leaderboard: Post[];
  refreshLeaderboard: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [postList, setPostList] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [leaderboard, setLeaderboard] = useState<Post[]>([]);

  const initAuth = async () => {
    const token = storage.getItem("accessToken");
    if (token) {
      try {
        const userData = await auth.me();
        setUser(userData);
        await refreshPosts();
      } catch (error) {
        console.error("Auth failed", error);
        auth.logout();
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initAuth();
  }, []);

  const refreshPosts = async () => {
    try {
      const data = await posts.list();
      setPostList(data);
    } catch (e) {
      console.error("Failed to fetch posts", e);
    }
  };

  const refreshLeaderboard = async () => {
    try {
      const data = await posts.leaderboard();
      setLeaderboard(data);
    } catch (e) {
      console.error("Failed to fetch leaderboard", e);
    }
  };

  const login = async (data: any) => {
    const response = await auth.login(data);
    setUser(response.user);
    await refreshPosts();
  };

  const register = async (data: any) => {
    await auth.register(data);
  };

  const logout = () => {
    auth.logout();
    setUser(null);
    setPostList([]);
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        posts: postList,
        login,
        register,
        logout,
        refreshPosts,
        leaderboard,
        refreshLeaderboard,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
