"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { onAuthStateChanged, getAuth, User, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import NextTopLoader from 'nextjs-toploader';

const auth = getAuth(firebase_app);

interface AuthContextType {
    user: User | null;
    loading: boolean;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuthContext must be used within an AuthContextProvider');
    }
    return context;
};

interface AuthContextProviderProps {
    children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user: User | null) => {
            setUser(user);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);
    const logout = async () => {
        await signOut(auth);
      };
    const value: AuthContextType = { user, loading, logout };

    return (
        <AuthContext.Provider value={value}>
            {loading ? <NextTopLoader /> : children}
        </AuthContext.Provider>
    );
};