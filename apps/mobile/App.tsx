import React, { createContext, useEffect, useMemo, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useColorScheme } from 'react-native';
import { SignInScreen } from './src/screens/SignInScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { ProfileScreen } from './src/screens/ProfileScreen';
import { EventDetailsScreen } from './src/screens/EventDetailsScreen';

export type AuthContextType = {
  token: string | null;
  userId: string | null;
  signIn: (token: string, userId: string) => void;
  signOut: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  token: null,
  userId: null,
  signIn: () => {},
  signOut: () => {},
});

const Stack = createNativeStackNavigator();

export default function App() {
  const scheme = useColorScheme();
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    // Placeholder for secure storage restore
  }, []);

  const authContext = useMemo(
    () => ({
      token,
      userId,
      signIn: (newToken: string, id: string) => {
        setToken(newToken);
        setUserId(id);
      },
      signOut: () => {
        setToken(null);
        setUserId(null);
      },
    }),
    [token, userId]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <StatusBar style={scheme === 'dark' ? 'light' : 'dark'} />
        <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0A0F24' }, headerTintColor: '#fff' }}>
          {!token ? (
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
    </AuthContext.Provider>
  );
}
