import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';
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
      <TouchableHighlight
        underlayColor={'#ffffff'}
        onPress={() => Alert.alert('render')}>
        <View style={styles.touchable}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {avatarTitle[0][0]}
              {avatarTitle[1][0]}
            </Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.title}>{cardData.fio}</Text>
            <Text style={styles.caption}>{cardData.korxona}</Text>
          </View>
        </View>
      </TouchableHighlight>
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },
  touchable: {
    flex: 1,
    flexDirection: 'row',
    gap: 14,
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: '#00aa55',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44 / 2,
  },
  avatarText: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffffff',
  },
  body: {
    flexGrow: 1,
  },
  title: {
    fontFamily: 'Roboto-Black',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: '#000000',
    marginBottom: 4,
  },
  caption: {
    fontFamily: 'Roboto-Regular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 14,
    color: '#000000',
  },
  operation: {},
});

export default CustomerCard;
