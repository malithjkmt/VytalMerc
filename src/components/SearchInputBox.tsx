import React, { FC, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';

interface SearchInputBoxProps {
  placeholder: string;
  isDummy?: boolean;
  onSubmit?: (q: string) => void;
}

export const SearchInputBox: FC<SearchInputBoxProps> = ({ placeholder, isDummy, onSubmit }) => {
  const navigation = useNavigation();
  const [query, setQuery] = useState<string>('');

  const onPress = () => {
    if (isDummy) {
      navigation.navigate('SearchScreen');
    }
  };

  const onClearInput = () => {
    setQuery('');
  };

  const onSubmitEditing = ({ nativeEvent: { text } }) => {
    onSubmit && onSubmit(text);
  };

  if (isDummy) {
    return (
      <TouchableOpacity style={styles.commonContainer} onPress={onPress}>
        <Text style={styles.dummyPlaceholder}>{placeholder}</Text>
      </TouchableOpacity>
    );
  } else {
    return (
      <View style={styles.commonContainer}>
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
        />
        <TouchableOpacity style={styles.clearTextButton} onPress={onClearInput}>
          <Text>X</Text>
        </TouchableOpacity>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  commonContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
  },
  dummyPlaceholder: {
    paddingLeft: 30,
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
