import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'

export default function _layout() {
  return (
    <Tabs>
        <Tabs.Screen
            name='district'
        />
        <Tabs.Screen
            name='index'
        />
        <Tabs.Screen
            name='profile'
        />
        <Tabs.Screen
            name='reserve_field'
        />
        <Tabs.Screen
            name='schedules'
        />

    </Tabs>
    
  )
}