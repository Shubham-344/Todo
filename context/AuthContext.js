import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const user = await AsyncStorage.getItem('username');
        if (user) {
          setUsername(user);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (username, password) => {
    if (username.trim() && password.trim()) {
      try {
        await AsyncStorage.setItem('username', username);
        setUsername(username);
        setIsLoggedIn(true);
        return true;
      } catch (error) {
        console.error('Error saving login info:', error);
        return false;
      }
    }
    return false;
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('username');
      setUsername('');
      setIsLoggedIn(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, username, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);