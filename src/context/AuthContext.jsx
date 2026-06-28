import { createContext } from "react";
import { authClient } from "../lib/auth-client";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const session = authClient.useSession();

  return (
    <AuthContext.Provider value={session}>
      {children}
    </AuthContext.Provider>
  );
}