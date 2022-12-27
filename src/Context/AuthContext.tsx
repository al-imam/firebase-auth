import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
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
  login: (email: string, password: string) => Promise<UserCredential>;
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
  const [loading, setLoading] = useState(true);

  function singUp(email: string, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function login(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(auth, email, password);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUSer(user);
      setLoading(false);
      console.dir(user);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    singUp,
    login,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
