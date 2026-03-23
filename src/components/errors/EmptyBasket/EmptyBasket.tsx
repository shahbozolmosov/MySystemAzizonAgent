import {StyleSheet, Text, View} from 'react-native';
import React, {useCallback} from 'react';
import {Button, Image} from '@rneui/themed';
import EmptyBasketImage from '../../../../assets/empty-basket.png';

type EmptyBasketProps = {
  onGoBack: () => void;
};

const EmptyBasket = ({onGoBack}: EmptyBasketProps) => {
  // Handle back
  const handleBack = useCallback(() => {
    onGoBack();
  }, [onGoBack]);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={EmptyBasketImage} />
      <Text style={styles.title}>Savatcha bo'sh</Text>
      <Text style={styles.desc}>
        Buyurtma yaratish sahifasidan mahsulotlarni toping
      </Text>
      <Button
        buttonStyle={styles.btn}
        title={"Mahsulot qo'shish"}
        onPress={handleBack}
        color={'secondary'}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  image: {
    width: 140,
    height: 123,
    marginBottom: 30,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 18,
    color: '#939090',
    marginBottom: 4,
  },
  desc: {
    maxWidth: 250,
    marginBottom: 40,
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: '#A0A0A0',
  },
  btn: {
    paddingHorizontal: 20,
  },
});

export default React.memo(EmptyBasket);
