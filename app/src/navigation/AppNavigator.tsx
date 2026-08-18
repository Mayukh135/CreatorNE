// ============================================================
// CreatorNE App — Navigation
// ============================================================

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../types';

// Screens
import SplashScreen from '../screens/SplashScreen';
import RoleSelectScreen from '../screens/RoleSelectScreen';
import PhoneScreen from '../screens/PhoneScreen';
import OtpScreen from '../screens/OtpScreen';
import NameEntryScreen from '../screens/NameEntryScreen';
import SocialConnectScreen from '../screens/SocialConnectScreen';
import InstagramConnectScreen from '../screens/InstagramConnectScreen';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          gestureEnabled: true,
          contentStyle: { backgroundColor: '#f8fafc' },
        }}
      >
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="RoleSelect"
          component={RoleSelectScreen}
          options={{ animation: 'fade' }}
        />
        <Stack.Screen
          name="Phone"
          component={PhoneScreen}
        />
        <Stack.Screen
          name="Otp"
          component={OtpScreen}
        />
        <Stack.Screen
          name="NameEntry"
          component={NameEntryScreen}
        />
        <Stack.Screen
          name="SocialConnect"
          component={SocialConnectScreen}
        />
        <Stack.Screen
          name="InstagramConnect"
          component={InstagramConnectScreen}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            animation: 'fade',
            gestureEnabled: false, // prevent swipe-back from home
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
