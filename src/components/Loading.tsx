import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loading = ({  color = '#00e0ff' }) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
});

export default Loading;
