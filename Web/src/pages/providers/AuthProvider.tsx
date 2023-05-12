import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

interface AuthContextType {
    login: string;
    password: string;
    isAuthenticated: boolean;
    isLoading: boolean;
    signIn: (callback: VoidFunction) => void;
    updateLogin: (value: string) => void;
    updatePassword: (value: string) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState<string>('');

  const signIn = async () => {
    setIsLoading(true);
    const apiUrl = 'http://localhost:8000';
    console.log('apiUrl', apiUrl);
    console.log('login', login);
    console.log('password', password);
    try {
        const response = await axios.post(`${apiUrl}/signin`, {
            login,
            password,
        });
        setToken(response.data.token);
        setIsAuthenticated(true);
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la vérification des informations de connexion.', error);
        setIsAuthenticated(false);
    } finally {
        setIsLoading(false);
    }
  };

    const updateLogin = (value: string) => {
        setLogin(value);
    };

    const updatePassword = (value: string) => {
        setPassword(value);
    };

  const authValues: AuthContextType = {
    login,
    password,
    isAuthenticated,
    isLoading,
    signIn,
    updateLogin,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={authValues}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return authContext;
};
