import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SignInScreen } from '../screens/SignInScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProfileScreen } from '../screens/ProfileScreen';
import { EventDetailsScreen } from '../screens/EventDetailsScreen';

const Stack = createNativeStackNavigator();

export function AppNavigation({ signedIn }: { signedIn: boolean }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0A0F24' }, headerTintColor: '#fff' }}>
        {!signedIn ? (
          <Stack.Screen name="SignIn" component={SignInScreen} options={{ title: 'Campus Connect' }} />
        ) : (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Campus Feed' }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'My Profile' }} />
            <Stack.Screen name="EventDetails" component={EventDetailsScreen} options={{ title: 'Event Details' }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
