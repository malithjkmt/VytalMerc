import React, { useState } from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';

import { useAppSelector, useAppDispatch } from '../../redux/hooks';
import {
  selectCurrentSearchQuery,
  selectSearchQueryHistory,
  setQuery,
  addToHistory,
  clearQuery,
} from '../../redux/searchQuerySlice';
import {
  parseAddressInput,
  ParsingError,
  ParsedAddress,
  COMMON_ADDRESS_VALIDATION_MESSAGE,
} from '../../utils/addressParser';

import { SearchScreenProps } from '../../navigation/NavRouter';
import { SearchInputBox, HistoryItem } from '../../components';

const SearchScreen = ({ navigation }: SearchScreenProps) => {
  const dispatch = useAppDispatch();
  const [errorMessage, setErrorMessage] = useState('');

  const searchHistory = useAppSelector(selectSearchQueryHistory);
  const currentSearchQuery = useAppSelector(selectCurrentSearchQuery);
  console.log(searchHistory);

  const onSearch = (searchTerm: string) => {
    try {
      const parsedAddress = parseAddressInput(searchTerm);

      setErrorMessage('');
      dispatch(setQuery(parsedAddress));

      const hasRecentlySearched = searchHistory.some(
        i => i.addressQuery === parsedAddress.addressQuery,
      );

      if (!hasRecentlySearched) {
        dispatch(addToHistory(parsedAddress));
      }

      navigation.goBack();
    } catch (err) {
      if (err instanceof ParsingError) {
        console.log(err.message);
        setErrorMessage(err.message);
      } else {
        console.log(COMMON_ADDRESS_VALIDATION_MESSAGE);
        setErrorMessage(COMMON_ADDRESS_VALIDATION_MESSAGE);
      }
    }
  };

  const onClear = () => {
    dispatch(clearQuery());
  };

  const onSelectRecentSearch = (query: ParsedAddress) => {
    dispatch(setQuery(query));
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <SearchInputBox
          placeholder="Search Shop"
          defaultValue={currentSearchQuery?.addressText || ''}
          onSubmit={onSearch}
          onClear={onClear}
        />
      </View>

      {errorMessage ? (
        <Text>{errorMessage}</Text>
      ) : (
        <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.sectionTitle}>Recent Searches</Text>
          {searchHistory.map(query => (
            <HistoryItem label={query.addressText} onPress={() => onSelectRecentSearch(query)} />
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    paddingBottom: 10,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingTop: 10,
  },
  scrollContainer: {
    marginBottom: 50,
    backgroundColor: 'white',
  },
  sectionTitle: {
    marginLeft: 25,
    paddingTop: 15,
    paddingBottom: 5,
    fontWeight: '600',
    color: '#555',
  },
});

export default SearchScreen;
