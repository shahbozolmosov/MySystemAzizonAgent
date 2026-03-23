import {StyleSheet, Text, View} from 'react-native';
import {memo} from 'react';

export type PaymentDetailsCardProps = {
  productCount: number;
  productAmount: number;
  productTotalPrice: number;
  tasdiqlangan_chegirma: number;
  tolov_summa: number;
};

const PaymentDetailsCard = ({
  productCount,
  productAmount,
  productTotalPrice,
  tasdiqlangan_chegirma,
  tolov_summa,
}: PaymentDetailsCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Text style={styles.label}>
          Mahsulotlar ({productCount} x {productAmount.toLocaleString()}kg)
        </Text>
        <Text style={styles.value}>{productTotalPrice.toLocaleString()}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.label}>Chegirma</Text>
        <Text style={styles.value}>
          {tasdiqlangan_chegirma.toLocaleString()}
        </Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerLabel}>To'lov summa</Text>
        <Text style={styles.footerValue}>{tolov_summa.toLocaleString()}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffff',
    padding: 16,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EBF0FF',
  },
  item: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  label: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 12,
    color: '#848ba2',
  },
  value: {
    fontFamily: 'Roboto-Regular',
    fontWeight: '400',
    fontSize: 12,
    color: '#223263',
  },
  footer: {
    paddingTop: 12,
    marginTop: 12,
    borderTopWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#EBF0FF',
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
  },
  footerLabel: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    color: '#223263',
  },
  footerValue: {
    fontFamily: 'Roboto-Bold',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 20,
    letterSpacing: 0.5,
    color: '#40BFFF',
  },
});

export default memo(PaymentDetailsCard);
