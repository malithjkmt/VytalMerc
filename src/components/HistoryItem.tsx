import React, { FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface HistoryItemProps {
  label: string;
  onPress: () => void;
}

export const HistoryItem: FC<HistoryItemProps> = ({ label, onPress }) => {
  return (
    <>
      <TouchableOpacity style={styles.card} onPress={onPress}>
        <Text>{label}</Text>
      </TouchableOpacity>
      <View style={styles.bottomLine} />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 25,
    paddingVertical: 20,
  },
  bottomLine: {
    height: 1,
    backgroundColor: '#dedede',
    marginHorizontal: 20,
  },
});
