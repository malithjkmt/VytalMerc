import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';

import { useFetchMerchantsQuery } from '../../redux/dcomApi';

import { ResultsScreenProps } from '../../navigation/NavRouter';
import { SearchInputBox } from '../../components';

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
  const { data, isError, isSuccess, error, isFetching, isLoading, requestId, fulfilledTimeStamp } = useFetchMerchantsQuery('240_kent_ave_11249');

  console.log('data fetching: ', {
    data,
    error,
    isError,
    isSuccess,
    isLoading,
    requestId,
    fulfilledTimeStamp,
    isFetching,
  });

  const renderRestaurantCard = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBoxContainer}>
        <SearchInputBox isDummy={true} placeholder="Search Shop" />
      </View>

      <FlatList
        data={data?.merchants}
        keyExtractor={item => item.id}
        renderItem={renderRestaurantCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  searchBoxContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});

export default ResultsScreen;
