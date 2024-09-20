import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useCallback} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerHome from '../screens/customer/CustomerHome';
import {ITabBarIconProps} from '../types/type';
import {StyleSheet, View} from 'react-native';
import {BlurView} from '@react-native-community/blur';

export type CustomerStackParamList = {
  CustomerHome: undefined;
  CustomerOrder: undefined;
  CustomerVisit: undefined;
  CustomerReport: undefined;
};

const Tab = createBottomTabNavigator<CustomerStackParamList>();

const CustomTabBarBackground = () => {
  return (
    <View style={StyleSheet.absoluteFill}>
      <BlurView
        style={StyleSheet.absoluteFill}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white"
      />
    </View>
  );
};

const CustomerStack = () => {
  // Icons
  const icon = useCallback(
    ({color, size, name}: ITabBarIconProps) => (
      <Icon name={name} color={color} size={size} />
    ),
    [],
  );

  return (
    <Tab.Navigator
      initialRouteName="CustomerHome"
      screenOptions={{
        tabBarActiveTintColor: '#1e232c',
        tabBarBackground: () => <CustomTabBarBackground />, // Set custom blur background
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: 'transparent', // Make tab bar background transparent to allow blur effect
        },
      }}>
      <Tab.Screen
        name="CustomerHome"
        component={CustomerHome}
        options={{
          headerTitleAlign: 'center',
          tabBarLabel: 'Asosiy',
          tabBarIcon: props => icon({...props, name: 'home'}),
        }}
      />
    </Tab.Navigator>
  );
};

export default React.memo(CustomerStack);
