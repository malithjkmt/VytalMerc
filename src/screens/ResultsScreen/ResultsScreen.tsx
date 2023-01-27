import React, { memo } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, RefreshControl } from 'react-native';

import { useAppSelector } from '../../redux/hooks';
import { useFetchMerchantsQuery } from '../../services/api/dcomApi';
import { selectCurrentSearchQuery } from '../../redux/searchQuerySlice';
import { Shop } from '../../utils/types';

import { ResultsScreenProps } from '../../navigation/NavRouter';
import { commonStyles } from '../../styles/commonStyles';
import { ResultCard, ListEmptyComp } from '../../components';

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
  const currentSearchQuery = useAppSelector(selectCurrentSearchQuery);
  console.log('currentSearchQuery: ', currentSearchQuery);

  const res = useFetchMerchantsQuery(currentSearchQuery?.addressQuery || '', {
    skip: currentSearchQuery === null,
  });

  const { data: shops, isError, error, isFetching, isLoading, refetch, status } = res;

  const renderRestaurantCard = ({ item }: { item: Shop }) => {
    return <ResultCard {...item} />;
  };

  const dummyTextColor = currentSearchQuery ? 'black' : '#666';

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
        <Text style={styles.errorMessageText}>
          {status === 'rejected' && 'Please enter a valid address'}
        </Text>
      ) : (
        <FlatList
          ListEmptyComponent={
            <ListEmptyComp
              message={currentSearchQuery && !isFetching && !isLoading && 'No shops found'}
            />
          }
          data={shops}
          keyExtractor={item => item.id.toString()}
          renderItem={renderRestaurantCard}
          progressViewOffset={200}
          refreshing={isFetching || isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isFetching || isLoading}
              onRefresh={refetch}
              tintColor="gray"
              colors={['gray']}
            />
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
  errorMessageText: {
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 20,
    color: '#FF7878',
  },
});

export default ResultsScreen;
