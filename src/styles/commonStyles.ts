import { StyleSheet } from 'react-native';
import { theme } from './theme';

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
    paddingTop: 5,
    paddingBottom: 10,
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 1,
  },
  errorMessageText: {
    paddingHorizontal: 50,
    textAlign: 'center',
    marginTop: 20,
    color: theme.colors.errorMessage,
  },
});
