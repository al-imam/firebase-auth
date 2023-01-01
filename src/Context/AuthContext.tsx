import app from "@app/firebase";
import {
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  getAuth,
  onAuthStateChanged,
  reauthenticateWithCredential,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  User,
  UserCredential,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const auth = getAuth(app);

export interface ValueType {
  currentUser: User | null;
  singUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  logOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  changeEmail: (email: string) => Promise<void>;
  changePassword: (password: string) => Promise<void>;
  confirmChanges: (currentPassWord: string) => Promise<UserCredential>;
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

  function changeEmail(email: string): Promise<void> {
    return updateEmail(currentUser as User, email);
  }

  function changePassword(password: string): Promise<void> {
    return updatePassword(currentUser as User, password);
  }

  function confirmChanges(currentPassWord: string) {
    const user = currentUser as User;
    console.dir(user);
    return reauthenticateWithCredential(
      user,
      EmailAuthProvider.credential(user.email!, currentPassWord)
    );
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
    changeEmail,
    changePassword,
    confirmChanges,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
