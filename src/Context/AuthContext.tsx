import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
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
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<ValueType | null>(null);

export const useAuth = (): ValueType => {
  return useContext(AuthContext) as ValueType;
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

  function logOut(): Promise<void> {
    return signOut(auth);
  }

  function resetPassword(email: string): Promise<void> {
    return sendPasswordResetEmail(auth, email);
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUSer(user);
      setLoading(false);
    });

    return unSubscribe;
  }, []);

  const value = {
    currentUser,
    singUp,
    login,
    logOut,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
