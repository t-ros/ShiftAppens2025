import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme'; // Adjust path if needed

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.background,
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          position: "absolute",
          elevation: 0,
          height: 40,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="district"
        options={{
          tabBarIcon: ({color }) => (
            <Ionicons name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="reserve_field"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
