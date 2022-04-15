import React, { useContext, createContext, useState, ReactNode } from 'react';
import { api } from '../services/api';

interface IUser {
    id: string;
    email: string;
    name: string;
    driver_license: string;
    avatar: string;
}

interface IAuthState {
    token: string;
    user: IUser;
}

interface ISignInCredentials {
    email: string;
    password: string;
}

interface IAuthContextData {
    user: IUser;
    // eslint-disable-next-line no-unused-vars
    signIn: (credentials: ISignInCredentials) => Promise<void>;
}

interface IAuthProviderProps {
    children: ReactNode;
}

const AuthContentx = createContext<IAuthContextData>({} as IAuthContextData);

function AuthProvider({ children }: IAuthProviderProps) {
    const [data, setData] = useState<IAuthState>({} as IAuthState);

    async function signIn({ email, password }: ISignInCredentials) {
        const response = await api.post('/sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        api.defaults.headers.authorization = `Bearer`;

        setData({
            token,
            user,
        });
    }

    return (
        <AuthContentx.Provider value={{ user: data.user, signIn }}>
            {children}
        </AuthContentx.Provider>
    );
}

function useAuth(): IAuthContextData {
    const context = useContext(AuthContentx);
    return context;
}

export { AuthProvider, useAuth };
