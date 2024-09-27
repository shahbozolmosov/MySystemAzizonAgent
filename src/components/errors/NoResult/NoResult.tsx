import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from '@rneui/themed';
import NoResultImage from '../../../../assets/no-result.png';

type NoResultProps = {
  title?: string;
  desc: string;
};

const NoResult = ({title = "Ma'lumot topilmadi", desc}: NoResultProps) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={NoResultImage} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 140,
    height: 123,
    marginBottom: 30,
  },
  title: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '700',
    fontSize: 18,
    color: '#939090',
    marginBottom: 4,
  },
  desc: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: '#A0A0A0',
  },
});

export default React.memo(NoResult);
