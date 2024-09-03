import React from 'react';
import { View, Text, StyleSheet, Button,ImageBackground } from 'react-native';

const SignInOrRegisterPage = ({ navigation }) => {
  const handleSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <ImageBackground
    source={require('./darkblue.jpg')}
     style={{
      flex: 1,
      resizeMode: 'cover',
      justifyContent: 'center',
      width: '100%', // Ensure full width
      height: '100%', // Ensure full height
     }}>
    <View style={styles.container}>
      <Text style={styles.title}>Already a user login </Text>
      <View style={styles.button}>
        <Button title="LOGIN" onPress={handleSignIn}color={'#005A9C'}/>
      </View>
      
      <View style={styles.button}>
        
        <Button title="Register" onPress={handleRegister}color={'#005A9C'}/>
      </View>
    </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
     // Background color set to blue
  },
  title: {
    fontSize: 15,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#005A9C',
    textAlign:'center' // Text color set to white for better contrast
  },
  buttonContainer: {
    marginVertical: 10,
    width: '80%',
  },
  button: {
    backgroundColor: '#005A9C',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20
    
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default SignInOrRegisterPage;
