import React, { FC, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { commonStyles } from '../styles/commonStyles';
import { Icons } from '../assets/images';
import { theme } from '../styles/theme';

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

  const onSubmitEditing = ({ nativeEvent: { text } }: { nativeEvent: { text: string } }) => {
    if (text) {
      onSubmit && onSubmit(text);
    }
  };

  return (
    <View style={commonStyles.searchBox}>
      <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
        <Image style={styles.backIcon} source={Icons.backIcon} />
      </TouchableOpacity>
      <TextInput
        autoFocus={true}
        keyboardAppearance="light"
        value={query}
        allowFontScaling={false}
        maxFontSizeMultiplier={1.1}
        placeholder={placeholder}
        placeholderTextColor="#666"
        style={styles.inputBox}
        onChangeText={setQuery}
        onSubmitEditing={onSubmitEditing}
        returnKeyType="search"
        enablesReturnKeyAutomatically={true}
      />

      {query ? (
        <TouchableOpacity style={styles.clearTextButton} onPress={onClearInput}>
          <Image style={styles.closeIcon} source={Icons.closeIcon} />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.searchInputBoxBorder,
    borderRadius: 30,
  },
  inputBox: {
    flex: 1,
    paddingVertical: 15,
    paddingRight: 15,
    paddingLeft: 0,
  },
  backButton: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  clearTextButton: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  backIcon: {
    width: 10,
    height: 20,
    tintColor: theme.colors.icon,
  },
  closeIcon: {
    width: 25,
    height: 25,
    tintColor: theme.colors.icon,
  },
});
