import { CreateUserRequest } from "@workspace/types";
import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/navigation";

type User = Pick<CreateUserRequest, "name" | "email" | "lastName">;

type UserContextType = {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const login = (user: User) => {
    setUser(user);
    router.push("http://localhost:4000/today");
  };

  const logout = () => {
    router.push("http://localhost:4000/login");
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
