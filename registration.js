import React, { useState } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
const Registration = ({ navigation }) => {
  const [name, setName] = useState('');
  const [mobile, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleYear, setVehicleYear] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  function handleSubmit(){
    const userData={
      name:name,
      email,
      mobile,
      password,
    };
    axios
    .post('http://192.168.0.104:5001/registration',userData)
    .then((res)=>console.log(res.data))
    .catch(e=>console.log(e));

    
  }
  const handleRegister = () => {
    // Save the driver details (you can use AsyncStorage, database, etc.)
    // For demonstration, we'll just log the details
    console.log('Name:', name);
    console.log('mobile:', mobile);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Address:', address);
    console.log('License Number:', licenseNumber);
    console.log('Vehicle Model:', vehicleModel);
    console.log('Vehicle Year:', vehicleYear);
    // Implement saving functionality here

    // Set the isRegistered state to true
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <View style={styles.container}>
        <Text style={styles.successMessage}>Successfully Registered!</Text>
        <Button mode="contained" onPress={() => navigation.navigate('rider')} style={styles.button}>
          Continue
        </Button>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        label="Name"
        value={name}
        onChangeText={text => setName(text)}
        style={styles.input}
      />
      <TextInput
        label="Phone Number"
        value={mobile}
        onChangeText={text => setPhoneNumber(text)}
        keyboardType="phone-pad"
        style={styles.input}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={text => setEmail(text)}
        keyboardType="email-address"
        style={styles.input}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        label="Address"
        value={address}
        onChangeText={text => setAddress(text)}
        style={styles.input}
      />
      <TextInput
        label="License Number"
        value={licenseNumber}
        onChangeText={text => setLicenseNumber(text)}
        style={styles.input}
      />
      <TextInput
        label="Vehicle Model"
        value={vehicleModel}
        onChangeText={text => setVehicleModel(text)}
        style={styles.input}
      />
      <TextInput
        label="Vehicle Year"
        value={vehicleYear}
        onChangeText={text => setVehicleYear(text)}
        keyboardType="number-pad"
        style={styles.input}
      />
      <Button mode="contained" onPress={()=>handleRegister()} style={styles.button}>
        Register
      </Button>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
  },
  successMessage: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Registration;