import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/commonStyles';

interface SearchInputBoxProps {
  placeholder: string;
  defaultValue: string;
  onSubmit: (q: string) => void;
  onClear: () => void;
}

export const SearchInputBox: FC<SearchInputBoxProps> = ({
  placeholder,
  defaultValue,
  onSubmit,
  onClear,
}) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState<string>(defaultValue || '');

  const onClearInput = () => {
    setQuery('');
    onClear();
  };

  const onSubmitEditing = ({ nativeEvent: { text } }) => {
    if (text) {
      onSubmit && onSubmit(text);
    }
  };

  return (
    <View style={commonStyles.searchBox}>
      <TouchableOpacity style={styles.closeButton} onPress={navigation.goBack}>
        <Text>{'<'}</Text>
      </TouchableOpacity>
      <TextInput
        autoFocus={true}
        keyboardAppearance="light"
        value={query}
        allowFontScaling={false}
        maxFontSizeMultiplier={1.1}
        placeholder={placeholder}
        placeholderTextColor="#444"
        style={styles.inputBox}
        onChangeText={setQuery}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        enablesReturnKeyAutomatically={true}
      />
      <TouchableOpacity style={styles.clearTextButton} onPress={onClearInput}>
        <Text>X</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 30,
  },
  inputBox: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 15,
    paddingLeft: 0,
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 15,
  },
  clearTextButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
});
