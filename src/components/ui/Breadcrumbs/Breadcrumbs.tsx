import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface BreadcrumbsProps {
  items: string[];
  onPress: (index: number) => void;
  separator?: string;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, onPress, separator = ' / ' }) => {
  return (
    <View style={styles.container}>
      {items.map((item, index) => (
        <View key={index} style={styles.breadcrumb}>
          <TouchableOpacity
            onPress={() => onPress(index)}
            accessibilityLabel={`Go to ${item}`}
            accessibilityHint={`Navigates to ${item}`}
          >
            <Text style={styles.breadcrumbText}>{item}</Text>
          </TouchableOpacity>
          {index < items.length - 1 && <Text style={styles.separator}>{separator}</Text>}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    color: '#007AFF',
    fontSize: 16,
  },
  separator: {
    color: '#6e6e6e',
    fontSize: 16,
  },
});

export default memo(Breadcrumbs);
