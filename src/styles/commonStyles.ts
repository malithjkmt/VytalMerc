import { StyleSheet } from 'react-native';

export const commonStyles = StyleSheet.create({
  searchBox: {
    flex: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c9c9c9',
    borderRadius: 30,
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
});
