import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ICustomer} from '../../../app/services/customer/customer';
import {getCustomerById} from '../../../database/customers';
import {getDBConnection} from '../../../database/sqlite';
import {OrderDraft} from '../../../database/tables/orderDraft.table';

export interface IOrderDraftCard extends OrderDraft {}

export interface OrderCardProps extends IOrderDraftCard {
  onNavigate?: (orderId: string) => void;
}

const OrderDraftCard = ({
  uid,
  client_id,
  product_list,
  izoh,
  izoh_dostavka,
  alohida,
  lat,
  lon,
  created_at,
  onNavigate,
}: OrderCardProps) => {
  const [client, setClient] = useState<ICustomer | null>(null);

  useEffect(() => {
    const initDB = async () => {
      const db = await getDBConnection();
      const customer = await getCustomerById(db, client_id);

      if (customer) {
        setClient(customer);
      }
    };

    initDB();
  }, [client_id]);

  const totalPrice = useMemo<number>(() => {
    return product_list.reduce((a, b) => a + b.price * b.massa, 0);
  }, [product_list]);

  const handleNavigate = useCallback(() => {
    if (onNavigate) {
      onNavigate(uid.toString());
    }
  }, [uid, onNavigate]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.orderId} selectable={true}>
          #{uid}
        </Text>
        <Text style={styles.date}>{created_at}</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.bodyItem}>
          <Text style={styles.bodyItemTitle}>{client?.fio}</Text>
          <Text style={styles.bodyItemTitle}>{client?.telefon}</Text>
        </View>
        <View style={styles.bodyItem}>
          <Text style={styles.bodyItemTitle}>
            Jami soni:{' '}
            <Text style={styles.fontBold}>{product_list.length}</Text>
          </Text>
          <Text style={styles.bodyItemTitle}>
            Taxminiy summa:{' '}
            <Text style={styles.fontBold}>{totalPrice.toLocaleString()}</Text>
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable style={styles.detailBtn} onPress={handleNavigate}>
          <Text style={styles.detailBtnText}>Mahsulotlar</Text>
        </Pressable>
        <Text style={styles.status}>{created_at}</Text>
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
    fontSize: 12,
    color: '#808080',
  },
  body: {
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
    fontSize: 12,
    color: '#808080',
  },
  fontBold: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '500',
    fontSize: 12,
    color: '#242424',
  },
  footer: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
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
    padding: 10,
  },
  detailBtnText: {
    textAlign: 'center',
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 14,
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
export default React.memo(OrderDraftCard);
