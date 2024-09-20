import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Button} from '@rneui/themed';
import React from 'react';
import {StyleSheet, Text} from 'react-native';
import Container from '../../components/common/Container/Container';
import {RootStackParamList} from '../../routes/Router';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'AppStack'>;

function Home({navigation}: HomeProps) {
  return (
    <Container>
      <Text>Home</Text>

      <Button
        type="clear"
        title={'Go to customer home'}
        onPress={() => navigation.push('CustomerStack')}
      />
    </Container>
  );
}

const styles = StyleSheet.create({});

export default React.memo(Home);
