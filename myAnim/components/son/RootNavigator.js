import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import Colors from './Colors';
import ColorDetails from './ColorDetails';
const Stack = createSharedElementStackNavigator();
export default function RootNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }} 
                initialRouteName='Colors'>
                <Stack.Screen name='Colors' component={Colors} />
                <Stack.Screen name='ColorDetails' component={ColorDetails} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}