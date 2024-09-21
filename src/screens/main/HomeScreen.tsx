import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import {RootStackParamList} from '../../routes/RootNavigator';

type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'AppStack'
>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

function HomeScreen({navigation}: Props) {
  return (
    <Container>
      <Text>HomeScreen</Text>

      <Button
        type="clear"
        title={'Go to customer home'}
        onPress={() => navigation.push('CustomerStack')}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

export default HomeScreen;
