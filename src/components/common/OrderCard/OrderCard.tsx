import React, {useCallback} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Order} from '../../../app/services/order/order';

export interface IOrderCard extends Order {}

export interface OrderCardProps extends IOrderCard {
  onNavigate?: (orderId: string) => void;
}

const OrderCard = ({
  id,
  vaqt,
  client,
  mahsulot_soni,
  taxmin_summa,
  status,
  onNavigate,
}: OrderCardProps) => {
  const handleNavigate = useCallback(() => {
    if (onNavigate) {
      onNavigate(id);
    }
  }, [id, onNavigate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId} selectable={true}>
          #{id}
        </Text>
        <Text style={styles.date}>{vaqt.replace(/\./g, '/')}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyItem}>
          <Text style={styles.bodyItemTitle}>{client.fio}</Text>
          <Text style={styles.bodyItemTitle}>{client.telefon}</Text>
        </View>
        <View style={styles.bodyItem}>
          <Text style={styles.bodyItemTitle}>
            Jami soni: <Text style={styles.fontBold}>{mahsulot_soni}</Text>
          </Text>
          <Text style={styles.bodyItemTitle}>
            Taxminiy summa:{' '}
            <Text style={styles.fontBold}>{taxmin_summa.toLocaleString()}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.detailBtn} onPress={handleNavigate}>
          <Text style={styles.detailBtnText}>Mahsulotlar</Text>
        </Pressable>
        <Text style={styles.status}>{status}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    elevation: 40,
    shadowColor: 'rgba(153, 161, 169, 1)',
    shadowOffset: {
      width: 400,
      height: 100,
    },
    shadowRadius: 10,
    backgroundColor: '#ffff',
    margin: 14,
  },
  header: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#f0f0f0',

    padding: 14,
  },
  orderId: {
    fontFamily: 'Roboto-Medium',
    fontWeight: '500',
    fontSize: 16,
    color: '#242424',
  },
  date: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: '#808080',
  },
  body: {
    marginBottom: 10,
    padding: 14,
  },
  bodyItem: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  bodyItemTitle: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    color: '#808080',
  },
  fontBold: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '500',
    fontSize: 14,
    color: '#242424',
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    padding: 14,
    paddingTop: 0,
  },
  detailBtn: {
    borderRadius: 0,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    backgroundColor: '#242424',
    marginLeft: -14,
    maxWidth: 150,
  },
  detailBtnText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    padding: 14,
    color: '#ffffff',
  },
  status: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
    padding: 14,
    color: '#26ad60',
  },
});
export default React.memo(OrderCard);
