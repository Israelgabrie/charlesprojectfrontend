import { createContext, useContext } from "react";

export const ActiveUsersContext = createContext();

export const useActiveUsers = () => useContext(ActiveUsersContext);
