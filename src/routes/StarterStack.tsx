import React from 'react';
import {createNativeStackNavigator, NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootNavigator.tsx';

type StarterStackProps = NativeStackScreenProps<RootStackParamList, 'Starter'>

const Stack = createNativeStackNavigator<RootStackParamList>();

const StarterStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Starter'}>
      <Stack.Screen name={'Starter'} component={''}
    </Stack.Navigator>
  );
};

export default StarterStack;
