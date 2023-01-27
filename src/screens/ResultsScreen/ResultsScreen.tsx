import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

import { useAppSelector } from '../../redux/hooks';
import { useFetchMerchantsQuery } from '../../redux/dcomApi';
import { selectCurrentSearchQuery } from '../../redux/searchQuerySlice';
import { Shop } from '../../utils/types';

import { ResultsScreenProps } from '../../navigation/NavRouter';
import { commonStyles } from '../../styles/commonStyles';
import { theme } from '../../styles/theme';
import { ResultCard } from '../../components';

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
  const currentSearchQuery = useAppSelector(selectCurrentSearchQuery);
  console.log('currentSearchQuery: ', currentSearchQuery);

  const res = useFetchMerchantsQuery(currentSearchQuery?.addressQuery || '', {
    skip: currentSearchQuery === null,
  });

  console.log(res);
  const { data: shops, isError, error, isFetching, isLoading, refetch } = res;

  const renderRestaurantCard = ({ item }: { item: Shop }) => {
    return <ResultCard {...item} />;
  };

  const dummyTextColor = currentSearchQuery ? 'black' : 'gray';

  return (
    <View style={styles.container}>
      <View style={commonStyles.searchBoxContainer}>
        <TouchableOpacity
          style={commonStyles.searchBox}
          onPress={() => navigation.navigate('SearchScreen')}>
          <Text style={[styles.searchBoxText, { color: dummyTextColor }]}>
            {currentSearchQuery?.addressText || 'Search Shop'}
          </Text>
        </TouchableOpacity>
      </View>

      {isError ? (
        <Text style={styles.errorMessageText}>{JSON.stringify(error)}</Text>
      ) : (
        <FlatList
          ListEmptyComponent={<Text style={styles.emptyListMessage}>No shops found!</Text>}
          data={shops}
          keyExtractor={item => item.id.toString()}
          renderItem={renderRestaurantCard}
          progressViewOffset={200}
          refreshControl={
            <RefreshControl refreshing={isFetching || isLoading} onRefresh={refetch} />
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxText: {
    paddingLeft: 30,
  },
  emptyListMessage: {
    textAlign: 'center',
    marginTop: 50,
    color: theme.colors.lowText,
  },
  errorMessageText: {
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 20,
    color: '#FF7878',
  },
});

export default ResultsScreen;
