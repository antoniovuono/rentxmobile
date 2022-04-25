import React from 'react';
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Platform } from 'react-native';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';

import CarSvg from '../assets/car.svg';
import HomeSvg from '../assets/home.svg';
import PeopleSvg from '../assets/people.svg';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabsRoutes() {
    const theme = useTheme();

    return (
        <Navigator
            tabBarOptions={{
                activeTintColor: theme.colors.main,
                inactiveTintColor: theme.colors.text_detail,
                showLabel: false,
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 78,
                    backgroundColor: theme.colors.background_primary,
                },
            }}
        >
            <Screen
                name="Home"
                component={AppStackRoutes}
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeSvg width={24} height={24} fill={color} />
                    ),
                }}
            />
            <Screen
                name="Profile"
                component={Home}
                options={{
                    tabBarIcon: ({ color }) => (
                        <CarSvg width={24} height={24} fill={color} />
                    ),
                }}
            />
            <Screen
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: ({ color }) => (
                        <PeopleSvg width={24} height={24} fill={color} />
                    ),
                }}
            />
        </Navigator>
    );
}
