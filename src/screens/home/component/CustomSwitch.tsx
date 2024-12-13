import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';  

const CustomSwitch = ({ value, onValueChange, disabled }: any) => {
  const [animValue] = useState(new Animated.Value(value ? 1 : 0)); 

  const toggleSwitch = () => {
    const newValue = !value;
    onValueChange(newValue);

    Animated.spring(animValue, {
      toValue: newValue ? 1 : 0,
      useNativeDriver: true,
    }).start();
  };

  const circlePosition = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 30],  
  });


  const thumbColor = animValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f4f3f4', '#f4f3f4'], 
  });

  return (
    <TouchableOpacity onPress={toggleSwitch} activeOpacity={0.7} disabled={disabled}>
      <LinearGradient
        colors={['#70E2D5', '#55AAFF']}  
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}   
        style={[styles.switchWrapper]}>
        
        <Animated.View
          style={[styles.circle, { transform: [{ translateX: circlePosition }], backgroundColor: thumbColor }]}
        />
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switchWrapper: {
    width: 60,
    height: 30,
    borderRadius: 15,
    padding: 5,
    justifyContent: 'center',
    position: 'relative',
  },
  circle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    position: 'absolute',
    top: 4,
    left: 4,
  },
});

export default CustomSwitch;
