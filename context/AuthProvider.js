import { createContext, useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import User from '../data/User'
const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  function getUserFromLocalStorage() {
    if (typeof window !== 'undefined') {
      const userJSON = window.localStorage.getItem('user');
      return userJSON ? JSON.parse(userJSON) : null;
    }
    return null;
  }

  const [user, setUser] = useState(getUserFromLocalStorage() || null);

  function updateUser(user) {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('user', JSON.stringify(user));
    }
    setUser(user);
  }

  function logout() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('user');
    }
    setIsLoggedIn(false);
    setUser({});
  }

  const login = (userData) => {
    updateUser(userData);
    setIsLoggedIn(true);
  };

  useEffect(() => {
    let userFromLocalStorage = getUserFromLocalStorage();
    if (userFromLocalStorage) {
      // setUser(() => User.find((user) => userFromLocalStorage.id === user.id));
      setUser(userFromLocalStorage)
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      router.push('/')
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
