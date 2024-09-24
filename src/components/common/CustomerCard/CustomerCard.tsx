import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

const cardData = {
  id: '966',
  fio: 'Asliddin Sayidqulov',
  korxona: 'MY SYSTEM',
  balans: 0,
  telefon: '+998(93)728-68-67',
  rasm: null,
  manzil: 'Samarqand viloyati Oqdaryo tumani Daxbed M.Ulug&#039;bek 39-uy',
  lokatsiya: 'sasaasasasas',
  latitude: '39.6507963',
  registertime: '2024-09-01 10:47:24',
  viloyat: 'Samarqand viloyati',
  tuman: 'Samarqand shahri',
  category_id: '4',
  dostavka_id: '31',
  viloyat_id: '7',
  tuman_id: '39',
  agent_id: '32',
  bonuslar: [],
  chegirma: null,
};

const CustomerCard = () => {
  const avatarTitle = cardData.fio.split(' ');

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text>
          {avatarTitle[0][0]} {avatarTitle[1][0]}
        </Text>
      </View>
      <View style={styles.body}>
        <Text style={styles.title}>{cardData.fio}</Text>
        <Text style={styles.caption}>{cardData.korxona}</Text>
      </View>
      <View style={styles.operation}>
        <TouchableOpacity>
          <Icon name="more-horizontal" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    gap: 14,
  },
  avatar: {},
  body: {},
  title: {},
  caption: {},
  operation: {},
});

export default CustomerCard;
