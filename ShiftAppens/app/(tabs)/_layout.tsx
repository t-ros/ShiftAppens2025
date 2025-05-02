import { Tabs } from 'expo-router';
import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

const TAB_BG = '#FADBA9';
const ACTIVE_ICON_BG = 'white';
const ACTIVE_ICON_COLOR = 'black';
const INACTIVE_ICON_COLOR = 'black';

function TabIcon({
  name,
  color,
  focused,
}: {
  name: any;
  color: string;
  focused: boolean;
}) {
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          backgroundColor: focused ? ACTIVE_ICON_BG : 'transparent',
          padding: 6,
          borderRadius: 25,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name={name} size={24} color={color} />
      </View>
    </View>
  );
}


export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarActiveTintColor: ACTIVE_ICON_COLOR,
        tabBarInactiveTintColor: INACTIVE_ICON_COLOR,
        tabBarStyle: {
          backgroundColor: TAB_BG,
          borderTopWidth: 0,
          position: 'absolute',
          elevation: 0,
          height: 60, // ou 65 se quiser mais espaço
          paddingBottom: 0,
          paddingTop: 0,
        },
        
      }}
    >
      <Tabs.Screen
        name="district"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="location-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="home" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="reserve_field"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="bookmark-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="schedules"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="notifications-outline" color={color} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name="person-outline" color={color} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}
