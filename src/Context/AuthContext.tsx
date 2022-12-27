import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import app from "../firebase";

const auth = getAuth(app);

export interface ValueType {
  currentUser: User | null;
  singUp: (email: string, password: string) => Promise<UserCredential>;
}

const AuthContext = createContext<ValueType | null>(null);

export const useAuth = (): ValueType | null => {
  return useContext(AuthContext);
};

interface AuthContextProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthContextProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUSer] = useState<User | null>(null);

  function singUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUSer(user);
      console.log(user);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    singUp,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
