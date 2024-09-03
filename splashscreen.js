import React, { useEffect } from 'react';
import { StyleSheet, View, Image, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
  const navigation = useNavigation();

  // Animation values
  const opacity = new Animated.Value(0);

  useEffect(() => {   
    // Fade-in animation
    Animated.timing(opacity, {
      toValue: 1,
      duration: 3500, // Adjust as neede
      useNativeDriver: true,
    }).start();

    // Navigate to the next screen after animation completes
    const timer = setTimeout(() => {
      navigation.navigate('EV');
    }, 4000); // Adjust as needed

    return () => clearTimeout(timer);
  }, [navigation, opacity]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./bluelogos.png')} // Replace with your image
        style={[styles.image, { opacity }]}
      />
      
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF', // Adjust as needed
  },
  image: {
    width: 500,
    height: 500,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: '#000000', // Adjust text color as needed
  },
});

export default SplashScreen;
