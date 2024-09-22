import React, {useCallback} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

type AppPageHeaderProps = {
  onBack: () => void;
};

const AppPageHeader = ({onBack}: AppPageHeaderProps) => {
  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleBack}>
        <Icon name="arrow-left" size={24} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 14,
    padding: 10,
    marginHorizontal: -10,
  },
});

export default React.memo(AppPageHeader);
