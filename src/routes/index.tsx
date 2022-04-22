import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hooks/auth';
import { AuthRoutes } from './auth.routes.';
import { AppTabsRoutes } from './app.tabs.routes';

export function Routes() {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            {user ? <AppTabsRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}
