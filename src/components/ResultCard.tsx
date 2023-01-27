import React, { FC } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableOpacity } from 'react-native';

import { theme } from '../styles/theme';
import { Shop } from '../utils/types';

interface ResultCardProps extends Shop { }

export const ResultCard: FC<ResultCardProps> = ({
  name,
  logo,
  link,
  ratings,
  priceRating,
  location,
  cuisines,
}) => {
  const onShare = () => {
    console.log(link);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: logo }} style={styles.logo} />
      <View style={styles.column}>
        <View style={styles.row}>
          <View style={styles.nameStarColumn}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.text}>
              <Text style={styles.star}>{'★'.repeat(ratings.star)}</Text> ({ratings.overall}) • {'$'.repeat(priceRating)}
            </Text>
          </View>
          <View style={styles.shareColumn}>
            <TouchableOpacity style={styles.actionButton} onPress={onShare}>
              <Text style={styles.actionButtonText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.text}>
          {location.street}, {location.state}, {location.zip}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cuisinesRow}>
          {cuisines.map(i => (
            <View style={styles.cuisineTag}>
              <Text key={i} style={styles.cuisinesText}>
                {i}
              </Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingLeft: 10,
    paddingRight: 5,
    paddingVertical: 10,
    marginVertical: 4,
    flexDirection: 'row',
    backgroundColor: 'white',

    // Shadow
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 0.5,
    elevation: 0.7,
  },
  logo: {
    height: 70,
    width: 70,
    borderRadius: 70,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  column: {
    flex: 1,
  },
  nameStarColumn: {
    flex: 4,
  },
  shareColumn: {
    flex: 1,
    paddingHorizontal: 5,
  },
  name: {
    fontSize: 16,
  },
  text: {
    fontSize: 13,
    color: theme.colors.lowText,
    marginBottom: 5,
  },
  star: {
    color: '#EEC373',
  },
  cuisinesRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  cuisineTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 30,
    borderColor: '#999',
    borderWidth: 0.3,
    marginRight: 5,
  },
  cuisinesText: {
    fontSize: 10,
  },
  actionButton: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 30,
    borderColor: '#999',
    borderWidth: 0.3,
  },
  actionButtonText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#2659e0',
  },
});
