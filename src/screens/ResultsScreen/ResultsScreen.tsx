import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import { useAppSelector } from '../../redux/hooks';
import { useFetchMerchantsQuery } from '../../redux/dcomApi';
import { selectCurrentSearchQuery } from '../../redux/searchQuerySlice';

import { ResultsScreenProps } from '../../navigation/NavRouter';

const ResultsScreen = ({ navigation }: ResultsScreenProps) => {
  const currentSearchQuery = useAppSelector(selectCurrentSearchQuery);
  console.log('currentSearchQuery: ', currentSearchQuery);

  const res = useFetchMerchantsQuery(currentSearchQuery, { skip: currentSearchQuery === '' });
  console.log(res);
  const { data, isError, isSuccess, error, isFetching, isLoading, requestId, fulfilledTimeStamp, originalArgs, refresh } = res;

  const renderRestaurantCard = ({ item }) => {
    return (
      <View>
        <Text>{item.name}</Text>
      </View>
    );
  };

  const dummyTextColor = currentSearchQuery ? 'black' : 'gray';

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <TouchableOpacity
            style={styles.searchBoxContainer}
            onPress={() => navigation.navigate('SearchScreen')}>
            <Text style={[styles.searchBoxText, { color: dummyTextColor }]}>
              {currentSearchQuery || 'Search Shop'}
            </Text>
          </TouchableOpacity>
        }
        data={data?.merchants}
        keyExtractor={item => item.id}
        renderItem={renderRestaurantCard}
        refreshing={isFetching || isLoading}
        onRefresh={refresh}
        progressViewOffset={200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBoxContainer: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 30,
    marginHorizontal: 10,
  },
  searchBoxText: {
    paddingLeft: 30,
  },
});

export default ResultsScreen;
